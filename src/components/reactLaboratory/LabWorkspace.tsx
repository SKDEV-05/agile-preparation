import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Terminal as TermIcon, 
  CheckSquare, 
  FolderOpen, 
  PanelLeftClose,
  PanelLeftOpen,
  Database,
  Code2,
  Eye,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  FileCode,
  Award
} from 'lucide-react';
import { LabExercise, LabFile } from '../../types/reactLabTypes';
import { LabHeader } from './LabHeader';
import { LabExplorer } from './LabExplorer';
import { LabBrief } from './LabBrief';
import { LabResources } from './LabResources';
import { LabSuccessModal } from './LabSuccessModal';
import { CodeEditor } from '../reactPlayground/CodeEditor';
import { LivePreview } from '../reactPlayground/LivePreview';
import { VirtualConsole, ConsoleLogEntry } from '../reactPlayground/VirtualConsole';

interface LabWorkspaceProps {
  exercise: LabExercise;
  currentIndex: number;
  totalExercises: number;
  isSolved: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onValidateLab: () => void;
  onBackToOverview: () => void;
  onOpenLesson?: () => void;
}

export function LabWorkspace({
  exercise,
  currentIndex,
  totalExercises,
  isSolved,
  onPrevious,
  onNext,
  onValidateLab,
  onBackToOverview,
  onOpenLesson
}: LabWorkspaceProps) {
  // 1. Files & Active State Management
  const [files, setFiles] = useState<LabFile[]>(() => {
    try {
      const saved = localStorage.getItem(`ofppt_lab_files_${exercise.id}`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return exercise.files;
  });

  const [activeFilePath, setActiveFilePath] = useState<string>(() => {
    return exercise.entryFile || exercise.files[0]?.path || 'src/App.jsx';
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`ofppt_lab_files_${exercise.id}`);
      if (saved) {
        setFiles(JSON.parse(saved));
      } else {
        setFiles(exercise.files);
      }
    } catch {
      setFiles(exercise.files);
    }
    setActiveFilePath(exercise.entryFile || exercise.files[0]?.path || 'src/App.jsx');
    setLogs([]);
    setBuildStatus('ready');
  }, [exercise]);

  const activeFile = files.find(f => f.path === activeFilePath) || files[0];
  const activeCode = activeFile?.content || '';

  const saveFilesLocally = (newFiles: LabFile[]) => {
    setFiles(newFiles);
    try {
      localStorage.setItem(`ofppt_lab_files_${exercise.id}`, JSON.stringify(newFiles));
    } catch {}
  };

  const handleCodeChange = (newCode: string) => {
    const updated = files.map(f => {
      if (f.path === activeFilePath) {
        return { ...f, content: newCode };
      }
      return f;
    });
    saveFilesLocally(updated);
  };

  const handleAddFile = (fileName: string) => {
    const cleanName = fileName.trim();
    const newPath = cleanName.startsWith('src/') ? cleanName : `src/${cleanName}`;
    if (files.some(f => f.path === newPath)) {
      setActiveFilePath(newPath);
      return;
    }
    const defaultTemplate = cleanName.endsWith('.json')
      ? '{\n  "stagiaires": []\n}'
      : cleanName.endsWith('.css')
      ? '/* Styles CSS personnalisés */\n.carte {\n  padding: 16px;\n}'
      : `import React from 'react';\n\nexport function ${cleanName.replace(/\.[^/.]+$/, '')}() {\n  return (\n    <div>\n      <h3>Composant ${cleanName}</h3>\n    </div>\n  );\n}\n`;

    const newFile: LabFile = {
      name: cleanName.replace('src/', ''),
      path: newPath,
      content: defaultTemplate
    };

    const updated = [...files, newFile];
    saveFilesLocally(updated);
    setActiveFilePath(newPath);
  };

  const handleDeleteFile = (filePath: string) => {
    if (filePath === exercise.entryFile || filePath === 'src/App.jsx') return;
    const updated = files.filter(f => f.path !== filePath);
    saveFilesLocally(updated);
    if (activeFilePath === filePath) {
      setActiveFilePath(exercise.entryFile || updated[0]?.path || 'src/App.jsx');
    }
  };

  // 2. Compilation & Execution
  const [buildStatus, setBuildStatus] = useState<'ready' | 'running' | 'success' | 'error'>('ready');
  const [logs, setLogs] = useState<ConsoleLogEntry[]>([]);
  const [previewCode, setPreviewCode] = useState<string>(activeCode);

  const handleAddLog = useCallback((log: Omit<ConsoleLogEntry, 'id' | 'timestamp'>) => {
    const timestamp = new Date().toLocaleTimeString('fr-FR', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    setLogs(prev => [
      ...prev,
      {
        id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp,
        ...log
      }
    ]);
  }, []);

  const allPassed = exercise.tests.every(test => {
    try {
      return test.check(activeCode, activeFilePath, files);
    } catch {
      return false;
    }
  });

  const handleRun = () => {
    setBuildStatus('running');
    setLogs([]);
    const entry = files.find(f => f.path === (exercise.entryFile || 'src/App.jsx')) || files[0];
    setPreviewCode(entry ? entry.content : activeCode);

    const passed = exercise.tests.every(test => {
      try {
        return test.check(entry?.content || activeCode, activeFilePath, files);
      } catch {
        return false;
      }
    });

    setTimeout(() => {
      setBuildStatus('success');
      if (passed && !isSolved) {
        handleAddLog({
          type: 'log',
          message: '✓ Tous les tests pédagogiques OFPPT sont validés avec succès !'
        });
      }
    }, 250);
  };

  // Real-time automatic live preview synchronization on code change (debounced 400ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      const entry = files.find(f => f.path === (exercise.entryFile || 'src/App.jsx')) || files[0];
      if (entry) {
        setPreviewCode(entry.content);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [files, exercise.entryFile]);

  const handleReset = () => {
    try {
      localStorage.removeItem(`ofppt_lab_files_${exercise.id}`);
    } catch {}
    setFiles(exercise.files);
    const entry = exercise.entryFile || exercise.files[0]?.path || 'src/App.jsx';
    setActiveFilePath(entry);
    setPreviewCode(exercise.files.find(f => f.path === entry)?.content || '');
    setLogs([]);
    setBuildStatus('ready');
  };

  // 3. Desktop Resizable Layout
  const [leftWidth, setLeftWidth] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('ofppt_lab_left_width');
      if (saved) return Number(saved);
    } catch {}
    return 24;
  });

  const [editorWidth, setEditorWidth] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('ofppt_lab_editor_width');
      if (saved) return Number(saved);
    } catch {}
    return 50;
  });

  const [isLeftHidden, setIsLeftHidden] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ofppt_lab_left_hidden') === 'true';
    } catch {}
    return false;
  });

  const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('ofppt_lab_left_width', String(leftWidth));
      localStorage.setItem('ofppt_lab_editor_width', String(editorWidth));
      localStorage.setItem('ofppt_lab_left_hidden', String(isLeftHidden));
    } catch {}
  }, [leftWidth, editorWidth, isLeftHidden]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<'left' | 'right' | null>(null);

  const handleResetLayout = () => {
    setLeftWidth(24);
    setEditorWidth(50);
    setIsLeftHidden(false);
  };

  const handleMouseDownLeft = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging('left');
  };

  const handleMouseDownRight = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging('right');
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX;
      const relativeX = clientX - rect.left;
      const percentage = (relativeX / rect.width) * 100;

      if (isDragging === 'left') {
        const clamped = Math.min(Math.max(percentage, 15), 40);
        setLeftWidth(clamped);
      } else if (isDragging === 'right') {
        const startX = isLeftHidden ? 0 : leftWidth;
        const newEditor = percentage - startX;
        const minEditor = 25;
        const maxEditor = 100 - startX - 22;
        const clamped = Math.min(Math.max(newEditor, minEditor), maxEditor);
        setEditorWidth(clamped);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(null);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, isLeftHidden, leftWidth, editorWidth]);

  const [leftTab, setLeftTab] = useState<'brief' | 'resources' | 'explorer'>('brief');
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Mobile dedicated states
  const [isMobileNewFileModalOpen, setIsMobileNewFileModalOpen] = useState(false);
  const [mobileNewFileName, setMobileNewFileName] = useState('');
  const [isMobileMissionOpen, setIsMobileMissionOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const [isMobileConsoleOpen, setIsMobileConsoleOpen] = useState(false);

  const handleValidate = () => {
    onValidateLab();
    setShowSuccessModal(true);
  };

  const handleTriggerBreakIt = () => {
    if (exercise.breakItChallenge?.brokenFiles) {
      const updated = files.map(f => {
        const broken = exercise.breakItChallenge?.brokenFiles.find(b => b.path === f.path);
        return broken ? { ...f, content: broken.content } : f;
      });
      saveFilesLocally(updated);
      handleRun();
      handleAddLog({
        type: 'warn',
        message: `Mode "Break It" activé : ${exercise.breakItChallenge.bugDescription}`
      });
    }
  };

  // Global Ctrl+Enter shortcut to Run
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [files, activeFilePath]);

  return (
    <div className={`flex flex-col bg-slate-50 dark:bg-[#0A0A0A] text-slate-800 dark:text-white rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl transition-all ${
      isFocusMode 
        ? 'fixed inset-0 z-50 rounded-none border-0 h-screen' 
        : 'h-[calc(100vh-40px)] min-h-[660px] max-h-[1020px] md:h-[calc(100vh-40px)] max-md:h-[calc(100dvh-80px)] max-md:min-h-0 max-md:max-h-none'
    }`}>
      {/* 1. Top IDE Header */}
      <LabHeader
        exercise={exercise}
        currentIndex={currentIndex}
        totalExercises={totalExercises}
        isSolved={isSolved}
        onPrevious={onPrevious}
        onNext={onNext}
        onRun={handleRun}
        onReset={handleReset}
        isFocusMode={isFocusMode}
        onToggleFocusMode={() => setIsFocusMode(!isFocusMode)}
        onBackToOverview={onBackToOverview}
        buildStatus={buildStatus}
        isLeftHidden={isLeftHidden}
        onToggleLeftHidden={() => setIsLeftHidden(!isLeftHidden)}
        onResetLayout={handleResetLayout}
        allPassed={allPassed}
        onValidate={handleValidate}
      />

      {/* ── MOBILE VIEW (Stacked: Code Editor ➔ Live Preview ➔ Virtual Console) ── */}
      <div className="flex-1 flex flex-col md:hidden overflow-y-auto bg-slate-100 dark:bg-[#0A0A0A] p-3 space-y-4">
        {/* 1. Mobile Files & Quick Actions Bar */}
        <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-xl p-2 shadow-xs shrink-0">
          <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-none pb-1">
            {/* File Pills */}
            <div className="flex items-center gap-1.5 shrink-0">
              {files.map(f => {
                const isActive = f.path === activeFilePath;
                const isDeletable = f.path !== exercise.entryFile && f.path !== 'src/App.jsx';
                return (
                  <div
                    key={f.path}
                    className={`flex items-center rounded-lg text-xs font-mono transition-all border ${
                      isActive
                        ? 'bg-[#10B981] text-white font-bold border-[#10B981] shadow-2xs'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white/70 border-slate-200 dark:border-white/10 hover:border-[#10B981]/50'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFilePath(f.path)}
                      className="px-2.5 py-1 cursor-pointer"
                    >
                      {f.name}
                    </button>
                    {isDeletable && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFile(f.path);
                        }}
                        title="Supprimer ce fichier"
                        className="pr-1.5 pl-0.5 py-1 text-slate-400 hover:text-red-400 cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                );
              })}

              {/* Add File Button */}
              <button
                type="button"
                onClick={() => {
                  setMobileNewFileName('');
                  setIsMobileNewFileModalOpen(true);
                }}
                title="Créer un nouveau fichier"
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#10B981]/15 text-[#10B981] hover:bg-[#10B981]/25 border border-[#10B981]/30 text-xs font-mono font-bold shrink-0 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>+ Fichier</span>
              </button>
            </div>

            {/* Mission & Resources Buttons */}
            <div className="flex items-center gap-1.5 shrink-0 pl-2 border-l border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => setIsMobileMissionOpen(true)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white/80 border border-slate-200 dark:border-white/10 text-xs font-mono cursor-pointer"
              >
                <CheckSquare className="h-3.5 w-3.5 text-[#10B981]" />
                <span>Mission</span>
              </button>
              <button
                type="button"
                onClick={() => setIsMobileResourcesOpen(true)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white/80 border border-slate-200 dark:border-white/10 text-xs font-mono cursor-pointer"
              >
                <Database className="h-3.5 w-3.5 text-[#22C55E]" />
                <span>Ressources</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Top Section: Code Editor */}
        <div className="flex flex-col bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm shrink-0">
          <div className="flex items-center justify-between px-3 py-2 bg-slate-100 dark:bg-[#181818] border-b border-slate-200 dark:border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Code2 className="h-3.5 w-3.5 text-[#10B981]" />
              <span className="font-bold text-slate-900 dark:text-white text-xs">{activeFile?.name || 'Code'}</span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-white/50">Éditeur React</span>
          </div>
          <div className="h-[360px] sm:h-[400px]">
            <CodeEditor
              code={activeCode}
              onChange={handleCodeChange}
              fileName={activeFile?.name || 'App.jsx'}
              onReset={() => {
                const original = exercise.files.find(f => f.path === activeFilePath);
                if (original) handleCodeChange(original.content);
              }}
            />
          </div>
        </div>

        {/* 3. Middle Section: Live Preview (Down directly under code) */}
        <div className="flex flex-col bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm shrink-0">
          <div className="flex items-center justify-between px-3 py-2 bg-slate-100 dark:bg-[#181818] border-b border-slate-200 dark:border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Eye className="h-3.5 w-3.5 text-[#10B981]" />
              <span className="font-bold text-slate-900 dark:text-white text-xs">Aperçu en Direct</span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-white/50">Rendu Temps Réel</span>
          </div>
          <div className="h-[380px] sm:h-[420px] p-2 bg-slate-50 dark:bg-[#0A0A0A]">
            <LivePreview
              code={previewCode}
              files={files}
              entryPath={exercise.entryFile}
              onLog={handleAddLog}
            />
          </div>
        </div>

        {/* 4. Bottom Section: Virtual Console (Down directly under preview, expandable on demand) */}
        <div className={`bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm shrink-0 transition-all ${
          isMobileConsoleOpen ? 'h-[230px]' : 'h-[44px]'
        }`}>
          <div className="flex items-center justify-between px-3 h-[44px] bg-slate-100 dark:bg-[#181818] border-b border-slate-200 dark:border-white/10 text-xs font-mono select-none">
            <button
              type="button"
              onClick={() => setIsMobileConsoleOpen(!isMobileConsoleOpen)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer text-left"
            >
              <TermIcon className="h-3.5 w-3.5 text-[#10B981]" />
              <span className="font-bold text-slate-900 dark:text-white text-xs">Console Virtuelle</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[#10B981] font-bold">
                {logs.length}
              </span>
            </button>

            <div className="flex items-center gap-2">
              {isMobileConsoleOpen && logs.length > 0 && (
                <button
                  type="button"
                  onClick={() => setLogs([])}
                  className="text-[10px] text-slate-500 dark:text-white/50 hover:text-white transition-colors cursor-pointer px-2 py-1 rounded bg-black/5 dark:bg-white/5"
                >
                  Effacer
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsMobileConsoleOpen(!isMobileConsoleOpen)}
                className="flex items-center gap-1 text-xs font-mono text-slate-600 dark:text-white/70 hover:text-[#10B981] dark:hover:text-[#10B981] px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
              >
                <span>{isMobileConsoleOpen ? 'Masquer' : 'Afficher'}</span>
                {isMobileConsoleOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          {isMobileConsoleOpen && (
            <div className="h-[186px] overflow-hidden p-2 bg-white dark:bg-[#0A0A0A]">
              <VirtualConsole logs={logs} onClear={() => setLogs([])} />
            </div>
          )}
        </div>

        {/* 5. Mobile Sticky Bottom Action Bar */}
        <div className="sticky bottom-0 z-20 flex items-center justify-between gap-2 px-3 py-2.5 bg-white/95 dark:bg-[#141414]/95 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl">
          <div className="flex items-center gap-2">
            <button
              onClick={handleRun}
              disabled={buildStatus === 'running'}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#10B981] hover:bg-[#22C55E] text-white font-mono text-xs font-bold transition-all shadow-2xs cursor-pointer disabled:opacity-50"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>{buildStatus === 'running' ? 'Compil...' : 'Exécuter ▶'}</span>
            </button>

            <button
              onClick={handleReset}
              title="Réinitialiser le code"
              className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-white/10 text-xs font-mono transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          {allPassed && !isSolved ? (
            <button
              onClick={handleValidate}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#10B981] hover:bg-[#22C55E] text-white font-mono text-xs font-bold transition-all shadow-2xs cursor-pointer animate-pulse"
            >
              <Award className="h-3.5 w-3.5" />
              <span>Valider ✓</span>
            </button>
          ) : (
            <div className="text-[11px] font-mono text-slate-500 dark:text-white/50 px-2 py-1">
              {exercise.tests.filter(test => { try { return test.check(activeCode, activeFilePath, files); } catch { return false; } }).length}/{exercise.tests.length} tests
            </div>
          )}
        </div>
      </div>

      {/* ── DESKTOP & TABLET VIEW ── */}
      {/* 
        ARCHITECTURAL GUARANTEE:
        Column 1: Left Volet (Mission / Resources / Files)
        Column 2: Code Editor + Bottom Dock (Tests, Console, Terminal)
        Column 3: DISPLAY (Live Preview) Takes 100% Full Height (NOT stopped by terminal!)
      */}
      <div ref={containerRef} className="hidden md:flex flex-1 flex-row overflow-hidden relative h-full">
        
        {/* Sleek Collapsed Left Bar (When hidden) */}
        {isLeftHidden && (
          <div className="flex flex-col items-center py-2 bg-slate-100 dark:bg-[#141414] border-r border-slate-200 dark:border-white/10 w-9 shrink-0 gap-2 select-none transition-colors">
            <button
              onClick={() => setIsLeftHidden(false)}
              title="Développer le volet gauche"
              className="p-1.5 rounded-lg text-slate-500 dark:text-white/50 hover:text-[#10B981] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <PanelLeftOpen className="h-4 w-4" />
            </button>
            <div className="w-4 h-px bg-slate-300 dark:bg-white/10" />
            <button
              onClick={() => { setIsLeftHidden(false); setLeftTab('brief'); }}
              title="Afficher la Mission"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                leftTab === 'brief' ? 'text-[#10B981] bg-[#10B981]/15' : 'text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <CheckSquare className="h-4 w-4" />
            </button>
            <button
              onClick={() => { setIsLeftHidden(false); setLeftTab('resources'); }}
              title="Afficher les Ressources (Tableaux, JSON, APIs)"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                leftTab === 'resources' ? 'text-[#10B981] bg-[#10B981]/15' : 'text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <Database className="h-4 w-4" />
            </button>
            <button
              onClick={() => { setIsLeftHidden(false); setLeftTab('explorer'); }}
              title={`Afficher les fichiers (${files.length})`}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                leftTab === 'explorer' ? 'text-[#10B981] bg-[#10B981]/15' : 'text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <FolderOpen className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Left Column: Task Brief / Resources / File Explorer */}
        {!isLeftHidden && (
          <div 
            style={{ width: `${leftWidth}%` }}
            className="flex flex-col border-r border-slate-200 dark:border-white/10 overflow-hidden shrink-0 h-full bg-white dark:bg-[#141414] transition-colors"
          >
            {/* Left Column Tab Switcher */}
            <div className="flex items-center justify-between bg-slate-100 dark:bg-[#181818] border-b border-slate-200 dark:border-white/10 text-xs font-mono select-none transition-colors">
              <div className="flex items-center flex-1 overflow-x-auto">
                <button
                  onClick={() => setLeftTab('brief')}
                  className={`flex-1 py-2 px-2.5 flex items-center justify-center gap-1.5 font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    leftTab === 'brief' ? 'bg-white dark:bg-[#141414] text-[#10B981] border-b-2 border-[#10B981]' : 'text-slate-600 dark:text-white/50 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <CheckSquare className="h-3.5 w-3.5" />
                  <span>Mission</span>
                </button>

                <button
                  onClick={() => setLeftTab('resources')}
                  className={`flex-1 py-2 px-2.5 flex items-center justify-center gap-1.5 font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    leftTab === 'resources' ? 'bg-white dark:bg-[#141414] text-[#10B981] border-b-2 border-[#10B981]' : 'text-slate-600 dark:text-white/50 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Database className="h-3.5 w-3.5" />
                  <span>Ressources</span>
                </button>

                <button
                  onClick={() => setLeftTab('explorer')}
                  className={`flex-1 py-2 px-2.5 flex items-center justify-center gap-1.5 font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    leftTab === 'explorer' ? 'bg-white dark:bg-[#141414] text-[#10B981] border-b-2 border-[#10B981]' : 'text-slate-600 dark:text-white/50 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <FolderOpen className="h-3.5 w-3.5" />
                  <span>Fichiers ({files.length})</span>
                </button>
              </div>

              {/* Collapse Left Sidebar Button */}
              <button
                onClick={() => setIsLeftHidden(true)}
                title="Masquer le volet gauche (Agrandir l'éditeur)"
                className="px-2 py-2 text-slate-400 dark:text-white/40 hover:text-slate-800 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <PanelLeftClose className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              {leftTab === 'brief' && (
                <LabBrief
                  exercise={exercise}
                  onTriggerBreakIt={handleTriggerBreakIt}
                  onOpenLesson={onOpenLesson}
                />
              )}
              {leftTab === 'resources' && (
                <LabResources
                  exercise={exercise}
                  files={files}
                />
              )}
              {leftTab === 'explorer' && (
                <LabExplorer
                  files={files}
                  activeFilePath={activeFilePath}
                  onSelectFile={setActiveFilePath}
                  isOpen={true}
                  onToggleOpen={() => {}}
                  onAddFile={handleAddFile}
                  onDeleteFile={handleDeleteFile}
                  entryFilePath={exercise.entryFile}
                />
              )}
            </div>
          </div>
        )}

        {/* Draggable Splitter 1 (Left / Center Editor) */}
        {!isLeftHidden && (
          <div
            onMouseDown={handleMouseDownLeft}
            onDoubleClick={() => setLeftWidth(24)}
            title="Glisser pour redimensionner (Double-clic pour réinitialiser)"
            className="w-1.5 hover:w-2 bg-slate-200 dark:bg-white/5 hover:bg-[#10B981] active:bg-[#22C55E] cursor-col-resize transition-all shrink-0 flex items-center justify-center group select-none relative z-10"
          >
            <div className="h-8 w-0.5 rounded-full bg-slate-400 dark:bg-white/20 group-hover:bg-white transition-colors" />
          </div>
        )}

        {/* 
          Main Coding Zone:
          Top: Code Editor & Live Preview side-by-side with MATCHING LONG HEIGHT!
          Bottom: Compact Horizontal Multi-Tab Dock (Tests, Console, Terminal, Hints, Inspector)
        */}
        <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0 bg-slate-100 dark:bg-[#0A0A0A] transition-colors">
          
          {/* Top Row: Code Editor & Live Preview both sharing equal, long height */}
          <div className="flex-1 flex flex-row overflow-hidden min-h-[280px]">
            {/* Left: Code Editor */}
            <div 
              style={{ width: `${editorWidth}%` }}
              className="h-full flex flex-col overflow-hidden shrink-0 border-r border-slate-200 dark:border-white/10"
            >
              <CodeEditor
                code={activeCode}
                onChange={handleCodeChange}
                fileName={activeFile?.name || 'App.jsx'}
                onReset={() => {
                  const original = exercise.files.find(f => f.path === activeFilePath);
                  if (original) handleCodeChange(original.content);
                }}
              />
            </div>

            {/* Draggable Splitter (Editor / Live Preview) */}
            <div
              onMouseDown={handleMouseDownRight}
              onDoubleClick={() => setEditorWidth(50)}
              title="Glisser pour redimensionner (Double-clic pour réinitialiser à 50%)"
              className="w-1.5 hover:w-2 bg-slate-200 dark:bg-white/5 hover:bg-[#10B981] active:bg-[#22C55E] cursor-col-resize transition-all shrink-0 flex items-center justify-center group select-none relative z-10"
            >
              <div className="h-8 w-0.5 rounded-full bg-slate-400 dark:bg-white/20 group-hover:bg-white transition-colors" />
            </div>

            {/* Right: Live Preview Panel (Shares matching LONG height with editor!) */}
            <div className="flex-1 h-full flex flex-col overflow-hidden min-w-[260px] p-2 bg-slate-100 dark:bg-[#0A0A0A]">
              <LivePreview
                code={previewCode}
                files={files}
                entryPath={exercise.entryFile}
                onLog={handleAddLog}
              />
            </div>
          </div>

          {/* Bottom Row: Console Only (Hidden by default, expandable on demand with generous height) */}
          <div className={`border-t border-slate-200 dark:border-white/10 flex flex-col overflow-hidden shrink-0 transition-all ${
            isConsoleOpen ? 'h-[210px]' : 'h-[36px]'
          }`}>
            {/* Minimalist Console Header Bar */}
            <div className="flex items-center justify-between px-3 bg-slate-100 dark:bg-[#141414] border-b border-slate-200 dark:border-white/10 text-xs font-mono select-none shrink-0 h-[36px]">
              <button
                onClick={() => setIsConsoleOpen(!isConsoleOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer text-left"
              >
                <TermIcon className="h-3.5 w-3.5 text-[#10B981]" />
                <span className="font-bold text-slate-900 dark:text-white text-[11px]">Console Virtuelle</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/10 text-[#10B981] font-bold">
                  {logs.length}
                </span>
              </button>

              <div className="flex items-center gap-2">
                {isConsoleOpen && logs.length > 0 && (
                  <button
                    onClick={() => setLogs([])}
                    title="Effacer les logs"
                    className="text-[10px] text-slate-500 dark:text-white/50 hover:text-red-500 dark:hover:text-white transition-colors cursor-pointer px-2 py-0.5 rounded hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    Effacer
                  </button>
                )}

                <button
                  onClick={() => setIsConsoleOpen(!isConsoleOpen)}
                  title={isConsoleOpen ? "Masquer la console" : "Afficher la console"}
                  className="flex items-center gap-1 text-[11px] font-mono text-slate-600 dark:text-white/70 hover:text-[#10B981] dark:hover:text-[#10B981] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer px-2 py-0.5 rounded"
                >
                  <span>{isConsoleOpen ? "Masquer la console" : "Afficher la console"}</span>
                  {isConsoleOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* Console Body (Shown only when open) */}
            {isConsoleOpen && (
              <div className="flex-1 overflow-hidden bg-white dark:bg-[#0A0A0A] p-2">
                <VirtualConsole logs={logs} onClear={() => setLogs([])} />
              </div>
            )}
          </div>
        </div>

      </div>

      {/* 4. Success Modal */}
      {showSuccessModal && (
        <LabSuccessModal
          exercise={exercise}
          onNextExercise={onNext}
          onClose={() => setShowSuccessModal(false)}
        />
      )}

      {/* Mobile Modal: Nouveau Fichier */}
      {isMobileNewFileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/15 rounded-2xl w-full max-w-sm p-4 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                <FileCode className="h-4 w-4 text-[#10B981]" />
                <span>Nouveau Fichier</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileNewFileModalOpen(false)}
                className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 dark:text-white/60 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-600 dark:text-white/70 block">
                Nom du composant ou fichier :
              </label>
              <input
                type="text"
                value={mobileNewFileName}
                onChange={(e) => setMobileNewFileName(e.target.value)}
                placeholder="ex: UserCard.jsx"
                className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/20 rounded-xl focus:border-[#10B981] focus:outline-hidden text-slate-900 dark:text-white"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && mobileNewFileName.trim()) {
                    handleAddFile(mobileNewFileName);
                    setIsMobileNewFileModalOpen(false);
                    setMobileNewFileName('');
                  }
                }}
              />

              {/* Quick extension presets */}
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[10px] text-slate-500 dark:text-white/50">Extensions :</span>
                {['.jsx', '.css', '.json'].map(ext => (
                  <button
                    key={ext}
                    type="button"
                    onClick={() => {
                      const base = mobileNewFileName.replace(/\.[^/.]+$/, '');
                      setMobileNewFileName((base || 'Composant') + ext);
                    }}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-slate-700 dark:text-white/70 hover:bg-[#10B981]/20 hover:text-[#10B981] transition-colors cursor-pointer"
                  >
                    {ext}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => setIsMobileNewFileModalOpen(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-mono text-slate-600 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                disabled={!mobileNewFileName.trim()}
                onClick={() => {
                  if (mobileNewFileName.trim()) {
                    handleAddFile(mobileNewFileName);
                    setIsMobileNewFileModalOpen(false);
                    setMobileNewFileName('');
                  }
                }}
                className="px-4 py-1.5 rounded-xl text-xs font-mono font-bold bg-[#10B981] hover:bg-[#22C55E] text-white disabled:opacity-40 shadow-2xs cursor-pointer"
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer: Mission & Consignes */}
      {isMobileMissionOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/70 backdrop-blur-xs">
          <div className="flex-1 flex flex-col mt-14 bg-white dark:bg-[#121212] rounded-t-3xl border-t border-slate-200 dark:border-white/15 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#181818]">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-[#10B981]" />
                <span className="font-bold text-sm text-slate-900 dark:text-white">Consignes de la Mission</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMissionOpen(false)}
                className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 dark:text-white/60 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <LabBrief
                exercise={exercise}
                onTriggerBreakIt={handleTriggerBreakIt}
                onOpenLesson={onOpenLesson}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer: Ressources & Données */}
      {isMobileResourcesOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/70 backdrop-blur-xs">
          <div className="flex-1 flex flex-col mt-14 bg-white dark:bg-[#121212] rounded-t-3xl border-t border-slate-200 dark:border-white/15 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#181818]">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-[#22C55E]" />
                <span className="font-bold text-sm text-slate-900 dark:text-white">Ressources & Données</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileResourcesOpen(false)}
                className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 dark:text-white/60 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <LabResources
                exercise={exercise}
                files={files}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

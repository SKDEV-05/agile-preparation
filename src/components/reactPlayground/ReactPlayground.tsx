import React, { useState, useEffect } from 'react';
import { PLAYGROUND_TEMPLATES, PlaygroundTemplate } from './templates';
import { CodeEditor } from './CodeEditor';
import { LivePreview } from './LivePreview';
import { VirtualConsole, ConsoleLogEntry } from './VirtualConsole';
import { Code2, Play, Sparkles, BookOpen, RotateCcw } from 'lucide-react';

interface ReactPlaygroundProps {
  initialTemplateId?: string;
  customCode?: string;
  title?: string;
  onClearCustomCode?: () => void;
}

export function ReactPlayground({ initialTemplateId = 'starter', customCode, title, onClearCustomCode }: ReactPlaygroundProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<PlaygroundTemplate>(() => {
    return PLAYGROUND_TEMPLATES.find(t => t.id === initialTemplateId) || PLAYGROUND_TEMPLATES[0];
  });

  const [activeCode, setActiveCode] = useState<string>(() => {
    if (customCode) return customCode;
    return selectedTemplate.files[0]?.code || '';
  });

  const [isCustomMode, setIsCustomMode] = useState<boolean>(() => !!customCode);

  useEffect(() => {
    if (customCode) {
      setActiveCode(customCode);
      setIsCustomMode(true);
      setLogs([]);
    } else {
      setIsCustomMode(false);
      const starter = PLAYGROUND_TEMPLATES.find(t => t.id === 'starter') || PLAYGROUND_TEMPLATES[0];
      setSelectedTemplate(starter);
      setActiveCode(starter.files[0]?.code || '');
    }
  }, [customCode]);

  const [logs, setLogs] = useState<ConsoleLogEntry[]>([]);
  const [isConsoleCollapsed, setIsConsoleCollapsed] = useState<boolean>(false);

  const handleResetToStarter = () => {
    const starter = PLAYGROUND_TEMPLATES.find(t => t.id === 'starter') || PLAYGROUND_TEMPLATES[0];
    setSelectedTemplate(starter);
    setActiveCode(starter.files[0]?.code || '');
    setIsCustomMode(false);
    onClearCustomCode?.();
    setLogs([]);
  };

  const handleSelectTemplate = (templateId: string) => {
    if (templateId === '__custom__' && customCode) {
      setIsCustomMode(true);
      setActiveCode(customCode);
      setLogs([]);
      return;
    }
    const t = PLAYGROUND_TEMPLATES.find(tpl => tpl.id === templateId);
    if (t) {
      setIsCustomMode(false);
      setSelectedTemplate(t);
      setActiveCode(t.files[0]?.code || '');
      onClearCustomCode?.();
      setLogs([]);
    }
  };

  const handleReset = () => {
    if (isCustomMode && customCode) {
      setActiveCode(customCode);
    } else {
      setActiveCode(selectedTemplate.files[0]?.code || '');
    }
    setLogs([]);
  };

  const handleAddLog = (newLog: Omit<ConsoleLogEntry, 'id' | 'timestamp'>) => {
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
        ...newLog
      }
    ]);
  };

  return (
    <div className="space-y-4">
      {/* Top Banner / Template Selector */}
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center border border-[#10B981]/30">
            <Code2 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#0A0A0A] dark:text-white">
                {title || 'Mini React Code Playground'}
              </h3>
              <span className="text-[10px] font-mono bg-[#10B981]/15 text-[#10B981] px-2 py-0.5 rounded font-bold">
                Interactif Live
              </span>
            </div>
            <p className="text-xs text-[#0A0A0A]/60 dark:text-white/60 mt-0.5">
              Éditez le code, observez l'impact immédiat dans le rendu et inspectez la console.
            </p>
          </div>
        </div>

        {/* Template Switcher & Nouveau Starter Action */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleResetToStarter}
            title="Revenir au composant de base propre (import React, useState, texte)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#10B981]/15 hover:bg-[#10B981]/25 text-[#10B981] border border-[#10B981]/30 text-xs font-mono font-bold transition-all shadow-2xs cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Nouveau Starter</span>
          </button>

          
        </div>
      </div>

      {/* Main Workspace (Editor + Live Preview side-by-side with matching height) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
        {/* Left Column: Code Editor */}
        <div className="h-[380px] sm:h-[480px] lg:h-[620px] flex flex-col">
          <CodeEditor
            code={activeCode}
            onChange={setActiveCode}
            fileName={isCustomMode ? 'ExempleCours.jsx' : (selectedTemplate.files[0]?.name || 'App.jsx')}
            onReset={handleReset}
          />
        </div>

        {/* Right Column: Live Preview Panel */}
        <div className="h-[380px] sm:h-[480px] lg:h-[620px] flex flex-col">
          <LivePreview
            code={activeCode}
            fileName={isCustomMode ? 'ExempleCours.jsx' : (selectedTemplate.files[0]?.name || 'App.jsx')}
            onLog={handleAddLog}
            onResetToReact={handleReset}
          />
        </div>
      </div>

      {/* Bottom Row: Virtual Console positioned underneath BOTH Editor and Preview */}
      <div className={isConsoleCollapsed ? 'h-auto' : 'h-[180px] sm:h-[220px]'}>
        <VirtualConsole
          logs={logs}
          onClear={() => setLogs([])}
          isCollapsed={isConsoleCollapsed}
          onToggleCollapse={() => setIsConsoleCollapsed(!isConsoleCollapsed)}
        />
      </div>
    </div>
  );
}

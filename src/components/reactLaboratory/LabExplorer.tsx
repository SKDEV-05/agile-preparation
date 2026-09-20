import React, { useState } from 'react';
import { 
  FolderOpen, 
  FileCode, 
  ChevronDown, 
  ChevronRight, 
  FileJson, 
  FileText, 
  Plus, 
  Trash2, 
  Check, 
  X 
} from 'lucide-react';
import { LabFile } from '../../types/reactLabTypes';

interface LabExplorerProps {
  files: LabFile[];
  activeFilePath: string;
  onSelectFile: (path: string) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  onAddFile?: (fileName: string) => void;
  onDeleteFile?: (filePath: string) => void;
  entryFilePath?: string;
}

export function LabExplorer({
  files,
  activeFilePath,
  onSelectFile,
  isOpen,
  onToggleOpen,
  onAddFile,
  onDeleteFile,
  entryFilePath
}: LabExplorerProps) {
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.jsx') || fileName.endsWith('.tsx') || fileName.endsWith('.js')) {
      return <FileCode className="h-3.5 w-3.5 text-[#10B981]" />;
    }
    if (fileName.endsWith('.json')) {
      return <FileJson className="h-3.5 w-3.5 text-[#22C55E]" />;
    }
    return <FileText className="h-3.5 w-3.5 text-slate-400 dark:text-white/60" />;
  };

  const handleCreateFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;

    let cleanName = newFileName.trim();
    if (!cleanName.includes('.')) {
      cleanName += '.jsx';
    }

    if (onAddFile) {
      onAddFile(cleanName);
    }
    setNewFileName('');
    setIsCreatingFile(false);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#121212] border-r border-slate-200 dark:border-white/10 text-slate-800 dark:text-white select-none text-xs font-mono transition-colors">
      {/* Explorer Header */}
      <div 
        className="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-[#181818] border-b border-slate-200 dark:border-white/10"
      >
        <div 
          onClick={onToggleOpen}
          className="flex items-center gap-1.5 cursor-pointer hover:text-[#10B981] transition-colors"
        >
          {isOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-white/50">
            Explorateur
          </span>
        </div>

        {onAddFile && isOpen && (
          <button
            onClick={() => setIsCreatingFile(true)}
            title="Créer un nouveau fichier"
            className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 dark:text-white/60 hover:text-[#10B981] transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Files Tree */}
      {isOpen && (
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {/* Project Root Folder */}
          <div className="flex items-center justify-between px-2 py-1 text-slate-600 dark:text-white/60 text-[11px] font-bold">
            <div className="flex items-center gap-1.5">
              <FolderOpen className="h-3.5 w-3.5 text-[#10B981]" />
              <span>src/</span>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-white/40">{files.length} fichiers</span>
          </div>

          {/* New File Creation Input Form */}
          {isCreatingFile && (
            <form onSubmit={handleCreateFile} className="px-2 py-1">
              <div className="flex items-center gap-1 bg-white dark:bg-[#1e1e1e] p-1 rounded-lg border border-[#10B981] shadow-2xs">
                <FileCode className="h-3 w-3 text-[#10B981] shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="ex: MonComposant.jsx"
                  className="w-full bg-transparent text-[11px] text-slate-800 dark:text-white focus:outline-none placeholder-slate-400 dark:placeholder-white/30"
                />
                <button
                  type="submit"
                  disabled={!newFileName.trim()}
                  className="p-1 text-[#10B981] hover:bg-[#10B981]/20 rounded cursor-pointer disabled:opacity-30"
                >
                  <Check className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  onClick={() => { setIsCreatingFile(false); setNewFileName(''); }}
                  className="p-1 text-slate-400 hover:text-slate-800 dark:text-white/40 dark:hover:text-white rounded cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </form>
          )}

          {/* Files List */}
          <div className="pl-2 space-y-0.5">
            {files.map(file => {
              const isActive = file.path === activeFilePath;
              const isEntry = file.path === entryFilePath || file.path === 'src/App.jsx';

              return (
                <div
                  key={file.path}
                  className={`group flex items-center justify-between w-full px-2 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#10B981]/15 text-[#10B981] font-bold border border-[#10B981]/30'
                      : 'text-slate-700 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white border border-transparent'
                  }`}
                >
                  <button
                    onClick={() => onSelectFile(file.path)}
                    className="flex items-center gap-2 flex-1 truncate text-left cursor-pointer"
                  >
                    {getFileIcon(file.name)}
                    <span className="truncate text-[11px]">{file.name}</span>
                  </button>

                  {/* Delete button (protected from entry file) */}
                  {!isEntry && onDeleteFile && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Supprimer le fichier "${file.name}" ?`)) {
                          onDeleteFile(file.path);
                        }
                      }}
                      title="Supprimer ce fichier"
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-500 dark:text-white/30 dark:hover:text-red-400 transition-opacity cursor-pointer"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Helper Button at bottom */}
          {!isCreatingFile && onAddFile && (
            <div className="pt-2 px-2">
              <button
                onClick={() => setIsCreatingFile(true)}
                className="flex items-center gap-1.5 w-full px-2 py-1.5 rounded-lg text-[11px] text-slate-500 dark:text-white/40 hover:text-[#10B981] hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-dashed border-slate-300 dark:border-white/10"
              >
                <Plus className="h-3 w-3" />
                <span>Nouveau fichier</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

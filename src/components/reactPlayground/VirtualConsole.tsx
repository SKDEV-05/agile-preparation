import React from 'react';
import { Terminal, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export interface ConsoleLogEntry {
  id: string;
  type: 'log' | 'warn' | 'error' | 'info';
  message: string;
  timestamp: string;
}

interface VirtualConsoleProps {
  logs: ConsoleLogEntry[];
  onClear: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function VirtualConsole({ logs, onClear, isCollapsed, onToggleCollapse }: VirtualConsoleProps) {
  return (
    <div className={`rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] text-slate-800 dark:text-white p-3 font-mono text-xs flex flex-col ${isCollapsed ? 'h-auto' : 'h-full'} overflow-hidden shadow-xs transition-all`}>
      {/* Header */}
      <div className={`flex items-center justify-between ${isCollapsed ? 'pb-0 mb-0' : 'pb-2 mb-2 border-b border-black/10 dark:border-white/10'} text-[11px] text-slate-500 dark:text-white/60 select-none`}>
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-[#10B981]" />
          <span className="font-bold text-slate-800 dark:text-white">Console Virtuelle</span>
          <span className="bg-black/5 dark:bg-white/10 px-1.5 py-0.2 rounded text-[10px] text-[#10B981] font-bold">
            {logs.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClear}
            title="Effacer la console"
            className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-white/50 hover:text-red-500 dark:hover:text-white transition-colors cursor-pointer px-2 py-0.5 rounded hover:bg-black/5 dark:hover:bg-white/5"
          >
            <Trash2 className="h-3 w-3" />
            <span>Effacer</span>
          </button>

          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              title={isCollapsed ? "Développer la console" : "Réduire la console"}
              className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-white/50 hover:text-[#10B981] transition-colors cursor-pointer px-2 py-0.5 rounded hover:bg-black/5 dark:hover:bg-white/5"
            >
              {isCollapsed ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              <span>{isCollapsed ? "Développer" : "Réduire"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Logs output */}
      {!isCollapsed && (
        <div className="flex-1 min-h-0 overflow-y-auto space-y-1 pr-1 select-text">
        {logs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400 dark:text-white/40 text-[11px] italic">
            Aucun log console. Déclenchez une action dans le composant pour voir les sorties.
          </div>
        ) : (
          logs.map(log => {
            const isError = log.type === 'error';
            const isWarn = log.type === 'warn';

            return (
              <div
                key={log.id}
                className={`flex items-start gap-2 py-0.5 leading-tight ${
                  isError
                    ? 'text-red-500'
                    : isWarn
                    ? 'text-[#22C55E]'
                    : 'text-[#10B981]'
                }`}
              >
                <span className="text-[10px] opacity-40 shrink-0 select-none">
                  {log.timestamp}
                </span>
                <span className="font-bold select-none text-[10px] uppercase">
                  [{log.type}]
                </span>
                <span className="break-all whitespace-pre-wrap flex-1 text-slate-700 dark:text-slate-200">
                  {log.message}
                </span>
              </div>
            );
          })
        )}
      </div>
      )}
    </div>
  );
}

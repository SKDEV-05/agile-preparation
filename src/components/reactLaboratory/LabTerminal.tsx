import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Trash2, CornerDownLeft } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface LabTerminalProps {
  onRunCode: () => void;
  onRunTests: () => void;
}

export function LabTerminal({ onRunCode, onRunTests }: LabTerminalProps) {
  const { isDark } = useTheme();
  const [history, setHistory] = useState<Array<{ text: string; isInput?: boolean; color?: string }>>([
    { text: 'OFPPT React Interactive Environment · Node v18.19.0', color: '#10B981' },
    { text: 'Tapez "help" pour afficher les commandes disponibles ou "npm start" pour lancer le projet.', color: '#94a3b8' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, { text: `$ ${cmd}`, isInput: true }];

    if (trimmed === 'clear' || trimmed === 'cls') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (trimmed === 'help') {
      newHistory.push({ text: 'Commandes disponibles :' });
      newHistory.push({ text: '  npm start       - Exécute le code React dans l\'aperçu en direct' });
      newHistory.push({ text: '  npm test        - Exécute la suite de tests pédagogiques' });
      newHistory.push({ text: '  clear           - Efface l\'écran du terminal' });
      newHistory.push({ text: '  node -v         - Affiche la version d\'exécution Node.js' });
    } else if (trimmed === 'npm start' || trimmed === 'npm run start' || trimmed === 'npm run dev') {
      newHistory.push({ text: '> react-app@0.1.0 start', color: '#64748b' });
      newHistory.push({ text: 'Compiling React components...', color: '#64748b' });
      newHistory.push({ text: '✓ Compiled successfully in 140ms', color: '#10B981' });
      newHistory.push({ text: 'Local preview updated: http://localhost:3000', color: '#22C55E' });
      onRunCode();
    } else if (trimmed === 'npm test' || trimmed === 'npm run test') {
      newHistory.push({ text: '> react-app@0.1.0 test', color: '#64748b' });
      newHistory.push({ text: 'Running test suites...', color: '#64748b' });
      newHistory.push({ text: '✓ Tests executed. Consultez l\'onglet "Tests" pour le détail.', color: '#10B981' });
      onRunTests();
    } else if (trimmed === 'node -v') {
      newHistory.push({ text: 'v18.19.0 (OFPPT Virtual Sandbox)' });
    } else if (trimmed === '') {
      // Empty enter
    } else {
      newHistory.push({ text: `Commande inconnue: "${cmd}". Tapez "help" pour voir la liste des commandes.`, color: '#f87171' });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  const getLogColor = (rawColor?: string) => {
    if (!rawColor) {
      return isDark ? '#e2e8f0' : '#1e293b';
    }
    if (!isDark) {
      if (rawColor === '#10B981') return '#059669';
      if (rawColor === '#94a3b8' || rawColor === '#64748b') return '#475569';
      if (rawColor === '#22C55E') return '#16a34a';
      if (rawColor === '#f87171') return '#dc2626';
    }
    return rawColor;
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0A0A0A] text-slate-800 dark:text-slate-100 p-3 font-mono text-xs overflow-hidden transition-colors border-t border-slate-200 dark:border-white/10">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10 mb-2">
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-slate-500 dark:text-white/50">
          <Terminal className="h-3 w-3 text-[#10B981]" />
          <span>Terminal Interactif Sécurisé</span>
        </span>
        <button
          onClick={() => setHistory([])}
          title="Effacer le terminal"
          className="text-slate-400 dark:text-white/40 hover:text-red-500 dark:hover:text-white transition-colors cursor-pointer"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 overflow-y-auto space-y-1 select-text">
        {history.map((item, idx) => (
          <div
            key={idx}
            style={{ color: getLogColor(item.color) }}
            className={`text-[11px] leading-relaxed whitespace-pre-wrap ${
              item.isInput ? 'font-bold text-slate-900 dark:text-white' : ''
            }`}
          >
            {item.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Command Prompt Input */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-white/10 mt-1">
        <span className="text-[#10B981] font-bold">$</span>
        <input
          type="text"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tapez 'npm start' ou 'help'..."
          className="flex-1 bg-transparent text-slate-900 dark:text-white outline-none border-0 text-[11px] font-mono placeholder:text-slate-400 dark:placeholder:text-white/30"
        />
        <button
          onClick={() => handleCommand(inputVal)}
          className="text-slate-400 dark:text-white/40 hover:text-[#10B981] transition-colors cursor-pointer"
        >
          <CornerDownLeft className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Play, RotateCcw, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';

export function StateLifecycleVisualizer() {
  const [phase, setPhase] = useState<'idle' | 'mount' | 'effect' | 'dep_change' | 'cleanup' | 'unmount'>('idle');
  const [log, setLog] = useState<string[]>(['Prêt. Cliquez sur une étape pour observer le cycle.']);

  const triggerStep = (newPhase: typeof phase, message: string) => {
    setPhase(newPhase);
    setLog(prev => [message, ...prev.slice(0, 4)]);
  };

  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-4 sm:p-6 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/10 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider">
            <Activity className="h-4 w-4" />
            <span>Simulateur de Cycle de Vie · useEffect & Dépendances</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-[#0A0A0A] dark:text-white mt-0.5">
            Montage $\rightarrow$ Dépendances $\rightarrow$ Nettoyage (Cleanup)
          </h4>
        </div>

        <button
          onClick={() => {
            setPhase('idle');
            setLog(['Réinitialisé. Prêt.']);
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 text-xs font-mono text-[#0A0A0A]/70 dark:text-white/70 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Interactive Step Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => triggerStep('mount', '1. Montage : Le JSX est injecté dans le DOM réel.')}
          className={`p-2.5 rounded-xl border text-xs font-bold font-mono transition-all text-left cursor-pointer ${
            phase === 'mount'
              ? 'bg-[#10B981] text-white border-[#10B981] shadow-xs'
              : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/10 dark:border-white/10 hover:border-[#10B981]'
          }`}
        >
          <div className="text-[10px] opacity-70">Étape 1</div>
          <div>1. Montage DOM</div>
        </button>

        <button
          onClick={() => triggerStep('effect', '2. Exécution de useEffect() : Requête API / Timer lancé.')}
          className={`p-2.5 rounded-xl border text-xs font-bold font-mono transition-all text-left cursor-pointer ${
            phase === 'effect'
              ? 'bg-[#10B981] text-white border-[#10B981] shadow-xs'
              : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/10 dark:border-white/10 hover:border-[#10B981]'
          }`}
        >
          <div className="text-[10px] opacity-70">Étape 2</div>
          <div>2. Effet Exécuté</div>
        </button>

        <button
          onClick={() => triggerStep('dep_change', '3. Dépendance altérée : Cleanup du précédent + ré-exécution.')}
          className={`p-2.5 rounded-xl border text-xs font-bold font-mono transition-all text-left cursor-pointer ${
            phase === 'dep_change'
              ? 'bg-[#22C55E] text-white border-[#22C55E] shadow-xs'
              : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/10 dark:border-white/10 hover:border-[#22C55E]'
          }`}
        >
          <div className="text-[10px] opacity-70">Étape 3</div>
          <div>3. [dep] Changé</div>
        </button>

        <button
          onClick={() => triggerStep('unmount', '4. Démontage : Exécution de return () => clearInterval()')}
          className={`p-2.5 rounded-xl border text-xs font-bold font-mono transition-all text-left cursor-pointer ${
            phase === 'unmount'
              ? 'bg-black/80 dark:bg-white/20 text-white border-transparent shadow-xs'
              : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/10 dark:border-white/10 hover:border-red-500'
          }`}
        >
          <div className="text-[10px] opacity-70">Étape 4</div>
          <div>4. Démontage</div>
        </button>
      </div>

      {/* Visual Workflow Diagram */}
      <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4 font-mono text-xs space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-[#10B981] pb-1 border-b border-black/10 dark:border-white/10">
          <span>Journal d'exécution du cycle de vie</span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>Actif</span>
          </span>
        </div>
        <div className="space-y-1">
          {log.map((entry, idx) => (
            <div key={idx} className="flex items-start gap-2 text-[#0A0A0A]/80 dark:text-white/80">
              <span className="text-[#10B981] font-bold">&gt;</span>
              <span>{entry}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

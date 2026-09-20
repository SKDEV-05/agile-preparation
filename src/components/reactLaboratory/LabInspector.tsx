import React from 'react';
import { Layers, Activity, GitBranch, Box } from 'lucide-react';
import { LabExercise } from '../../types/reactLabTypes';

interface LabInspectorProps {
  exercise: LabExercise;
  activeCode: string;
}

export function LabInspector({ exercise, activeCode }: LabInspectorProps) {
  // Extract detected components and state from code
  const hasUseState = /useState\(/.test(activeCode);
  const hasUseEffect = /useEffect\(/.test(activeCode);
  const detectedComponents = activeCode.match(/function\s+([A-Z][a-zA-Z0-9_$]*)/g)?.map(m => m.replace('function ', '')) || ['App'];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#121212] text-slate-800 dark:text-white p-3 space-y-3 text-xs font-mono overflow-y-auto transition-colors">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#10B981]">
          <Layers className="h-3 w-3" />
          <span>Inspecteur de Composants &amp; État Réactif</span>
        </span>
        <span className="text-[10px] text-emerald-600 dark:text-[#10B981] font-bold">
          ● DevTools Simulé
        </span>
      </div>

      {/* Component Tree */}
      <div className="space-y-1.5">
        <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-white/40 flex items-center gap-1">
          <GitBranch className="h-3 w-3" />
          <span>Arbre des Composants (DOM Virtuel)</span>
        </span>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 space-y-1.5">
          {detectedComponents.map((comp, idx) => (
            <div
              key={idx}
              style={{ marginLeft: `${idx * 16}px` }}
              className="flex items-center gap-2 p-1.5 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs text-slate-800 dark:text-white"
            >
              <Box className="h-3 w-3 text-emerald-600 dark:text-[#10B981]" />
              <span className="font-bold">&lt;{comp} /&gt;</span>
              {idx === 0 && (
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-700 dark:text-[#10B981] font-bold">Racine</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hooks & Local State Overview */}
      <div className="space-y-1.5">
        <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-white/40 flex items-center gap-1">
          <Activity className="h-3 w-3" />
          <span>Hooks Détectés dans l'Atelier</span>
        </span>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-500 dark:text-white/40">useState()</span>
            <p className={`text-xs font-bold ${hasUseState ? 'text-emerald-600 dark:text-[#10B981]' : 'text-slate-400 dark:text-white/30'}`}>
              {hasUseState ? '● Actif (État Local)' : '○ Inactif'}
            </p>
          </div>

          <div className="p-2 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 space-y-0.5">
            <span className="text-[10px] text-slate-500 dark:text-white/40">useEffect()</span>
            <p className={`text-xs font-bold ${hasUseEffect ? 'text-[#22C55E]' : 'text-slate-400 dark:text-white/30'}`}>
              {hasUseEffect ? '● Actif (Cycle de Vie)' : '○ Inactif'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

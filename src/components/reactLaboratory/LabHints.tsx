import React, { useState } from 'react';
import { Lightbulb, Eye, EyeOff, Lock, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { LabHint } from '../../types/reactLabTypes';

interface LabHintsProps {
  hints: LabHint[];
  solution: {
    explanation: string;
    files: { path: string; content: string }[];
  };
  onApplySolution?: (files: { path: string; content: string }[]) => void;
}

export function LabHints({ hints, solution, onApplySolution }: LabHintsProps) {
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0A0A0A] text-slate-800 dark:text-white p-3 space-y-3 text-xs font-mono overflow-y-auto transition-colors">
      {/* Top Header Strip */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-[#10B981]/15 text-[#10B981] flex items-center justify-center border border-[#10B981]/30">
            <Lightbulb className="h-3.5 w-3.5" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Système d'Indices Pédagogiques
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-[10px] font-bold">
          <span>{unlockedLevel} / {hints.length} révélés</span>
        </div>
      </div>

      {/* Progressive Hints List */}
      <div className="space-y-2.5">
        {hints.map(hint => {
          const isUnlocked = hint.level <= unlockedLevel;
          const isNextToUnlock = !isUnlocked && hint.level === unlockedLevel + 1;

          return (
            <div
              key={hint.level}
              className={`rounded-xl border transition-all ${
                isUnlocked
                  ? 'p-3 bg-slate-50 dark:bg-white/[0.03] border-[#10B981]/30 dark:border-[#10B981]/25 text-slate-800 dark:text-white'
                  : isNextToUnlock
                  ? 'p-3 bg-white dark:bg-[#141414] border-slate-300 dark:border-white/15 shadow-xs'
                  : 'p-2.5 bg-slate-100/60 dark:bg-black/40 border-slate-200 dark:border-white/5 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`h-5 w-5 rounded-md flex items-center justify-center font-bold text-[10px] ${
                    isUnlocked 
                      ? 'bg-[#10B981] text-white shadow-2xs' 
                      : isNextToUnlock
                      ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40'
                      : 'bg-black/5 dark:bg-white/5 text-slate-400 dark:text-white/30'
                  }`}>
                    {hint.level}
                  </span>
                  <span className={`font-bold text-xs ${isUnlocked ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-white/70'}`}>
                    {hint.title}
                  </span>
                </div>

                {isNextToUnlock && (
                  <button
                    onClick={() => setUnlockedLevel(hint.level)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#10B981] hover:bg-[#22C55E] text-white text-[11px] font-bold transition-all shadow-2xs cursor-pointer"
                  >
                    <Lightbulb className="h-3 w-3" />
                    <span>Débloquer l'indice {hint.level}</span>
                  </button>
                )}
              </div>

              {isUnlocked ? (
                <p className="text-[11px] text-slate-600 dark:text-white/80 font-sans mt-2 pl-7 leading-relaxed">
                  {hint.content}
                </p>
              ) : !isNextToUnlock ? (
                <p className="text-[10px] text-slate-400 dark:text-white/30 font-sans mt-1 pl-7 italic flex items-center gap-1.5">
                  <Lock className="h-3 w-3 shrink-0" />
                  <span>Indice verrouillé pour encourager l'autonomie.</span>
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Official Solution Section */}
      <div className="pt-2 border-t border-slate-200 dark:border-white/10 shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-700 dark:text-white/70">
            Solution Officielle de l'Atelier :
          </span>
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-700 dark:text-white/80 text-[11px] font-mono transition-colors cursor-pointer border border-black/5 dark:border-white/10"
          >
            {showSolution ? <EyeOff className="h-3.5 w-3.5 text-[#10B981]" /> : <Eye className="h-3.5 w-3.5 text-[#10B981]" />}
            <span>{showSolution ? 'Masquer la solution' : 'Révéler la solution'}</span>
          </button>
        </div>

        {showSolution && (
          <div className="mt-2.5 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2.5">
            <p className="text-xs text-slate-700 dark:text-white/80 font-sans leading-relaxed">
              {solution.explanation}
            </p>

            {solution.files.map(sf => (
              <div key={sf.path} className="space-y-1">
                <span className="text-[10px] text-[#10B981] font-bold">{sf.path} :</span>
                <pre className="p-2.5 rounded-xl bg-slate-100 dark:bg-black/70 border border-slate-200 dark:border-white/10 text-[10px] text-slate-800 dark:text-white/90 overflow-x-auto whitespace-pre font-mono">
                  {sf.content}
                </pre>
              </div>
            ))}

            {onApplySolution && (
              <button
                onClick={() => onApplySolution(solution.files)}
                className="w-full mt-2 py-2 rounded-xl bg-[#10B981] hover:bg-[#22C55E] text-white font-mono text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Injecter cette solution dans l'éditeur</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

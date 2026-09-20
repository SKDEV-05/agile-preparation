import React from 'react';
import { CheckCircle2, XCircle, Award, Sparkles } from 'lucide-react';
import { LabTest, LabFile } from '../../types/reactLabTypes';

interface LabTestRunnerProps {
  tests: LabTest[];
  code: string;
  activeFilePath: string;
  allFiles: LabFile[];
  onValidateLab: () => void;
  isSolved: boolean;
}

export function LabTestRunner({
  tests,
  code,
  activeFilePath,
  allFiles,
  onValidateLab,
  isSolved
}: LabTestRunnerProps) {
  // Evaluate tests against current code
  const results = tests.map(test => {
    try {
      const passed = test.check(code, activeFilePath, allFiles);
      return { ...test, passed };
    } catch {
      return { ...test, passed: false };
    }
  });

  const passedCount = results.filter(r => r.passed).length;
  const allPassed = passedCount === tests.length && tests.length > 0;
  const passPercent = tests.length > 0 ? Math.round((passedCount / tests.length) * 100) : 0;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0A0A0A] text-slate-800 dark:text-white p-3 space-y-3 text-xs font-mono overflow-y-auto transition-colors">
      {/* Top Test Summary Header */}
      <div className="p-3 bg-slate-50 dark:bg-white/[0.03] rounded-xl border border-slate-200 dark:border-white/10 shrink-0 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Validation Pédagogique OFPPT
            </span>
            <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
              allPassed 
                ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30' 
                : 'bg-black/5 dark:bg-white/10 text-slate-700 dark:text-white/70 border border-black/10 dark:border-white/10'
            }`}>
              {passedCount} / {tests.length} validés ({passPercent}%)
            </span>
          </div>

          {allPassed && !isSolved && (
            <button
              onClick={onValidateLab}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#10B981] hover:bg-[#22C55E] text-white font-bold text-xs shadow-2xs transition-all cursor-pointer"
            >
              <Award className="h-3.5 w-3.5" />
              <span>Valider l'Atelier</span>
            </button>
          )}

          {isSolved && (
            <span className="flex items-center gap-1 text-[#10B981] font-bold text-xs">
              <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
              <span>Atelier Validé</span>
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#10B981] to-[#22C55E] transition-all duration-500 rounded-full" 
            style={{ width: `${passPercent}%` }} 
          />
        </div>
      </div>

      {/* Tests Checklist */}
      <div className="space-y-2">
        {results.map(test => (
          <div
            key={test.id}
            className={`p-3 rounded-xl border transition-all ${
              test.passed
                ? 'bg-[#10B981]/5 dark:bg-[#10B981]/10 border-[#10B981]/30 text-slate-900 dark:text-white'
                : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/5 text-slate-700 dark:text-white/70'
            }`}
          >
            <div className="flex items-center gap-2">
              {test.passed ? (
                <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-slate-400 dark:text-white/30 shrink-0" />
              )}
              <span className={`font-bold text-xs ${test.passed ? 'text-[#10B981]' : 'text-slate-800 dark:text-white/80'}`}>
                {test.title}
              </span>
            </div>

            <p className="text-[11px] text-slate-600 dark:text-white/60 pl-6 mt-1 font-sans leading-relaxed">
              {test.description}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Feedback Note */}
      {allPassed ? (
        <div className="p-3 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 text-slate-800 dark:text-white font-sans text-xs">
          <p className="font-bold text-[#10B981]">🎉 Tous les critères de l'atelier sont validés !</p>
          <p className="text-slate-600 dark:text-white/70 text-[11px] mt-0.5">
            Votre code respecte les bonnes pratiques officielles de l'examen OFPPT. Cliquez sur "Valider l'Atelier" pour enregistrer votre progression.
          </p>
        </div>
      ) : (
        <p className="text-[10px] text-slate-400 dark:text-white/40 text-center font-sans">
          Complétez les critères ci-dessus en modifiant le code et cliquez sur "Exécuter ▶".
        </p>
      )}
    </div>
  );
}

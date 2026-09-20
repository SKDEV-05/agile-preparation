import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, ArrowRight, BookOpen } from 'lucide-react';
import { LabExercise } from '../../types/reactLabTypes';

interface LabSuccessModalProps {
  exercise: LabExercise;
  onNextExercise: () => void;
  onClose: () => void;
}

export function LabSuccessModal({
  exercise,
  onNextExercise,
  onClose
}: LabSuccessModalProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const qcm = exercise.microQcm;

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-[#10B981]/40 bg-white dark:bg-[#121212] text-slate-800 dark:text-white p-6 shadow-2xl space-y-5 transition-colors">
        {/* Celebration Header */}
        <div className="text-center space-y-2">
          <div className="h-14 w-14 rounded-2xl bg-[#10B981]/15 dark:bg-[#10B981]/20 border border-[#10B981]/30 dark:border-[#10B981]/40 text-[#10B981] flex items-center justify-center mx-auto animate-bounce">
            <Award className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Atelier Validé avec Succès !
          </h2>
          <p className="text-xs text-slate-600 dark:text-white/60">
            Félicitations, vous avez complété <strong className="text-emerald-600 dark:text-[#10B981]">{exercise.title}</strong> selon les normes officielles OFPPT.
          </p>
        </div>

        {/* Micro-QCM Verification */}
        {qcm && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-3 font-mono text-xs transition-colors">
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#10B981]">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Vérification de Compréhension (Micro-QCM)</span>
            </div>

            <p className="font-sans text-sm font-semibold text-slate-900 dark:text-white">
              {qcm.question}
            </p>

            <div className="space-y-1.5 font-sans">
              {qcm.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = qcm.correctIndex === idx;

                let btnStyle = 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-white/80 hover:bg-slate-100 dark:hover:bg-white/10';
                if (hasAnswered) {
                  if (isCorrect) {
                    btnStyle = 'border-[#10B981] dark:border-[#10B981]/60 bg-[#10B981]/15 dark:bg-[#10B981]/20 text-emerald-700 dark:text-[#10B981] font-bold';
                  } else if (isSelected) {
                    btnStyle = 'border-red-400 dark:border-red-500/60 bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-400';
                  } else {
                    btnStyle = 'border-slate-200 dark:border-white/5 opacity-40';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={hasAnswered}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition-colors cursor-pointer flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {hasAnswered && isCorrect && <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0" />}
                    {hasAnswered && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-red-500 dark:text-red-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {hasAnswered && (
              <div className="p-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] text-slate-700 dark:text-white/70 font-sans">
                <strong className="text-slate-900 dark:text-white">Explication officielle :</strong> {qcm.explanation}
              </div>
            )}
          </div>
        )}

        {/* Modal CTAs */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 hover:text-slate-900 dark:text-white/70 dark:hover:text-white text-xs font-mono font-bold transition-colors cursor-pointer border border-slate-200 dark:border-transparent"
          >
            Rester sur l'atelier
          </button>

          <button
            onClick={() => {
              onClose();
              onNextExercise();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#22C55E] text-white font-mono text-xs font-bold transition-all shadow-md hover:shadow-emerald-500/20 cursor-pointer"
          >
            <span>Atelier suivant</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

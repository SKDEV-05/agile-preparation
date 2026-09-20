import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, RotateCcw, ArrowRight, BookOpen } from 'lucide-react';
import { useReactProgress } from '../../store/reactProgressStore';
import { REACT_QUESTIONS_MAP } from '../../data/reactQuestions';

interface ReactErrorsProps {
  onBackToDashboard: () => void;
}

export function ReactErrorsPage({ onBackToDashboard }: ReactErrorsProps) {
  const { progress, clearResolvedError } = useReactProgress();
  const [retryAnswers, setRetryAnswers] = useState<Record<string, number>>({});
  const [resolvedNotice, setResolvedNotice] = useState<string | null>(null);

  const errorQuestions = progress.wrongQuestionIds
    .map(id => REACT_QUESTIONS_MAP[id])
    .filter(Boolean);

  const handleRetry = (questionId: string, optIdx: number, correctIdx: number) => {
    setRetryAnswers(prev => ({ ...prev, [questionId]: optIdx }));
    if (optIdx === correctIdx) {
      setResolvedNotice(questionId);
      setTimeout(() => {
        clearResolvedError(questionId);
        setResolvedNotice(null);
      }, 1200);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto text-[#0A0A0A] dark:text-white select-none pb-12">
      {/* Header */}
      <section className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-6 sm:p-8 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500">
          <AlertTriangle className="h-4 w-4" />
          <span>Carnet Pédagogique des Erreurs · React &amp; Redux</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#0A0A0A] dark:text-white tracking-tight">
          Transformer vos Erreurs en Points d'Examen
        </h1>
        <p className="text-xs sm:text-sm text-[#0A0A0A]/70 dark:text-white/70 max-w-2xl leading-relaxed">
          Toutes les questions manquées lors des QCM et examens blancs sont automatiquement consignées ici.
          Relisez l'explication officielle et retentez la question pour la supprimer définitivement du carnet.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <span className="font-mono text-xs font-bold text-red-500 bg-red-500/15 px-3 py-1 rounded-full border border-red-500/30">
            {errorQuestions.length} notion(s) à maîtriser
          </span>
          <button
            onClick={onBackToDashboard}
            className="px-3.5 py-1 rounded-full border border-black/15 dark:border-white/15 text-xs font-mono font-bold hover:border-[#10B981] transition-colors cursor-pointer"
          >
            ← Retour au tableau de bord
          </button>
        </div>
      </section>

      {/* Errors list */}
      {errorQuestions.length === 0 ? (
        <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-10 text-center space-y-3 shadow-xs">
          <div className="h-14 w-14 rounded-2xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold">Carnet d'Erreurs Vierge !</h3>
          <p className="text-xs text-[#0A0A0A]/60 dark:text-white/60 max-w-md mx-auto">
            Vous avez assimilé toutes les notions ou n'avez pas encore passé d'épreuve. Continuez votre révision avec les modules de cours !
          </p>
          <button
            onClick={onBackToDashboard}
            className="px-4 py-2 rounded-xl bg-[#10B981] hover:bg-[#22C55E] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            Accéder aux Cours React
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {errorQuestions.map((q, idx) => {
            const chosen = retryAnswers[q.id];
            const isResolved = resolvedNotice === q.id;

            return (
              <div
                key={q.id}
                className={`rounded-3xl border transition-all duration-300 bg-white dark:bg-[#0A0A0A] p-6 space-y-4 shadow-xs ${
                  isResolved
                    ? 'border-[#10B981] bg-[#10B981]/5 scale-[0.98]'
                    : 'border-red-500/20'
                }`}
              >
                {/* Question Tag */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-red-500 bg-red-500/10 px-2.5 py-0.5 rounded-full">
                    {q.tag}
                  </span>
                  <span className="text-[10px] font-mono text-[#0A0A0A]/40 dark:text-white/40">
                    Erreur #{idx + 1}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[#0A0A0A] dark:text-white leading-snug">
                  {q.question}
                </h3>

                {/* Options for Retry */}
                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = chosen === oIdx;
                    const isCorrect = oIdx === q.correctIndex;

                    let btnStyle = 'border-black/10 dark:border-white/10 hover:border-[#10B981] bg-black/[0.01] dark:bg-white/[0.01]';
                    if (chosen !== undefined) {
                      if (isCorrect) {
                        btnStyle = 'border-[#10B981] bg-[#10B981]/15 text-[#10B981] font-bold';
                      } else if (isSelected) {
                        btnStyle = 'border-red-500 bg-red-500/15 text-red-500 font-bold';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleRetry(q.id, oIdx, q.correctIndex)}
                        className={`w-full text-left p-3 rounded-2xl border text-xs transition-all flex items-start gap-2.5 cursor-pointer ${btnStyle}`}
                      >
                        <span className="w-5 h-5 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center font-mono text-[11px] shrink-0">
                          {oIdx + 1}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card */}
                <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 space-y-1 text-xs">
                  <div className="font-mono font-bold text-[#10B981]">
                    Rappel Pédagogique Officiel :
                  </div>
                  <p className="text-[#0A0A0A]/80 dark:text-white/80 leading-relaxed font-mono">
                    {q.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

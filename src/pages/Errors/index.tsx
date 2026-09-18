import { useState } from 'react';
import { useProgress } from '../../store/progressStore';
import { ALL_QUESTIONS } from '../../data/questions';
import { QuizRunner } from '../../components/quiz/QuizRunner';
import { Button } from '../../components/ui/Button';
import { AlertTriangle, CheckCircle2, Play } from 'lucide-react';
import { Question } from '../../types';

interface ErrorsPageProps {
  onBackToDashboard: () => void;
}

export function ErrorsPage({ onBackToDashboard }: ErrorsPageProps) {
  const { progress, clearResolvedError } = useProgress();
  const [selectedPartFilter, setSelectedPartFilter] = useState<string>('all');
  const [isQuizMode, setIsQuizMode] = useState(false);

  // Retrieve full question objects for wrong IDs
  const wrongQuestions: Question[] = progress.wrongQuestionIds
    .map(id => ALL_QUESTIONS.find(q => q.id === id))
    .filter((q): q is Question => q !== undefined);

  const filteredErrors = selectedPartFilter === 'all'
    ? wrongQuestions
    : wrongQuestions.filter(q => q.partId === selectedPartFilter);

  if (isQuizMode && filteredErrors.length > 0) {
    return (
      <QuizRunner
        questions={filteredErrors}
        title="Session de rattrapage · Mes Erreurs"
        subtitle="Révise et valide définitivement tes notions manquées"
        onExit={() => setIsQuizMode(false)}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-6 sm:space-y-8 select-none">
      {/* Header Banner */}
      <div className="reveal-on-scroll rounded-3xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] backdrop-blur-xl p-6 sm:p-9 shadow-xl relative overflow-hidden text-[#0A0A0A] dark:text-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] shadow-xs shrink-0">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider">
                Carnet Pédagogique · Rattrapage Actif
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] dark:text-white tracking-tight mt-0.5">
                Mes Erreurs à Réviser
              </h1>
            </div>
          </div>

          {wrongQuestions.length > 0 && (
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsQuizMode(true)}
              className="gap-2 font-bold w-full sm:w-auto justify-center bg-[#10B981] hover:bg-[#22C55E] text-white shadow-lg shadow-[#10B981]/25 cursor-pointer"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>S’entraîner sur mes {filteredErrors.length} erreurs</span>
            </Button>
          )}
        </div>

        <p className="relative z-10 mt-3.5 text-xs sm:text-sm text-[#0A0A0A]/70 dark:text-white/70 leading-relaxed max-w-2xl font-normal">
          Ce carnet intelligent consigne automatiquement chaque question manquée lors de tes entraînements ou de l’examen blanc. Révise les explications détaillées et rejoue le quiz pour les éliminer.
        </p>

        {/* Filter bar */}
        {wrongQuestions.length > 0 && (
          <div className="relative z-10 mt-6 flex overflow-x-auto no-scrollbar sm:flex-wrap items-center gap-2 border-t border-black/10 dark:border-white/10 pt-4 pb-1 sm:pb-0">
            <span className="text-xs font-mono font-bold text-[#0A0A0A]/60 dark:text-white/60 mr-2 shrink-0">Filtrer par module :</span>
            <button
              onClick={() => setSelectedPartFilter('all')}
              className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedPartFilter === 'all'
                  ? 'bg-[#10B981] text-white shadow-2xs'
                  : 'bg-black/5 dark:bg-white/5 text-[#0A0A0A] dark:text-white hover:border-[#10B981] border border-black/10 dark:border-white/10'
              }`}
            >
              Toutes ({wrongQuestions.length})
            </button>
            {['part1', 'part2', 'part3', 'part4', 'part5'].map((pid, idx) => {
              const count = wrongQuestions.filter(q => q.partId === pid).length;
              if (count === 0) return null;
              return (
                <button
                  key={pid}
                  onClick={() => setSelectedPartFilter(pid)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedPartFilter === pid
                      ? 'bg-[#10B981] text-white shadow-2xs'
                      : 'bg-black/5 dark:bg-white/5 text-[#0A0A0A] dark:text-white hover:border-[#10B981] border border-black/10 dark:border-white/10'
                  }`}
                >
                  Partie {idx + 1} ({count})
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Empty State */}
      {wrongQuestions.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#10B981]/40 bg-[#10B981]/5 dark:bg-[#0A0A0A] p-12 text-center backdrop-blur-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 shadow-xs mb-4">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-black text-[#0A0A0A] dark:text-white">
            Félicitations ! Aucune erreur enregistrée.
          </h3>
          <p className="mt-2 text-sm text-[#0A0A0A]/70 dark:text-white/70 max-w-md mx-auto leading-relaxed">
            Tu as répondu juste à toutes les questions tentées, ou tu as déjà révisé avec succès l’ensemble de tes erreurs.
          </p>
          <div className="mt-6">
            <Button 
              variant="primary" 
              onClick={onBackToDashboard}
              className="bg-[#10B981] hover:bg-[#22C55E] text-white font-bold cursor-pointer"
            >
              Retourner au tableau de bord
            </Button>
          </div>
        </div>
      ) : (
        /* List of Wrong Questions */
        <div className="space-y-4">
          {filteredErrors.map((q, idx) => (
            <div
              key={q.id}
              className="rounded-3xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] backdrop-blur-xl p-6 sm:p-7 shadow-lg hover:border-[#10B981]/40 transition-all text-[#0A0A0A] dark:text-white"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-black/5 dark:bg-white/10 px-2.5 py-0.5 text-xs font-mono font-bold text-[#0A0A0A] dark:text-white border border-black/10 dark:border-white/15">
                    Erreur #{idx + 1}
                  </span>
                  <span className="rounded-lg bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 px-2.5 py-0.5 text-xs font-mono font-bold">
                    {q.tag}
                  </span>
                </div>
                <button
                  onClick={() => clearResolvedError(q.id)}
                  className="text-xs font-bold text-[#10B981] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Marquer comme comprise</span>
                </button>
              </div>

              <h3 className="text-base sm:text-lg font-black text-[#0A0A0A] dark:text-white leading-snug">
                {q.question}
              </h3>

              <div className="mt-4 rounded-2xl bg-[#10B981]/5 dark:bg-[#10B981]/10 border border-[#10B981]/30 p-4 text-xs sm:text-sm">
                <div className="font-bold text-[#10B981] mb-1.5 flex items-center gap-2 font-mono">
                  <span className="h-2 w-2 rounded-full bg-[#10B981] inline-block" />
                  <span>Bonne réponse : {String.fromCharCode(65 + q.correctIndex)} — {q.options[q.correctIndex]}</span>
                </div>
                <p className="text-[#0A0A0A]/80 dark:text-white/80 leading-relaxed text-xs sm:text-sm mt-1">
                  <b className="text-[#0A0A0A] dark:text-white font-bold">Rappel pédagogique : </b> 
                  {q.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

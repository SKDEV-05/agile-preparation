import React, { useState } from 'react';
import { useProgress } from '../../store/progressStore';
import { ALL_QUESTIONS } from '../../data/questions';
import { QuizRunner } from '../../components/quiz/QuizRunner';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { AlertTriangle, CheckCircle2, RotateCcw, Play, ArrowLeft } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto py-4 space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="reveal-on-scroll rounded-3xl border border-white/10 bg-[#0D1526]/90 backdrop-blur-xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 shadow-lg shrink-0">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Carnet Pédagogique · Rattrapage
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
                Mes Erreurs à Réviser
              </h1>
            </div>
          </div>

          {wrongQuestions.length > 0 && (
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsQuizMode(true)}
              className="gap-2 font-bold shadow-lg shadow-indigo-600/30 w-full sm:w-auto justify-center bg-gradient-to-r from-amber-500 to-indigo-600 hover:opacity-95"
            >
              <Play className="h-4 w-4" />
              <span>S’entraîner sur mes {filteredErrors.length} erreurs</span>
            </Button>
          )}
        </div>

        <p className="relative z-10 mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
          Cette page recense l’ensemble des questions auxquelles tu as mal répondu lors de tes entraînements ou de l’examen blanc. Révise les explications et rejoue le quiz pour les éliminer.
        </p>

        {/* Filter bar - horizontal swipe on mobile */}
        {wrongQuestions.length > 0 && (
          <div className="relative z-10 mt-6 flex overflow-x-auto no-scrollbar sm:flex-wrap items-center gap-2 border-t border-white/10 pt-4 pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-400 mr-2 shrink-0">Filtrer par module :</span>
            <button
              onClick={() => setSelectedPartFilter('all')}
              className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedPartFilter === 'all'
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md'
                  : 'bg-[#070B14] text-slate-400 hover:text-white border border-white/5'
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
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                    selectedPartFilter === pid
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md'
                      : 'bg-[#070B14] text-slate-400 hover:text-white border border-white/5'
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
        <div className="rounded-3xl border border-dashed border-emerald-500/30 bg-[#0D1526]/80 p-12 text-center backdrop-blur-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg mb-4">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-white">
            Félicitations ! Aucune erreur enregistrée.
          </h3>
          <p className="mt-2 text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Tu as répondu juste à toutes les questions tentées, ou tu as déjà révisé avec succès l’ensemble de tes erreurs.
          </p>
          <div className="mt-6">
            <Button variant="primary" onClick={onBackToDashboard} className="shadow-lg shadow-indigo-600/30">
              Retourner aux modules
            </Button>
          </div>
        </div>
      ) : (
        /* List of Wrong Questions */
        <div className="space-y-4">
          {filteredErrors.map((q, idx) => (
            <div
              key={q.id}
              className="rounded-2xl border border-white/10 bg-[#0D1526]/90 backdrop-blur-xl p-5 sm:p-6 shadow-xl hover:border-white/20 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="danger" size="sm" className="bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Erreur #{idx + 1}
                  </Badge>
                  <Badge variant="outline" size="sm" className="border-white/10 text-slate-300 font-mono">
                    {q.tag}
                  </Badge>
                </div>
                <button
                  onClick={() => clearResolvedError(q.id)}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Marquer comme comprise</span>
                </button>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">
                {q.question}
              </h3>

              <div className="mt-4 rounded-xl bg-[#070B14] border border-emerald-500/30 p-3.5 text-xs sm:text-sm">
                <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
                  <span>Bonne réponse : {String.fromCharCode(65 + q.correctIndex)} — {q.options[q.correctIndex]}</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-xs sm:text-sm mt-1">
                  <b className="text-white">Rappel pédagogique :</b> {q.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

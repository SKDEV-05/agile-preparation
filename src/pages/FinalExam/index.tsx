import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FINAL_EXAM_QUESTIONS } from '../../data/questions';
import { useProgress } from '../../store/progressStore';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Progress } from '../../components/ui/Progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../components/ui/Dialog';
import { formatTime } from '../../lib/utils';
import {
  Award,
  Clock,
  Flag,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PartId } from '../../types';

interface FinalExamProps {
  onExit: () => void;
  onGoToErrors: () => void;
}

export function FinalExamPage({ onExit, onGoToErrors }: FinalExamProps) {
  const { recordExamResult } = useProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flaggedIds, setFlaggedIds] = useState<string[]>([]);
  const [secondsRemaining, setSecondsRemaining] = useState(45 * 60); // 45 min
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isExamCompleted, setIsExamCompleted] = useState(false);

  // Result state
  const [finalScore, setFinalScore] = useState(0);
  const [partBreakdown, setPartBreakdown] = useState<Record<PartId, { correct: number; total: number }>>({
    part1: { correct: 0, total: 10 },
    part2: { correct: 0, total: 10 },
    part3: { correct: 0, total: 10 },
    part4: { correct: 0, total: 10 },
    part5: { correct: 0, total: 10 },
  });

  const totalQuestions = FINAL_EXAM_QUESTIONS.length;
  const currentQuestion = FINAL_EXAM_QUESTIONS[currentIndex];
  const answeredCount = Object.keys(answers).length;

  const answersRef = useRef(answers);
  const secondsRef = useRef(secondsRemaining);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    secondsRef.current = secondsRemaining;
  }, [secondsRemaining]);

  const handleSubmitExam = useCallback(() => {
    setIsSubmitDialogOpen(false);
    let totalCorrect = 0;
    const breakdown: Record<PartId, { correct: number; total: number }> = {
      part1: { correct: 0, total: 0 },
      part2: { correct: 0, total: 0 },
      part3: { correct: 0, total: 0 },
      part4: { correct: 0, total: 0 },
      part5: { correct: 0, total: 0 },
    };
    const wrongIds: string[] = [];

    FINAL_EXAM_QUESTIONS.forEach(q => {
      breakdown[q.partId].total++;
      const userChoice = answersRef.current[q.id];
      if (userChoice === q.correctIndex) {
        totalCorrect++;
        breakdown[q.partId].correct++;
      } else {
        wrongIds.push(q.id);
      }
    });

    setFinalScore(totalCorrect);
    setPartBreakdown(breakdown);

    // Persist to store
    recordExamResult(
      totalCorrect,
      totalQuestions,
      45 * 60 - secondsRef.current,
      breakdown,
      wrongIds
    );

    const pct = Math.round((totalCorrect / totalQuestions) * 100);
    if (pct >= 80) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.55 } });
    }

    setIsExamCompleted(true);
  }, [recordExamResult, totalQuestions]);

  // Countdown timer
  useEffect(() => {
    if (isExamCompleted) return;
    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamCompleted, handleSubmitExam]);

  const handleSelectOption = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const toggleFlag = (questionId: string) => {
    setFlaggedIds(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  // Result View
  if (isExamCompleted) {
    const pct = Math.round((finalScore / totalQuestions) * 100);
    const partsMeta = [
      { id: 'part1' as PartId, name: 'Partie 1 : Fondamentaux' },
      { id: 'part2' as PartId, name: 'Partie 2 : Planification (Gantt & PERT)' },
      { id: 'part3' as PartId, name: 'Partie 3 : Agile & Scrum' },
      { id: 'part4' as PartId, name: 'Partie 4 : Git & SonarQube' },
      { id: 'part5' as PartId, name: 'Partie 5 : DevOps & GitLab CI' },
    ];

    const strongPoints = partsMeta.filter(p => {
      const b = partBreakdown[p.id];
      return (b.correct / b.total) >= 0.8;
    });

    const weakPoints = partsMeta.filter(p => {
      const b = partBreakdown[p.id];
      return (b.correct / b.total) < 0.7;
    });

    return (
      <div className="max-w-4xl mx-auto py-6 space-y-8">
        {/* Score Hero Banner */}
        <div className="rounded-3xl border border-white/10 bg-[#0D1526]/90 backdrop-blur-xl p-8 sm:p-12 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 shadow-lg mb-4">
            <Award className="h-10 w-10" />
          </div>

          <div className="relative z-10 text-xs font-bold uppercase tracking-wider text-indigo-400">
            Examen Officiel Terminé
          </div>
          <h1 className="relative z-10 text-3xl sm:text-4xl font-black text-white mt-1">
            Bilan d’Évaluation Finale
          </h1>

          <div className="relative z-10 my-6">
            <div className="text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-200 tracking-tight drop-shadow-[0_0_25px_rgba(99,102,241,0.4)]">
              {pct}%
            </div>
            <p className="mt-2 text-base font-bold text-slate-300">
              Note officielle : <span className="text-white text-lg font-black">{finalScore} / {totalQuestions}</span>
            </p>
          </div>

          <div className="relative z-10 inline-block mb-8">
            <Badge
              variant={pct >= 80 ? 'success' : pct >= 60 ? 'primary' : 'danger'}
              size="md"
              className="px-5 py-1.5 text-sm font-bold shadow-md"
            >
              {pct >= 80 ? '✦ Mention Très Bien · Prêt pour l’EFM' : pct >= 60 ? '✓ Mention Assez Bien · Bon niveau général' : '⚠️ Niveau insuffisant · Révisions requises'}
            </Badge>
          </div>

          {/* Breakdown by module */}
          <div className="relative z-10 rounded-2xl border border-white/10 bg-[#070B14]/80 p-6 text-left mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Résultats détaillés par domaine de compétences :
            </h3>
            <div className="space-y-3.5">
              {partsMeta.map(p => {
                const b = partBreakdown[p.id];
                const partPct = Math.round((b.correct / b.total) * 100);
                return (
                  <div key={p.id}>
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span>{p.name}</span>
                      <span className="font-bold text-white">{b.correct} / {b.total} ({partPct}%)</span>
                    </div>
                    <Progress
                      value={partPct}
                      className="h-2 bg-slate-800"
                      indicatorColor={partPct >= 80 ? 'bg-emerald-400' : partPct >= 60 ? 'bg-indigo-500' : 'bg-red-500'}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strong vs Weak Points */}
          <div className="relative z-10 grid sm:grid-cols-2 gap-4 text-left mb-8">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Tes points forts
              </div>
              {strongPoints.length > 0 ? (
                <ul className="space-y-1 text-xs text-slate-200">
                  {strongPoints.map(p => (
                    <li key={p.id} className="flex items-center gap-1.5 font-medium">
                      <span className="text-emerald-400 font-bold">✓</span> {p.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-400 italic">Aucun domaine au-dessus de 80% pour l’instant.</p>
              )}
            </div>

            <div className="rounded-2xl border border-amber-500/30 bg-amber-950/40 p-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                Notions prioritaires à revoir
              </div>
              {weakPoints.length > 0 ? (
                <ul className="space-y-1 text-xs text-slate-200">
                  {weakPoints.map(p => (
                    <li key={p.id} className="flex items-center gap-1.5 font-medium text-amber-200">
                      <span className="text-amber-400 font-bold">➔</span> {p.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-emerald-300 font-medium">Excellent ! Aucune faiblesse majeure détectée.</p>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row flex-wrap justify-center gap-2.5 sm:gap-3">
            <Button variant="primary" size="lg" onClick={onGoToErrors} className="gap-2 font-bold shadow-lg shadow-indigo-600/30 w-full sm:w-auto justify-center bg-indigo-600 hover:bg-indigo-500">
              <AlertTriangle className="h-4 w-4" />
              <span>Travailler mes erreurs ({totalQuestions - finalScore})</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setIsExamCompleted(false);
                setAnswers({});
                setFlaggedIds([]);
                setSecondsRemaining(45 * 60);
                setCurrentIndex(0);
              }}
              className="gap-2 w-full sm:w-auto justify-center border-white/15 bg-white/5 hover:bg-white/10 text-slate-200"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Repasser l’examen</span>
            </Button>
            <Button variant="secondary" size="lg" onClick={onExit} className="w-full sm:w-auto justify-center bg-white/10 hover:bg-white/15 text-white border border-white/10">
              Retour au tableau de bord
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Active Exam View
  const isFlagged = flaggedIds.includes(currentQuestion.id);
  const selectedChoice = answers[currentQuestion.id];

  return (
    <div className="max-w-5xl mx-auto py-4">
      {/* Top Exam Header */}
      <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10 mb-6">
        <div className="flex items-center gap-2 min-w-0">
          <Badge variant="primary" size="sm" className="font-bold shrink-0 bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
            50 QCM
          </Badge>
          <span className="text-xs text-slate-400 font-medium hidden md:inline truncate">
            Conditions réelles d’examen officiel · Simulation EFM
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Timer */}
          <div className={`flex items-center gap-1.5 sm:gap-2 rounded-xl px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-mono font-bold border shadow-sm ${
            secondsRemaining <= 300
              ? 'bg-red-950/60 text-red-400 border-red-500/50 animate-pulse'
              : 'bg-indigo-950/60 text-indigo-300 border-indigo-500/30'
          }`}>
            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          {/* Submit button */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsSubmitDialogOpen(true)}
            className="gap-1.5 font-bold shadow-lg shadow-indigo-600/30 px-2.5 sm:px-3 text-xs bg-indigo-600 hover:bg-indigo-500"
          >
            <Send className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Terminer l’examen</span>
            <span className="sm:hidden">Terminer</span>
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main Question Card (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-3xl border border-white/10 bg-[#0D1526]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-300 bg-indigo-950/60 border border-indigo-500/30 px-2.5 py-1 rounded-lg">
                  Question {currentIndex + 1} / {totalQuestions}
                </span>
                <Badge variant="outline" size="sm" className="bg-white/5 text-slate-300 border-white/10">
                  {currentQuestion.tag}
                </Badge>
              </div>

              {/* Flag button */}
              <button
                onClick={() => toggleFlag(currentQuestion.id)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
                  isFlagged
                    ? 'bg-amber-950/60 text-amber-300 border-amber-500/40 font-bold shadow-sm'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
                }`}
              >
                <Flag className={`h-3.5 w-3.5 ${isFlagged ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span>{isFlagged ? 'Marquée' : 'Marquer pour révision'}</span>
              </button>
            </div>

            {/* Question Text */}
            <h2 className="relative z-10 text-lg sm:text-xl font-bold text-white leading-snug">
              {currentQuestion.question}
            </h2>

            {/* 4 Options (Clean, balanced lengths, radio style) */}
            <div className="relative z-10 mt-6 space-y-3">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedChoice === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-950/50 text-white ring-2 ring-indigo-500/40 shadow-lg shadow-indigo-900/20'
                        : 'border-white/10 bg-[#070B14]/70 hover:bg-white/5 hover:border-white/20 text-slate-300'
                    }`}
                  >
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                      isSelected ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40' : 'bg-white/10 border border-white/10 text-slate-300'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Prev / Next buttons */}
            <div className="relative z-10 mt-8 flex items-center justify-between border-t border-white/10 pt-5">
              <Button
                variant="outline"
                size="md"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                className="gap-2 border-white/15 bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Précédente</span>
              </Button>

              <div className="text-xs text-slate-400 font-medium hidden sm:block">
                {answeredCount} / {totalQuestions} répondues
              </div>

              {currentIndex + 1 < totalQuestions ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setCurrentIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                  className="gap-2 font-bold px-6 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30"
                >
                  <span>Suivante</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsSubmitDialogOpen(true)}
                  className="gap-2 font-bold bg-emerald-600 hover:bg-emerald-500 px-6 shadow-lg shadow-emerald-600/30"
                >
                  <span>Finaliser l’examen</span>
                  <Send className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Question Grid Navigator (1 col) */}
        <div className="rounded-3xl border border-white/10 bg-[#0D1526]/90 backdrop-blur-xl p-5 shadow-2xl h-fit">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Grille des 50 questions
          </div>

          <div className="grid grid-cols-5 gap-1.5 max-h-[380px] overflow-y-auto p-1 custom-scrollbar">
            {FINAL_EXAM_QUESTIONS.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isFlag = flaggedIds.includes(q.id);
              const isCurrent = currentIndex === idx;

              let cellStyle = 'bg-[#070B14]/80 text-slate-400 border-white/5 hover:border-white/20 hover:text-white';
              if (isCurrent) {
                cellStyle = 'ring-2 ring-cyan-400 font-bold text-cyan-300 bg-cyan-950/40 border-cyan-500 shadow-sm';
              } else if (isFlag) {
                cellStyle = 'bg-amber-950/60 text-amber-300 border-amber-500/50 font-bold';
              } else if (isAnswered) {
                cellStyle = 'bg-indigo-600 text-white font-bold border-indigo-500 shadow-md shadow-indigo-600/30';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-8 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all ${cellStyle}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 space-y-2 text-[11px] text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-indigo-600 shadow-sm" />
              <span>Répondue ({answeredCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-amber-500/40 border border-amber-400/50" />
              <span>Marquée ({flaggedIds.length})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-[#070B14] border border-white/10" />
              <span>Non répondue ({totalQuestions - answeredCount})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog before submitting */}
      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent className="bg-[#0D1526] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Soumettre définitivement l’examen ?</DialogTitle>
            <DialogDescription className="text-slate-400">
              Vérifie ton bilan avant validation finale :
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2.5 my-2 text-sm">
            <div className="flex justify-between p-3 rounded-xl bg-[#070B14] border border-white/10">
              <span className="text-slate-400">Questions répondues :</span>
              <b className="text-indigo-400">{answeredCount} / {totalQuestions}</b>
            </div>
            {totalQuestions - answeredCount > 0 && (
              <div className="flex justify-between p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200">
                <span>Questions sans réponse :</span>
                <b>{totalQuestions - answeredCount}</b>
              </div>
            )}
            {flaggedIds.length > 0 && (
              <div className="flex justify-between p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200">
                <span>Questions encore marquées :</span>
                <b>{flaggedIds.length}</b>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)} className="border-white/15 bg-white/5 hover:bg-white/10 text-slate-300">
              Reprendre la relecture
            </Button>
            <Button variant="primary" onClick={handleSubmitExam} className="font-bold bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30">
              Confirmer et voir la note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

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
import { playComplete, playSelect } from '../../lib/soundEffects';

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
      confetti({ 
        particleCount: 120, 
        spread: 80, 
        origin: { y: 0.55 },
        colors: ['#10B981', '#22C55E', '#FFFFFF', '#0A0A0A']
      });
    }
    playComplete();

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

  const handleSelectOption = useCallback((optionIndex: number) => {
    playSelect();
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  }, [currentQuestion.id]);

  // Keyboard navigation for Final Exam (1-4 or A-D for options, ArrowLeft/ArrowRight to navigate)
  useEffect(() => {
    if (isExamCompleted || isSubmitDialogOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const keyMap: Record<string, number> = {
        '1': 0, '&': 0, 'a': 0, 'A': 0,
        '2': 1, 'é': 1, 'b': 1, 'B': 1,
        '3': 2, '"': 2, 'c': 2, 'C': 2,
        '4': 3, "'": 3, 'd': 3, 'D': 3,
      };

      if (keyMap[e.key] !== undefined) {
        handleSelectOption(keyMap[e.key]);
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex(prev => Math.min(totalQuestions - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex(prev => Math.max(0, prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExamCompleted, isSubmitDialogOpen, totalQuestions, handleSelectOption]);

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
      <div className="max-w-4xl mx-auto py-6 space-y-8 text-black dark:text-white">
        {/* Score Hero Banner */}
        <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] backdrop-blur-xl p-8 sm:p-12 shadow-xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] shadow-md mb-4">
            <Award className="h-10 w-10" />
          </div>

          <div className="relative z-10 text-xs font-bold uppercase tracking-wider text-[#10B981] font-mono">
            Examen Officiel Terminé
          </div>
          <h1 className="relative z-10 text-3xl sm:text-4xl font-black text-black dark:text-white mt-1">
            Bilan d’Évaluation Finale
          </h1>

          <div className="relative z-10 my-6">
            <div className="text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#22C55E] tracking-tight font-mono">
              {pct}%
            </div>
            <p className="mt-2 text-base font-bold text-black/70 dark:text-white/70">
              Note officielle : <span className="text-black dark:text-white text-lg font-black">{finalScore} / {totalQuestions}</span>
            </p>
          </div>

          <div className="relative z-10 inline-block mb-8">
            <Badge
              variant={pct >= 80 ? 'success' : pct >= 60 ? 'primary' : 'danger'}
              size="md"
              className="px-5 py-1.5 text-sm font-bold shadow-md"
            >
              {pct >= 80 ? '✦ Mention Très Bien · Prêt pour l’EFM' : pct >= 60 ? '✓ Mention Assez Bien · Bon niveau général' : 'Niveau insuffisant · Révisions requises'}
            </Badge>
          </div>

          {/* Breakdown by module */}
          <div className="relative z-10 rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-6 text-left mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-black/60 dark:text-white/60 mb-4 font-mono">
              Résultats détaillés par domaine de compétences :
            </h3>
            <div className="space-y-3.5">
              {partsMeta.map(p => {
                const b = partBreakdown[p.id];
                const partPct = Math.round((b.correct / b.total) * 100);
                return (
                  <div key={p.id}>
                    <div className="flex justify-between text-xs font-semibold text-black/80 dark:text-white/80 mb-1">
                      <span>{p.name}</span>
                      <span className="font-bold text-black dark:text-white font-mono">{b.correct} / {b.total} ({partPct}%)</span>
                    </div>
                    <Progress
                      value={partPct}
                      className="h-2 bg-black/10 dark:bg-white/10"
                      indicatorColor={partPct >= 80 ? 'bg-[#10B981]' : 'bg-[#22C55E]'}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strong vs Weak Points */}
          <div className="relative z-10 grid sm:grid-cols-2 gap-4 text-left mb-8">
            <div className="rounded-2xl border border-[#10B981]/30 bg-[#10B981]/10 p-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#10B981] mb-2 font-mono">
                <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                Tes points forts
              </div>
              {strongPoints.length > 0 ? (
                <ul className="space-y-1 text-xs text-black/80 dark:text-white/80">
                  {strongPoints.map(p => (
                    <li key={p.id} className="flex items-center gap-1.5 font-medium">
                      <span className="text-[#10B981] font-bold">✓</span> {p.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-black/50 dark:text-white/50 italic">Aucun domaine au-dessus de 80% pour l’instant.</p>
              )}
            </div>

            <div className="rounded-2xl border border-[#22C55E]/30 bg-[#22C55E]/10 p-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#22C55E] mb-2 font-mono">
                <AlertTriangle className="h-4 w-4 text-[#22C55E]" />
                Notions prioritaires à revoir
              </div>
              {weakPoints.length > 0 ? (
                <ul className="space-y-1 text-xs text-black/80 dark:text-white/80">
                  {weakPoints.map(p => (
                    <li key={p.id} className="flex items-center gap-1.5 font-medium text-black/80 dark:text-white/80">
                      <span className="text-[#22C55E] font-bold">➔</span> {p.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-[#10B981] font-medium">Excellent ! Aucune faiblesse majeure détectée.</p>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row flex-wrap justify-center gap-2.5 sm:gap-3">
            <Button variant="primary" size="lg" onClick={onGoToErrors} className="gap-2 font-bold shadow-md shadow-[#10B981]/25 w-full sm:w-auto justify-center bg-[#10B981] hover:bg-[#22C55E] text-white">
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
              className="gap-2 w-full sm:w-auto justify-center border-black/10 dark:border-white/15 bg-white dark:bg-[#0A0A0A] hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Repasser l’examen</span>
            </Button>
            <Button variant="secondary" size="lg" onClick={onExit} className="w-full sm:w-auto justify-center bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 text-black dark:text-white border border-black/10 dark:border-white/10">
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
    <div className="max-w-5xl mx-auto py-4 text-black dark:text-white">
      {/* Top Exam Header */}
      <div className="flex items-center justify-between gap-2 pb-4 border-b border-black/10 dark:border-white/10 mb-6">
        <div className="flex items-center gap-2 min-w-0">
          <Badge variant="primary" size="sm" className="font-bold shrink-0 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 font-mono">
            50 QCM
          </Badge>
          <span className="text-xs text-black/60 dark:text-white/60 font-medium hidden md:inline truncate">
            Conditions réelles d’examen officiel · Simulation EFM
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Timer */}
          <div className={`flex items-center gap-1.5 sm:gap-2 rounded-xl px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-mono font-bold border shadow-xs ${
            secondsRemaining <= 300
              ? 'bg-[#22C55E]/20 text-[#22C55E] border-[#22C55E]/50 animate-pulse'
              : 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30'
          }`}>
            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          {/* Submit button */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsSubmitDialogOpen(true)}
            className="gap-1.5 font-bold shadow-md shadow-[#10B981]/25 px-2.5 sm:px-3 text-xs bg-[#10B981] hover:bg-[#22C55E] text-white"
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
          <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] backdrop-blur-xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#10B981]/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/30 px-2.5 py-1 rounded-lg font-mono">
                  Question {currentIndex + 1} / {totalQuestions}
                </span>
                <Badge variant="outline" size="sm" className="bg-black/5 dark:bg-white/5 text-black dark:text-white border-black/10 dark:border-white/10 font-mono">
                  {currentQuestion.tag}
                </Badge>
              </div>

              {/* Flag button */}
              <button
                onClick={() => toggleFlag(currentQuestion.id)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  isFlagged
                    ? 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/40 font-bold shadow-xs'
                    : 'bg-black/5 text-black/70 border-black/10 dark:bg-white/5 dark:text-white/70 dark:border-white/10 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10'
                }`}
              >
                <Flag className={`h-3.5 w-3.5 ${isFlagged ? 'fill-[#22C55E] text-[#22C55E]' : ''}`} />
                <span>{isFlagged ? 'Marquée' : 'Marquer pour révision'}</span>
              </button>
            </div>

            {/* Question Text */}
            <h2 className="relative z-10 text-lg sm:text-xl font-bold text-black dark:text-white leading-snug">
              {currentQuestion.question}
            </h2>

            {/* 4 Options */}
            <div className="relative z-10 mt-6 space-y-3">
              {currentQuestion.options.map((opt, idx) => {
                const isSelected = selectedChoice === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all flex items-start gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'border-[#10B981] bg-[#10B981]/10 text-black dark:text-white ring-2 ring-[#10B981]/40 shadow-sm'
                        : 'border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 text-black dark:text-white'
                    }`}
                  >
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors font-mono ${
                      isSelected ? 'bg-[#10B981] text-white shadow-md shadow-[#10B981]/40' : 'bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt}</span>
                    <kbd className="hidden sm:inline-flex items-center justify-center font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-black/50 dark:text-white/50 font-bold border border-black/10 dark:border-white/10 shadow-2xs">
                      {idx + 1}
                    </kbd>
                  </button>
                );
              })}
            </div>

            {/* Prev / Next buttons */}
            <div className="relative z-10 mt-8 flex items-center justify-between border-t border-black/10 dark:border-white/10 pt-5">
              <Button
                variant="outline"
                size="md"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                className="gap-2 border-black/10 dark:border-white/15 bg-white dark:bg-[#0A0A0A] hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white disabled:opacity-30 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Précédente</span>
              </Button>

              <div className="text-xs text-black/60 dark:text-white/60 font-medium hidden sm:block font-mono">
                {answeredCount} / {totalQuestions} répondues
              </div>

              {currentIndex + 1 < totalQuestions ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setCurrentIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                  className="gap-2 font-bold px-6 bg-[#10B981] hover:bg-[#22C55E] text-white shadow-md shadow-[#10B981]/25 cursor-pointer"
                >
                  <span>Suivante</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsSubmitDialogOpen(true)}
                  className="gap-2 font-bold bg-[#10B981] hover:bg-[#22C55E] text-white px-6 shadow-md shadow-[#10B981]/25 cursor-pointer"
                >
                  <span>Finaliser l’examen</span>
                  <Send className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Question Grid Navigator (1 col) */}
        <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] backdrop-blur-xl p-5 shadow-xl h-fit">
          <div className="text-xs font-bold uppercase tracking-wider text-black/60 dark:text-white/60 mb-3 font-mono">
            Grille des 50 questions
          </div>

          <div className="grid grid-cols-5 gap-1.5 max-h-[380px] overflow-y-auto p-1 custom-scrollbar">
            {FINAL_EXAM_QUESTIONS.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isFlag = flaggedIds.includes(q.id);
              const isCurrent = currentIndex === idx;

              let cellStyle = 'bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 hover:text-black dark:hover:text-white';
              if (isCurrent) {
                cellStyle = 'ring-2 ring-[#10B981] font-bold text-[#10B981] bg-[#10B981]/10 border-[#10B981]/40 shadow-xs';
              } else if (isFlag) {
                cellStyle = 'bg-[#22C55E]/20 text-[#22C55E] border-[#22C55E]/40 font-bold';
              } else if (isAnswered) {
                cellStyle = 'bg-[#10B981] text-white font-bold border-[#10B981] shadow-xs';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-8 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all cursor-pointer font-mono ${cellStyle}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 space-y-2 text-[11px] text-black/60 dark:text-white/60 font-medium">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-[#10B981] shadow-xs" />
              <span>Répondue ({answeredCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-[#22C55E]/20 border border-[#22C55E]/40" />
              <span>Marquée ({flaggedIds.length})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10" />
              <span>Non répondue ({totalQuestions - answeredCount})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog before submitting */}
      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent className="bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 text-black dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-black dark:text-white">Soumettre définitivement l’examen ?</DialogTitle>
            <DialogDescription className="text-black/60 dark:text-white/60">
              Vérifie ton bilan avant validation finale :
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2.5 my-2 text-sm">
            <div className="flex justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <span className="text-black/60 dark:text-white/60">Questions répondues :</span>
              <b className="text-[#10B981] font-mono">{answeredCount} / {totalQuestions}</b>
            </div>
            {totalQuestions - answeredCount > 0 && (
              <div className="flex justify-between p-3 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E]">
                <span>Questions sans réponse :</span>
                <b className="font-mono">{totalQuestions - answeredCount}</b>
              </div>
            )}
            {flaggedIds.length > 0 && (
              <div className="flex justify-between p-3 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981]">
                <span>Questions encore marquées :</span>
                <b className="font-mono">{flaggedIds.length}</b>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)} className="border-black/10 dark:border-white/10 text-black dark:text-white">
              Reprendre la relecture
            </Button>
            <Button variant="primary" onClick={handleSubmitExam} className="font-bold bg-[#10B981] hover:bg-[#22C55E] text-white shadow-md shadow-[#10B981]/25">
              Confirmer et voir la note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

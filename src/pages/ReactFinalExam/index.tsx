import React, { useState, useEffect } from 'react';
import { Award, Clock, ArrowRight } from 'lucide-react';
import { FINAL_EXAM_REACT_QUESTIONS } from '../../data/reactQuestions';
import { useReactProgress } from '../../store/reactProgressStore';
import { ReactModuleId } from '../../types/reactTypes';

interface ReactFinalExamProps {
  onExit: () => void;
  onGoToErrors: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export function ReactFinalExamPage({ onExit, onGoToErrors }: ReactFinalExamProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes
  const [isFinished, setIsFinished] = useState(false);

  const { recordExamResult } = useReactProgress();

  const totalQuestions = FINAL_EXAM_REACT_QUESTIONS.length;
  const currentQuestion = FINAL_EXAM_REACT_QUESTIONS[currentIndex];

  // 45 min Countdown timer
  useEffect(() => {
    if (!hasStarted || isFinished) return;
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [hasStarted, isFinished, timeLeft]);

  // Keyboard navigation (1-4, a-d for options, Enter for next)
  useEffect(() => {
    if (!hasStarted || isFinished) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (['1', '2', '3', '4'].includes(key)) {
        handleSelectOption(parseInt(key, 10) - 1);
      } else if (key === 'a') {
        handleSelectOption(0);
      } else if (key === 'b') {
        handleSelectOption(1);
      } else if (key === 'c') {
        handleSelectOption(2);
      } else if (key === 'd') {
        handleSelectOption(3);
      } else if (e.key === 'Enter') {
        if (currentIndex < totalQuestions - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          handleFinish();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasStarted, isFinished, currentIndex, selectedAnswers]);

  const handleSelectOption = (optIdx: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optIdx
    }));
  };

  const handleFinish = () => {
    setIsFinished(true);

    let score = 0;
    const wrongIds: string[] = [];
    const moduleScores: Record<ReactModuleId, { correct: number; total: number }> = {
      module1: { correct: 0, total: 0 },
      module2: { correct: 0, total: 0 },
      module3: { correct: 0, total: 0 },
      module4: { correct: 0, total: 0 },
      module5: { correct: 0, total: 0 },
      module6: { correct: 0, total: 0 },
      module7: { correct: 0, total: 0 },
      module8: { correct: 0, total: 0 },
    };

    FINAL_EXAM_REACT_QUESTIONS.forEach((q, idx) => {
      const mod = q.moduleId;
      moduleScores[mod].total += 1;
      const userAns = selectedAnswers[idx];
      if (userAns === q.correctIndex) {
        score += 1;
        moduleScores[mod].correct += 1;
      } else {
        wrongIds.push(q.id);
      }
    });

    const timeSpent = 45 * 60 - timeLeft;
    recordExamResult(score, totalQuestions, timeSpent, moduleScores, wrongIds);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // 1. START SCREEN
  if (!hasStarted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 text-[#0A0A0A] dark:text-white py-6 sm:py-8 select-none px-3">
        <section className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-6 sm:p-10 space-y-5 text-center shadow-lg">
          <div className="h-16 w-16 rounded-2xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center mx-auto border border-[#10B981]/30">
            <Award className="h-8 w-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider">
              Examen Blanc Officiel · Barème EFM OFPPT
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Évaluation Finale : Front-End React &amp; Redux
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-[#0A0A0A]/70 dark:text-white/70 max-w-lg mx-auto leading-relaxed">
            Testez vos connaissances en conditions réelles d'examen : 40 questions à choix unique couvrant les 8 modules officiels, avec un compte à rebours de 45 minutes.
          </p>

          {/* Guidelines */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left font-mono text-xs pt-2">
            <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10">
              <span className="text-[10px] text-[#0A0A0A]/50 dark:text-white/50 block">Nombre de questions</span>
              <span className="font-bold text-[#10B981]">40 QCM</span>
            </div>
            <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10">
              <span className="text-[10px] text-[#0A0A0A]/50 dark:text-white/50 block">Chronomètre</span>
              <span className="font-bold text-[#10B981]">45 Minutes</span>
            </div>
            <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10">
              <span className="text-[10px] text-[#0A0A0A]/50 dark:text-white/50 block">Seuil d'admission</span>
              <span className="font-bold text-[#22C55E]">12 / 20 (60%)</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => setHasStarted(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#10B981] hover:bg-[#22C55E] text-white font-bold text-sm shadow-md shadow-[#10B981]/25 transition-all cursor-pointer min-h-[44px] flex items-center justify-center"
            >
              Démarrer l'Épreuve Maintenant
            </button>
            <button
              onClick={onExit}
              className="w-full sm:w-auto px-4 py-3 rounded-2xl border border-black/15 dark:border-white/15 hover:border-[#10B981] font-bold text-xs cursor-pointer min-h-[44px] flex items-center justify-center"
            >
              Retour au tableau de bord
            </button>
          </div>
        </section>
      </div>
    );
  }

  // 2. RESULTS SCREEN
  if (isFinished) {
    let score = 0;
    FINAL_EXAM_REACT_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) score += 1;
    });

    const noteSur20 = ((score / totalQuestions) * 20).toFixed(1);
    const pourcentage = Math.round((score / totalQuestions) * 100);
    const isPassed = pourcentage >= 60;

    let mention = 'Ajourné';
    if (pourcentage >= 80) mention = 'Mention Très Bien';
    else if (pourcentage >= 70) mention = 'Mention Bien';
    else if (pourcentage >= 60) mention = 'Mention Assez Bien';

    return (
      <div className="max-w-3xl mx-auto space-y-6 text-[#0A0A0A] dark:text-white py-6 sm:py-8 select-none px-3">
        <section className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-6 sm:p-10 space-y-6 text-center shadow-lg">
          <div className={`h-20 w-20 rounded-3xl flex items-center justify-center mx-auto ${
            isPassed ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-red-500/15 text-red-500'
          }`}>
            <Award className="h-10 w-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#10B981] uppercase">Résultat Officiel EFM React</span>
            <h2 className="text-2xl sm:text-3xl font-black">{mention}</h2>
            <div className="text-4xl font-black font-mono text-[#10B981] pt-2">
              {noteSur20} / 20 <span className="text-lg text-[#0A0A0A]/60 dark:text-white/60">({pourcentage}%)</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#0A0A0A]/70 dark:text-white/70 max-w-md mx-auto">
            {isPassed
              ? 'Félicitations ! Vous validez les compétences théoriques et pratiques requises pour le cursus Front-End React.'
              : 'N\'abandonnez pas ! Passez en revue les questions manquées dans votre carnet d\'erreurs pour consolider vos acquis.'}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onGoToErrors}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
            >
              Consulter les Erreurs dans le Carnet
            </button>
            <button
              onClick={() => {
                setHasStarted(false);
                setIsFinished(false);
                setSelectedAnswers({});
                setCurrentIndex(0);
                setTimeLeft(45 * 60);
              }}
              className="w-full sm:w-auto px-4 py-3 rounded-xl border border-black/15 dark:border-white/15 hover:border-[#10B981] font-bold text-xs cursor-pointer min-h-[44px] flex items-center justify-center"
            >
              Recommencer l'Examen
            </button>
            <button
              onClick={onExit}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-black/5 dark:bg-white/10 text-xs font-bold cursor-pointer min-h-[44px] flex items-center justify-center"
            >
              Retour
            </button>
          </div>
        </section>
      </div>
    );
  }

  // 3. EXAM IN PROGRESS
  return (
    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 text-[#0A0A0A] dark:text-white py-4 select-none px-3">
      {/* Top Floating Control Bar */}
      <div className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-xl shadow-xs">
        <div className="flex items-center gap-2 truncate">
          <span className="font-mono text-xs font-bold text-[#10B981] shrink-0">
            Question {currentIndex + 1} / {totalQuestions}
          </span>
          <span className="text-[10px] font-mono bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded truncate">
            {currentQuestion.tag}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Clock className="h-4 w-4 text-[#10B981]" />
          <span className={`font-mono text-xs font-bold ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-[#10B981]'}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#10B981] transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Current Question Card */}
      <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-5 sm:p-8 space-y-5 shadow-xs">
        <h3 className="text-sm sm:text-lg font-bold leading-relaxed">
          {currentQuestion.question}
        </h3>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedAnswers[currentIndex] === idx;

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer min-h-[48px] ${
                  isSelected
                    ? 'border-[#10B981] bg-[#10B981]/15 text-[#10B981] font-bold shadow-xs'
                    : 'border-black/10 dark:border-white/10 hover:border-[#10B981] bg-black/[0.01] dark:bg-white/[0.01]'
                }`}
              >
                <span className="w-6 h-6 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center font-mono text-[11px] font-bold shrink-0">
                  {OPTION_LETTERS[idx]}
                </span>
                <span className="leading-snug pt-0.5 flex-1">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-black/10 dark:border-white/10">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="px-4 py-2.5 rounded-xl text-xs font-bold disabled:opacity-30 cursor-pointer min-h-[44px] flex items-center justify-center"
          >
            ← Précédente
          </button>

          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className="px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#22C55E] text-white font-bold text-xs shadow-xs cursor-pointer flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              <span>Suivante</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-5 py-2.5 rounded-xl bg-[#22C55E] hover:bg-[#10B981] text-white font-bold text-xs shadow-md shadow-[#22C55E]/20 cursor-pointer min-h-[44px] flex items-center justify-center"
            >
              Terminer &amp; Valider l'Examen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

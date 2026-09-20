import React, { useState, useEffect, useCallback } from 'react';
import { ReactModuleId } from '../../types/reactTypes';
import { REACT_MODULES_MAP } from '../../data/reactCourse';
import { REACT_QUESTIONS_BY_MODULE } from '../../data/reactQuestions';
import { useReactProgress } from '../../store/reactProgressStore';
import { ArrowRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReactQuizRunnerProps {
  moduleId: ReactModuleId;
  onExit: () => void;
  onGoToErrors?: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export function ReactQuizRunner({ moduleId, onExit, onGoToErrors }: ReactQuizRunnerProps) {
  const moduleData = REACT_MODULES_MAP[moduleId];
  const questions = REACT_QUESTIONS_BY_MODULE[moduleId] || [];
  const { recordQuizResult } = useReactProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongQuestionIds, setWrongQuestionIds] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const total = questions.length;
  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(index);
  };

  const handleValidateAnswer = useCallback(() => {
    if (selectedOption === null || isAnswerChecked) return;
    setIsAnswerChecked(true);

    const isCorrect = selectedOption === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      setWrongQuestionIds(prev => [...prev, currentQuestion.id]);
    }
  }, [selectedOption, isAnswerChecked, currentQuestion]);

  const handleNext = useCallback(() => {
    if (currentIndex < total - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsFinished(true);
      recordQuizResult(moduleId, score + (selectedOption === currentQuestion.correctIndex ? 1 : 0), total, wrongQuestionIds);
      if (score >= total * 0.7) {
        try {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        } catch (e) {}
      }
    }
  }, [currentIndex, total, moduleId, score, selectedOption, currentQuestion, wrongQuestionIds, recordQuizResult]);

  // Keyboard navigation: 1-4, a-d, and Enter
  useEffect(() => {
    if (isFinished) return;
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
        if (!isAnswerChecked) {
          handleValidateAnswer();
        } else {
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFinished, isAnswerChecked, handleValidateAnswer, handleNext]);

  if (!moduleData || total === 0) return null;

  // RESULTS SCREEN
  if (isFinished) {
    const finalScore = score;
    const pct = Math.round((finalScore / total) * 100);
    const isSuccess = pct >= 60;

    return (
      <div className="max-w-2xl mx-auto py-8 text-[#0A0A0A] dark:text-white select-none px-3">
        <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-6 sm:p-10 space-y-6 text-center shadow-lg">
          <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mx-auto ${
            isSuccess ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-red-500/15 text-red-500'
          }`}>
            <Award className="h-8 w-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#10B981] uppercase">
              Évaluation Terminée · Module 0{moduleData.orderNumber}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              {isSuccess ? 'Module Validé avec Succès !' : 'Des Notions restent à consolider'}
            </h2>
            <div className="text-4xl font-black font-mono text-[#10B981] pt-2">
              {finalScore} / {total} <span className="text-base text-[#0A0A0A]/60 dark:text-white/60">({pct}%)</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#0A0A0A]/70 dark:text-white/70 max-w-md mx-auto">
            {isSuccess
              ? 'Excellent travail ! Vous maîtrisez les concepts clés de ce module officiel du cursus React.'
              : 'Les questions erronées ont été ajoutées à votre carnet pédagogique d\'erreurs pour révision.'}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            {wrongQuestionIds.length > 0 && onGoToErrors && (
              <button
                onClick={onGoToErrors}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                Revoir mes {wrongQuestionIds.length} erreur(s)
              </button>
            )}

            <button
              onClick={() => {
                setCurrentIndex(0);
                setSelectedOption(null);
                setIsAnswerChecked(false);
                setScore(0);
                setWrongQuestionIds([]);
                setIsFinished(false);
              }}
              className="w-full sm:w-auto px-4 py-3 rounded-xl border border-black/15 dark:border-white/15 hover:border-[#10B981] text-xs font-bold transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
            >
              Recommencer le QCM
            </button>

            <button
              onClick={onExit}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-xs font-bold transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
            >
              Retour au Cours
            </button>
          </div>
        </div>
      </div>
    );
  }

  // QUIZ IN PROGRESS
  return (
    <div className="max-w-2xl mx-auto py-4 sm:py-6 space-y-4 sm:space-y-5 text-[#0A0A0A] dark:text-white select-none px-3">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] shadow-xs text-xs font-mono">
        <div className="flex items-center gap-2 truncate">
          <span className="font-bold text-[#10B981] shrink-0">
            Question {currentIndex + 1} / {total}
          </span>
          <span className="text-[#0A0A0A]/40 dark:text-white/40">·</span>
          <span className="text-[#0A0A0A]/60 dark:text-white/60 truncate">
            {moduleData.title}
          </span>
        </div>

        <button
          onClick={onExit}
          className="text-[#0A0A0A]/50 dark:text-white/50 hover:text-red-500 transition-colors cursor-pointer shrink-0 ml-2 px-2 py-1"
        >
          Quitter
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#10B981] transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-5 sm:p-8 space-y-5 shadow-xs">
        <div className="space-y-1.5">
          <span className="inline-block text-[10px] font-mono font-bold text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded">
            {currentQuestion.tag}
          </span>
          <h3 className="text-sm sm:text-lg font-bold pt-1 leading-relaxed">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Options with WCAG AA 44px min-height targets */}
        <div className="space-y-2.5">
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectAnswer = idx === currentQuestion.correctIndex;

            let style = 'border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] hover:border-[#10B981]';
            if (isAnswerChecked) {
              if (isCorrectAnswer) {
                style = 'border-[#10B981] bg-[#10B981]/15 text-[#10B981] font-bold';
              } else if (isSelected) {
                style = 'border-red-500 bg-red-500/15 text-red-500 font-bold';
              } else {
                style = 'opacity-40 border-black/5 dark:border-white/5';
              }
            } else if (isSelected) {
              style = 'border-[#10B981] bg-[#10B981]/10 text-[#10B981] font-bold';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswerChecked}
                className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer min-h-[48px] ${style}`}
              >
                <span className="w-6 h-6 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center font-mono text-[11px] font-bold shrink-0">
                  {OPTION_LETTERS[idx]}
                </span>
                <span className="leading-snug pt-0.5 flex-1">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation Banner */}
        {isAnswerChecked && (
          <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 space-y-1 text-xs animate-fadeIn font-mono">
            <div className="font-bold text-[#10B981]">Explication Pédagogique :</div>
            <p className="text-[#0A0A0A]/80 dark:text-white/80 leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Action Button: full-width on mobile, auto on desktop */}
        <div className="flex justify-end pt-2">
          {!isAnswerChecked ? (
            <button
              onClick={handleValidateAnswer}
              disabled={selectedOption === null}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#10B981] hover:bg-[#22C55E] disabled:opacity-40 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
            >
              <span>Valider la réponse</span>
              <span className="hidden sm:inline text-[11px] opacity-80">&nbsp;(Entrée)</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#10B981] hover:bg-[#22C55E] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              <span>{currentIndex < total - 1 ? 'Question Suivante' : 'Voir mon Résultat'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

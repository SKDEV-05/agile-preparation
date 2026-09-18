import React, { useState, useEffect, useCallback } from 'react';
import { Question, PartId } from '../../types';
import { useProgress } from '../../store/progressStore';
import { COURSE_MAP } from '../../data/course';
import { QUESTIONS_BY_PART } from '../../data/questions';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import { Check, X, ArrowRight, RotateCcw, ArrowLeft, Award, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCorrect, playIncorrect, playComplete, playSelect, isSoundEnabled, setSoundEnabled } from '../../lib/soundEffects';

interface QuizRunnerProps {
  questions?: Question[];
  title?: string;
  subtitle?: string;
  partId?: PartId;
  onExit: () => void;
  onGoToErrors?: () => void;
}

export function QuizRunner({ questions: propQuestions, title: propTitle, subtitle: propSubtitle, partId, onExit, onGoToErrors }: QuizRunnerProps) {
  const course = partId ? COURSE_MAP[partId] : null;
  const questions = propQuestions || (partId ? QUESTIONS_BY_PART[partId] : []) || [];
  const title = propTitle || (course ? `Évaluation · 30 QCM · Partie ${course.orderNumber}` : 'Évaluation QCM');
  const subtitle = propSubtitle || (course ? course.title : '');
  const { recordQuizResult, clearResolvedError } = useProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongQuestionIds, setWrongQuestionIds] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const [soundOn, setSoundOn] = useState(isSoundEnabled);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  const currentQuestion = questions[currentIndex];
  const total = questions.length;
  const progressPercent = Math.round(((currentIndex) / total) * 100);

  const handleSelectOption = (index: number) => {
    if (isAnswerChecked) return;
    playSelect();
    setSelectedOption(index);
  };

  const handleValidateAnswer = useCallback(() => {
    if (selectedOption === null || isAnswerChecked) return;
    setIsAnswerChecked(true);

    const isCorrect = selectedOption === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
      clearResolvedError(currentQuestion.id);
      playCorrect();
    } else {
      setWrongQuestionIds(prev => [...prev, currentQuestion.id]);
      playIncorrect();
    }
  }, [selectedOption, isAnswerChecked, currentQuestion, clearResolvedError]);

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= total) {
      const finalScore = score + (selectedOption === currentQuestion.correctIndex ? 0 : 0);
      const allWrongs = selectedOption === currentQuestion.correctIndex ? wrongQuestionIds : [...wrongQuestionIds, currentQuestion.id];
      
      if (partId) {
        recordQuizResult(partId, finalScore, total, allWrongs);
      }

      const pct = Math.round((finalScore / total) * 100);
      if (pct >= 80) {
        confetti({ 
          particleCount: 80, 
          spread: 70, 
          origin: { y: 0.6 },
          colors: ['#10B981', '#22C55E', '#FFFFFF', '#0A0A0A']
        });
      }
      playComplete();

      setIsFinished(true);
      return;
    }

    setCurrentIndex(prev => prev + 1);
    setSelectedOption(null);
    setIsAnswerChecked(false);
  }, [currentIndex, total, score, selectedOption, currentQuestion, wrongQuestionIds, partId, recordQuizResult]);

  // Keyboard Shortcuts (1-4 for options, Enter for confirm/next)
  useEffect(() => {
    if (isFinished) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const keyMap: Record<string, number> = {
        '1': 0, '&': 0, 'a': 0, 'A': 0,
        '2': 1, 'é': 1, 'b': 1, 'B': 1,
        '3': 2, '"': 2, 'c': 2, 'C': 2,
        '4': 3, "'": 3, 'd': 3, 'D': 3,
      };

      if (!isAnswerChecked && keyMap[e.key] !== undefined) {
        setSelectedOption(keyMap[e.key]);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (!isAnswerChecked && selectedOption !== null) {
          handleValidateAnswer();
        } else if (isAnswerChecked) {
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFinished, isAnswerChecked, selectedOption, handleValidateAnswer, handleNext]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScore(0);
    setWrongQuestionIds([]);
    setIsFinished(false);
  };

  if (isFinished) {
    const finalPct = Math.round((score / total) * 100);
    let evaluationLevel = 'À retravailler';
    let levelBadge = 'danger';

    if (finalPct >= 85) {
      evaluationLevel = 'Excellent ! Maîtrise totale pour l’examen';
      levelBadge = 'success';
    } else if (finalPct >= 70) {
      evaluationLevel = 'Bon niveau ! Quelques notions à consolider';
      levelBadge = 'primary';
    } else if (finalPct >= 50) {
      evaluationLevel = 'Moyen. Revois les points clés et réessaie';
      levelBadge = 'warning';
    }

    return (
      <div className="max-w-2xl mx-auto py-6 text-black dark:text-white">
        <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] backdrop-blur-xl p-8 sm:p-10 shadow-xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] shadow-md mb-4">
            <Award className="h-8 w-8" />
          </div>

          <div className="relative z-10 text-xs font-bold uppercase tracking-wider text-[#10B981] font-mono">
            Session d’entraînement Terminée
          </div>
          <h2 className="relative z-10 text-3xl font-black text-black dark:text-white mt-1">
            Résultats de l’évaluation
          </h2>

          <div className="relative z-10 my-6">
            <div className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#22C55E] tracking-tight font-mono">
              {finalPct}%
            </div>
            <p className="mt-2 text-sm font-semibold text-black/70 dark:text-white/70">
              {score} bonne(s) réponse(s) sur {total} questions
            </p>
          </div>

          <div className="relative z-10 inline-block mb-8">
            <Badge variant={levelBadge as any} size="md" className="px-4 py-1.5 text-sm font-semibold border shadow-md">
              {evaluationLevel}
            </Badge>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-3 mb-8 text-left font-mono">
            <div className="rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30 p-4">
              <div className="text-2xl font-bold text-[#10B981]">{score}</div>
              <div className="text-xs font-semibold text-black/80 dark:text-white/80 mt-1 font-sans">Réponses correctes</div>
            </div>
            <div className="rounded-2xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 p-4">
              <div className="text-2xl font-bold text-[#22C55E]">{total - score}</div>
              <div className="text-xs font-semibold text-black/80 dark:text-white/80 mt-1 font-sans">Erreurs à réviser</div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row flex-wrap justify-center gap-2.5 sm:gap-3">
            <Button variant="primary" size="md" onClick={handleRestart} className="gap-2 w-full sm:w-auto justify-center bg-[#10B981] hover:bg-[#22C55E] text-white shadow-md shadow-[#10B981]/25 font-bold">
              <RotateCcw className="h-4 w-4" />
              <span>Recommencer le quiz</span>
            </Button>
            {wrongQuestionIds.length > 0 && onGoToErrors && (
              <Button variant="secondary" size="md" onClick={onGoToErrors} className="gap-2 w-full sm:w-auto justify-center bg-[#22C55E] hover:bg-[#10B981] text-white font-bold border-none">
                <span>Revoir mes erreurs ({wrongQuestionIds.length})</span>
              </Button>
            )}
            <Button variant="outline" size="md" onClick={onExit} className="gap-2 w-full sm:w-auto justify-center border-black/10 dark:border-white/15 bg-white dark:bg-[#0A0A0A] hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white">
              <ArrowLeft className="h-4 w-4" />
              <span>Retour au cours</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-4 text-black dark:text-white">
      {/* Quiz Top Navigation Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 mb-6">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 text-xs font-semibold text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quitter le test</span>
        </button>
        <div className="text-center">
          <div className="text-xs font-bold text-black dark:text-white">{title}</div>
          <div className="text-[11px] text-black/50 dark:text-white/50">{subtitle}</div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundOn ? "Désactiver les sons" : "Activer les sons"}
            title={soundOn ? "Désactiver les effets sonores" : "Activer les effets sonores"}
            className="h-8 w-8 rounded-xl flex items-center justify-center border border-black/10 dark:border-white/10 text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors cursor-pointer"
          >
            {soundOn ? <Volume2 className="h-4 w-4 text-[#10B981]" /> : <VolumeX className="h-4 w-4 text-black/40 dark:text-white/40" />}
          </button>
          <div className="text-xs font-bold text-[#10B981] font-mono">
            Question {currentIndex + 1} / {total}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <Progress value={progressPercent} className="h-2 bg-black/10 dark:bg-white/10" />
      </div>

      {/* Main Question Card */}
      <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] backdrop-blur-xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#10B981]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex items-center gap-2 mb-4">
          <Badge variant="outline" size="sm" className="bg-black/5 dark:bg-white/5 text-black dark:text-white border-black/10 dark:border-white/10 font-mono">
            {currentQuestion.tag}
          </Badge>
          <span className="text-xs text-black/50 dark:text-white/50">Difficulté : {currentQuestion.difficulty}</span>
        </div>

        <h3 className="relative z-10 text-lg sm:text-xl font-bold text-black dark:text-white leading-snug">
          {currentQuestion.question}
        </h3>

        {/* 4 Options with equal lengths and clear badges */}
        <div className="relative z-10 mt-6 space-y-3">
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQuestion.correctIndex;

            let optionStyle = "w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all flex items-start gap-3.5 cursor-pointer ";
            if (!isAnswerChecked) {
              if (isSelected) {
                optionStyle += "border-[#10B981] bg-[#10B981]/10 text-black dark:text-white ring-2 ring-[#10B981]/30 shadow-sm";
              } else {
                optionStyle += "border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 text-black dark:text-white";
              }
            } else {
              if (isCorrect) {
                optionStyle += "border-[#10B981] bg-[#10B981]/15 text-black dark:text-white font-semibold ring-2 ring-[#10B981]/40 shadow-md";
              } else if (isSelected && !isCorrect) {
                optionStyle += "border-black/40 bg-black/10 dark:bg-white/10 text-black dark:text-white ring-2 ring-black/20 dark:ring-white/20 shadow-md animate-error-shake";
              } else {
                optionStyle += "border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswerChecked}
                className={optionStyle}
              >
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors font-mono ${
                  isSelected && !isAnswerChecked
                    ? 'bg-[#10B981] text-white shadow-md shadow-[#10B981]/40'
                    : isAnswerChecked && isCorrect
                    ? 'bg-[#10B981] text-white shadow-md shadow-[#10B981]/40'
                    : isAnswerChecked && isSelected && !isCorrect
                    ? 'bg-black/40 dark:bg-white/40 text-white'
                    : 'bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 leading-relaxed">{opt}</span>
                {!isAnswerChecked && (
                  <kbd className="hidden sm:inline-flex items-center justify-center font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-black/50 dark:text-white/50 font-bold border border-black/10 dark:border-white/10 shadow-2xs">
                    {idx + 1}
                  </kbd>
                )}
                {isAnswerChecked && isCorrect && (
                  <Check className="h-5 w-5 shrink-0 text-[#10B981]" />
                )}
                {isAnswerChecked && isSelected && !isCorrect && (
                  <X className="h-5 w-5 shrink-0 text-[#22C55E]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate pedagogic explanation */}
        {isAnswerChecked && (
          <div className={`relative z-10 mt-6 rounded-2xl p-4 sm:p-5 text-sm backdrop-blur-md ${
            selectedOption === currentQuestion.correctIndex
              ? 'bg-[#10B981]/10 border border-[#10B981]/40 text-black dark:text-white'
              : 'bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 text-black dark:text-white'
          }`}>
            <div className="font-bold flex items-center gap-2 mb-1.5">
              {selectedOption === currentQuestion.correctIndex ? (
                <>
                  <Check className="h-5 w-5 text-[#10B981]" />
                  <span className="text-[#10B981]">Bonne réponse !</span>
                </>
              ) : (
                <>
                  <X className="h-5 w-5 text-[#22C55E]" />
                  <span className="text-[#22C55E]">Réponse incorrecte</span>
                </>
              )}
            </div>
            <div className="text-xs text-black/70 dark:text-white/70 font-semibold mb-2">
              Réponse attendue : <span className="font-bold text-black dark:text-white">{String.fromCharCode(65 + currentQuestion.correctIndex)} — {currentQuestion.options[currentQuestion.correctIndex]}</span>
            </div>
            <p className="leading-relaxed text-black/80 dark:text-white/80 text-xs sm:text-sm">
              <b className="text-black dark:text-white">Pourquoi ? </b>
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Action Button Footer */}
        <div className="relative z-10 mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 border-t border-black/10 dark:border-white/10 pt-5">
          <div className="text-xs text-black/60 dark:text-white/60 font-medium text-center sm:text-left">
            {!isAnswerChecked ? "Choisis une option puis clique sur Valider (ou appuie sur Entrée)" : "Analyse l'explication avant de continuer"}
          </div>

          {!isAnswerChecked ? (
            <Button
              variant="primary"
              size="md"
              disabled={selectedOption === null}
              onClick={handleValidateAnswer}
              className="font-bold px-6 w-full sm:w-auto justify-center bg-[#10B981] hover:bg-[#22C55E] text-white shadow-md shadow-[#10B981]/25 disabled:opacity-40"
            >
              Valider la réponse
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              className="gap-2 font-bold px-6 w-full sm:w-auto justify-center bg-[#10B981] hover:bg-[#22C55E] text-white shadow-md shadow-[#10B981]/25"
            >
              <span>{currentIndex + 1 === total ? 'Voir mes résultats' : 'Question suivante'}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Question, PartId } from '../../types';
import { useProgress } from '../../store/progressStore';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import { Check, X, ArrowRight, RotateCcw, ArrowLeft, Award, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizRunnerProps {
  questions: Question[];
  title: string;
  subtitle: string;
  partId?: PartId;
  onExit: () => void;
  onGoToErrors?: () => void;
}

export function QuizRunner({ questions, title, subtitle, partId, onExit, onGoToErrors }: QuizRunnerProps) {
  const { recordQuizResult, clearResolvedError } = useProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongQuestionIds, setWrongQuestionIds] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const total = questions.length;
  const progressPercent = Math.round(((currentIndex) / total) * 100);

  const handleSelectOption = (index: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(index);
  };

  const handleValidateAnswer = () => {
    if (selectedOption === null || isAnswerChecked) return;
    setIsAnswerChecked(true);

    const isCorrect = selectedOption === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
      // If was previously wrong and user is in practice/error mode, clear it
      clearResolvedError(currentQuestion.id);
    } else {
      setWrongQuestionIds(prev => [...prev, currentQuestion.id]);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= total) {
      // Finish
      const finalScore = score + (selectedOption === currentQuestion.correctIndex ? 0 : 0);
      const allWrongs = selectedOption === currentQuestion.correctIndex ? wrongQuestionIds : [...wrongQuestionIds, currentQuestion.id];
      
      if (partId) {
        recordQuizResult(partId, finalScore, total, allWrongs);
      }

      const pct = Math.round((finalScore / total) * 100);
      if (pct >= 80) {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }

      setIsFinished(true);
      return;
    }

    setCurrentIndex(prev => prev + 1);
    setSelectedOption(null);
    setIsAnswerChecked(false);
  };

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
      <div className="max-w-2xl mx-auto py-6">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-card text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-primary shadow-sm mb-4">
            <Award className="h-8 w-8" />
          </div>

          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Session Terminée
          </div>
          <h2 className="text-3xl font-black text-slate-900 mt-1">
            Résultats de l’évaluation
          </h2>

          <div className="my-6">
            <div className="text-6xl sm:text-7xl font-black text-primary tracking-tight">
              {finalPct}%
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-600">
              {score} bonne(s) réponse(s) sur {total} questions
            </p>
          </div>

          <div className="inline-block mb-8">
            <Badge variant={levelBadge as any} size="md" className="px-4 py-1 text-sm font-semibold">
              {evaluationLevel}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8 text-left">
            <div className="rounded-2xl bg-emerald-50/60 border border-emerald-100 p-4">
              <div className="text-2xl font-bold text-emerald-800">{score}</div>
              <div className="text-xs font-semibold text-emerald-900 mt-1">Réponses correctes</div>
            </div>
            <div className="rounded-2xl bg-red-50/60 border border-red-100 p-4">
              <div className="text-2xl font-bold text-red-800">{total - score}</div>
              <div className="text-xs font-semibold text-red-900 mt-1">Erreurs à réviser</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="primary" size="md" onClick={handleRestart} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              <span>Recommencer le quiz</span>
            </Button>
            {wrongQuestionIds.length > 0 && onGoToErrors && (
              <Button variant="secondary" size="md" onClick={onGoToErrors} className="gap-2">
                <span>Revoir mes erreurs ({wrongQuestionIds.length})</span>
              </Button>
            )}
            <Button variant="outline" size="md" onClick={onExit} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Retour au cours</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-4">
      {/* Quiz Top Navigation Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quitter le test</span>
        </button>
        <div className="text-center">
          <div className="text-xs font-bold text-slate-800">{title}</div>
          <div className="text-[11px] text-slate-400">{subtitle}</div>
        </div>
        <div className="text-xs font-bold text-primary">
          Question {currentIndex + 1} / {total}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Main Question Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" size="sm">
            {currentQuestion.tag}
          </Badge>
          <span className="text-xs text-slate-400">Difficulté : {currentQuestion.difficulty}</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
          {currentQuestion.question}
        </h3>

        {/* 4 Options with equal lengths and clear badges */}
        <div className="mt-6 space-y-3">
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQuestion.correctIndex;

            let optionStyle = "w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all flex items-start gap-3.5 ";
            if (!isAnswerChecked) {
              if (isSelected) {
                optionStyle += "border-primary bg-indigo-50/50 text-slate-900 ring-2 ring-primary/20";
              } else {
                optionStyle += "border-slate-200/90 bg-slate-50/40 hover:bg-slate-100/70 hover:border-slate-300 text-slate-700";
              }
            } else {
              if (isCorrect) {
                optionStyle += "border-emerald-300 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-400";
              } else if (isSelected && !isCorrect) {
                optionStyle += "border-red-300 bg-red-50 text-red-950 ring-1 ring-red-400";
              } else {
                optionStyle += "border-slate-100 bg-slate-50/20 text-slate-400 opacity-60";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswerChecked}
                className={optionStyle}
              >
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                  isSelected && !isAnswerChecked
                    ? 'bg-primary text-white'
                    : isAnswerChecked && isCorrect
                    ? 'bg-emerald-600 text-white'
                    : isAnswerChecked && isSelected && !isCorrect
                    ? 'bg-red-500 text-white'
                    : 'bg-white border border-slate-200 text-slate-700'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 leading-relaxed">{opt}</span>
                {isAnswerChecked && isCorrect && (
                  <Check className="h-5 w-5 shrink-0 text-emerald-600" />
                )}
                {isAnswerChecked && isSelected && !isCorrect && (
                  <X className="h-5 w-5 shrink-0 text-red-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate pedagogic explanation */}
        {isAnswerChecked && (
          <div className={`mt-6 rounded-2xl p-4 sm:p-5 text-sm ${
            selectedOption === currentQuestion.correctIndex
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-950'
              : 'bg-red-50 border border-red-200 text-red-950'
          }`}>
            <div className="font-bold flex items-center gap-2 mb-1.5">
              {selectedOption === currentQuestion.correctIndex ? (
                <>
                  <Check className="h-5 w-5 text-emerald-600" />
                  <span>Bonne réponse !</span>
                </>
              ) : (
                <>
                  <X className="h-5 w-5 text-red-500" />
                  <span>Réponse incorrecte</span>
                </>
              )}
            </div>
            <div className="text-xs text-slate-600 font-semibold mb-2">
              Réponse attendue : <span className="font-bold text-slate-900">{String.fromCharCode(65 + currentQuestion.correctIndex)} — {currentQuestion.options[currentQuestion.correctIndex]}</span>
            </div>
            <p className="leading-relaxed text-slate-700 text-xs sm:text-sm">
              <b className="text-slate-900">Pourquoi ? </b>
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Action Button Footer */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
          <div className="text-xs text-slate-400 font-medium">
            {!isAnswerChecked ? "Choisis une option puis clique sur Valider" : "Analyse l'explication avant de continuer"}
          </div>

          {!isAnswerChecked ? (
            <Button
              variant="primary"
              size="md"
              disabled={selectedOption === null}
              onClick={handleValidateAnswer}
              className="font-bold px-6"
            >
              Valider la réponse
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              className="gap-2 font-bold px-6"
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

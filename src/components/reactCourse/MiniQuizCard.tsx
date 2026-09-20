import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { ReactMiniQuestion } from '../../types/reactTypes';

interface MiniQuizCardProps {
  question: ReactMiniQuestion;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export function MiniQuizCard({ question }: MiniQuizCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedIndex(idx);
    setIsAnswered(true);
  };

  const isCorrect = selectedIndex === question.correctIndex;

  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4 sm:p-5 space-y-3">
      {/* Question Header */}
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#10B981]">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Micro-Question de Vérification Immédiate</span>
        </span>
        {isAnswered && (
          <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
            isCorrect ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-red-500/20 text-red-500'
          }`}>
            {isCorrect ? 'Correct ✓' : 'À revoir ✗'}
          </span>
        )}
      </div>

      <p className="text-xs sm:text-sm font-bold text-[#0A0A0A] dark:text-white">
        {question.question}
      </p>

      {/* Options */}
      <div className="space-y-2">
        {question.options.map((opt, idx) => {
          const isSelected = selectedIndex === idx;
          const isTheCorrectOne = idx === question.correctIndex;

          let btnStyle = 'border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] hover:border-[#10B981]';
          if (isAnswered) {
            if (isTheCorrectOne) {
              btnStyle = 'border-[#10B981] bg-[#10B981]/15 text-[#10B981] font-bold';
            } else if (isSelected) {
              btnStyle = 'border-red-500 bg-red-500/15 text-red-500 font-bold';
            } else {
              btnStyle = 'opacity-50 border-black/5 dark:border-white/5';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
              className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-2.5 cursor-pointer min-h-[44px] ${btnStyle}`}
            >
              <span className="font-mono text-[11px] font-bold w-5 h-5 rounded-md bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                {OPTION_LETTERS[idx] || idx + 1}
              </span>
              <span className="leading-snug pt-0.5">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation when answered */}
      {isAnswered && (
        <div className={`p-3 rounded-xl border text-xs leading-relaxed font-mono ${
          isCorrect ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#0A0A0A] dark:text-white' : 'bg-red-500/10 border-red-500/30 text-[#0A0A0A] dark:text-white'
        }`}>
          <div className="font-bold mb-0.5">Explication Pédagogique :</div>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
}

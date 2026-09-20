import React, { useState, useEffect } from 'react';
import { CreditCard, Sparkles, CheckCircle2, RotateCw, RotateCcw, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { REACT_FLASHCARDS } from '../../data/reactFlashcards';
import { useReactProgress } from '../../store/reactProgressStore';
import { playCardFlip } from '../../lib/soundEffects';

export function ReactFlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const { progress, toggleFlashcardMastered } = useReactProgress();

  const categories = ['Tous', 'Architecture Web', 'JavaScript Moderne', 'React Architecture', 'Composants & Props', 'State & Hooks', 'Listes & Formulaires', 'Routage & Tests', 'Redux Core', 'Redux Toolkit'];

  const filteredCards = selectedCategory === 'Tous'
    ? REACT_FLASHCARDS
    : REACT_FLASHCARDS.filter(c => c.category === selectedCategory);

  const activeCard = filteredCards[currentIndex] || filteredCards[0];
  const isMastered = progress.masteredFlashcards.includes(activeCard?.id);

  const handleToggleFlip = () => {
    playCardFlip();
    setIsFlipped(prev => !prev);
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleToggleFlip();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, filteredCards.length]);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  if (!activeCard) return null;

  return (
    <div className="space-y-8 max-w-4xl mx-auto text-[#0A0A0A] dark:text-white select-none pb-12">
      {/* Header */}
      <section className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-6 sm:p-8 space-y-3 shadow-sm text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#10B981]">
          <CreditCard className="h-4 w-4" />
          <span>Mémorisation Active · Flashcards 3D (React &amp; Redux)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#0A0A0A] dark:text-white tracking-tight">
          Ancrage des Notions Clés en Mémoire
        </h1>
        <p className="text-xs sm:text-sm text-[#0A0A0A]/70 dark:text-white/70 max-w-2xl mx-auto leading-relaxed">
          Activez la mémoire à long terme : tentez de formuler la réponse mentalement avant de retourner la carte.
        </p>

        {/* Shortcuts reminder */}
        <div className="hidden sm:flex flex-wrap items-center justify-center gap-4 pt-2 text-[11px] font-mono text-[#0A0A0A]/50 dark:text-white/50">
          <span><kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10">Espace</kbd> Retourner</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10">← / →</kbd> Précédente / Suivante</span>
        </div>
      </section>

      {/* Category filter pills - Edge-to-edge full bleed on mobile so pills touch phone border without margin */}
      <div className="relative -mx-3 px-3 sm:mx-0 sm:px-0">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1.5 scroll-smooth pr-8 sm:pr-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#10B981] text-white shadow-xs'
                  : 'bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 text-[#0A0A0A]/70 dark:text-white/70 hover:border-[#10B981]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Visual cue: subtle right-edge fade gradient on mobile indicating more categories to scroll */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 dark:from-[#0A0A0A] to-transparent sm:hidden" />
      </div>

      {/* 3D FLASHCARD CARD */}
      <div className="flex flex-col items-center space-y-4">
        {/* Card Counter & Category Badge */}
        <div className="flex items-center justify-between w-full max-w-xl text-xs font-mono px-1">
          <span className="text-[#10B981] font-bold">
            {activeCard.category}
          </span>
          <span className="text-[#0A0A0A]/60 dark:text-white/60">
            Carte {currentIndex + 1} sur {filteredCards.length}
          </span>
        </div>

        {/* 3D Flip Card Container */}
        <div
          onClick={handleToggleFlip}
          className="w-full max-w-xl min-h-[340px] sm:min-h-[400px] perspective-1000 cursor-pointer select-none group"
        >
          <div
            className={`relative w-full h-full min-h-[340px] sm:min-h-[400px] duration-500 transform-style-preserve-3d transition-transform ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Recto (Question / Front Face) */}
            <div className="absolute inset-0 w-full h-full rounded-3xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] p-5 sm:p-8 flex flex-col justify-between shadow-xl backface-hidden backdrop-blur-xl group-hover:border-[#10B981] transition-colors">
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full font-mono text-xs font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                  Question Clé
                </span>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleFlashcardMastered(activeCard.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer ${
                    isMastered
                      ? 'bg-[#10B981] text-white'
                      : 'bg-black/5 dark:bg-white/10 text-[#0A0A0A]/60 dark:text-white/60 hover:bg-[#10B981]/15 hover:text-[#10B981]'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{isMastered ? 'Maîtrisée ✓' : 'À revoir'}</span>
                </button>
              </div>

              {/* Central Question Content */}
              <div className="my-auto py-4 space-y-3 text-center px-2 sm:px-4">
                <h3 className="text-lg sm:text-2xl font-black text-[#0A0A0A] dark:text-white leading-snug">
                  {activeCard.front}
                </h3>
              </div>

              {/* Bottom Flip Hint */}
              <div className="text-center text-xs font-bold text-[#10B981] flex items-center justify-center gap-1.5 font-mono">
                <RotateCw className="h-3.5 w-3.5 animate-spin-slow" />
                <span>Touchez ou appuyez sur Espace pour révéler</span>
              </div>
            </div>

            {/* Verso (Answer / Back Face) */}
            <div className="absolute inset-0 w-full h-full rounded-3xl border-2 border-[#10B981]/60 bg-white dark:bg-[#0A0A0A] p-5 sm:p-8 flex flex-col justify-between shadow-xl backface-hidden rotate-y-180 backdrop-blur-xl group-hover:border-[#10B981] transition-colors">
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full font-mono text-xs font-bold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
                  Réponse & Analyse
                </span>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleFlashcardMastered(activeCard.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer ${
                    isMastered
                      ? 'bg-[#10B981] text-white'
                      : 'bg-black/5 dark:bg-white/10 text-[#0A0A0A]/60 dark:text-white/60 hover:bg-[#10B981]/15 hover:text-[#10B981]'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{isMastered ? 'Maîtrisée ✓' : 'À revoir'}</span>
                </button>
              </div>

              {/* Central Answer Content with clean scroll if long */}
              <div className="my-auto py-3 space-y-3 overflow-y-auto max-h-[230px] sm:max-h-[260px] pr-1 text-left no-scrollbar">
                <p className="text-sm sm:text-base text-[#0A0A0A]/90 dark:text-white/90 leading-relaxed font-normal">
                  {activeCard.back}
                </p>

                {activeCard.codeExample && (
                  <pre className="p-3 rounded-xl bg-black/5 dark:bg-white/5 text-slate-800 dark:text-white border border-black/10 dark:border-white/10 font-mono text-xs overflow-x-auto text-left">
                    <code>{activeCard.codeExample}</code>
                  </pre>
                )}

                {activeCard.keyPoints && (
                  <ul className="space-y-1 text-xs text-[#10B981] font-mono text-left list-disc list-inside">
                    {activeCard.keyPoints.map((kp, i) => (
                      <li key={i}>{kp}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Bottom Flip Hint */}
              <div className="text-center text-xs font-bold text-[#10B981] flex items-center justify-center gap-1.5 font-mono">
                <RotateCw className="h-3.5 w-3.5" />
                <span>Cliquez pour revoir la question</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handlePrev}
            className="p-3 rounded-2xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] hover:border-[#10B981] text-[#0A0A0A] dark:text-white transition-colors cursor-pointer shadow-xs"
            aria-label="Carte précédente"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={handleNext}
            className="p-3 rounded-2xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] hover:border-[#10B981] text-[#0A0A0A] dark:text-white transition-colors cursor-pointer shadow-xs"
            aria-label="Carte suivante"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

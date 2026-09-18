import { useState, useEffect, useCallback } from 'react';
import { FLASHCARDS } from '../../data/flashcards';
import { useProgress } from '../../store/progressStore';
import { Button } from '../../components/ui/Button';
import { CreditCard, CheckCircle2, ChevronRight, ChevronLeft, RotateCw } from 'lucide-react';
import { Flashcard } from '../../types';
import { playCardFlip } from '../../lib/soundEffects';

export function FlashcardsPage() {
  const { progress, toggleFlashcardMastered } = useProgress();
  const [selectedPartFilter, setSelectedPartFilter] = useState<string>('all');
  const [flippedCardIds, setFlippedCardIds] = useState<string[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const filteredCards: Flashcard[] = selectedPartFilter === 'all'
    ? FLASHCARDS
    : FLASHCARDS.filter(c => c.partId === selectedPartFilter);

  const currentCard = filteredCards[activeCardIndex] || filteredCards[0];

  const handleFlipCard = useCallback((cardId: string) => {
    playCardFlip();
    setFlippedCardIds(prev =>
      prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  }, []);

  // Keyboard navigation (Space to flip, ArrowLeft/ArrowRight to navigate, M to master)
  useEffect(() => {
    if (!currentCard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleFlipCard(currentCard.id);
      } else if (e.key === 'ArrowRight') {
        setActiveCardIndex(prev => Math.min(filteredCards.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setActiveCardIndex(prev => Math.max(0, prev - 1));
      } else if (e.key.toLowerCase() === 'm' || e.key.toLowerCase() === 's') {
        toggleFlashcardMastered(currentCard.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCard, filteredCards.length, handleFlipCard, toggleFlashcardMastered]);

  const masteredCount = progress.masteredFlashcards.length;
  const isCurrentFlipped = currentCard && flippedCardIds.includes(currentCard.id);
  const isCurrentMastered = currentCard && progress.masteredFlashcards.includes(currentCard.id);

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-6 sm:space-y-8 select-none">
      {/* Header Banner */}
      <div className="reveal-on-scroll rounded-3xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] backdrop-blur-xl p-6 sm:p-9 shadow-xl relative overflow-hidden text-[#0A0A0A] dark:text-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] shadow-xs shrink-0">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider">
                Mémorisation Active & Répétition Espacée
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] dark:text-white tracking-tight mt-0.5">
                Flashcards Interactives 3D
              </h1>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-[#0A0A0A]/60 dark:text-white/60">Cartes maîtrisées</span>
            <div className="text-base sm:text-xl font-bold font-mono text-[#10B981]">
              {masteredCount} / {FLASHCARDS.length} ({Math.round((masteredCount / FLASHCARDS.length) * 100)}%)
            </div>
          </div>
        </div>

        <p className="relative z-10 mt-3.5 text-xs sm:text-sm text-[#0A0A0A]/70 dark:text-white/70 max-w-2xl leading-relaxed font-normal">
          Clique sur la carte pour la retourner et vérifier tes connaissances. Utilise les touches <kbd className="font-mono text-[10px] bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded">Espace</kbd> pour retourner, <kbd className="font-mono text-[10px] bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded">←</kbd> <kbd className="font-mono text-[10px] bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded">→</kbd> pour naviguer, et <kbd className="font-mono text-[10px] bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded">M</kbd> pour marquer comme acquise.
        </p>

        {/* Filter bar */}
        <div className="relative z-10 mt-6 flex overflow-x-auto no-scrollbar sm:flex-wrap items-center gap-2 border-t border-black/10 dark:border-white/10 pt-4 pb-1 sm:pb-0">
          <span className="text-xs font-mono font-bold text-[#0A0A0A]/60 dark:text-white/60 mr-2 shrink-0">Filtrer par module :</span>
          <button
            onClick={() => { setSelectedPartFilter('all'); setActiveCardIndex(0); }}
            className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-mono font-bold transition-all cursor-pointer ${
              selectedPartFilter === 'all' 
                ? 'bg-[#10B981] text-white shadow-2xs' 
                : 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[#0A0A0A] dark:text-white hover:border-[#10B981]'
            }`}
          >
            Toutes ({FLASHCARDS.length})
          </button>
          {['part1', 'part2', 'part3', 'part4', 'part5'].map((pid, idx) => (
            <button
              key={pid}
              onClick={() => { setSelectedPartFilter(pid); setActiveCardIndex(0); }}
              className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedPartFilter === pid 
                  ? 'bg-[#10B981] text-white shadow-2xs' 
                  : 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[#0A0A0A] dark:text-white hover:border-[#10B981]'
              }`}
            >
              Partie {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Flashcard 3D Area */}
      {filteredCards.length > 0 && currentCard && (
        <div className="flex flex-col items-center">
          {/* Card Progress Navigator */}
          <div className="flex items-center justify-between w-full max-w-xl mb-4 text-xs font-mono font-bold text-[#0A0A0A]/60 dark:text-white/60">
            <span>Carte {activeCardIndex + 1} sur {filteredCards.length}</span>
            <span className="rounded-md bg-black/5 dark:bg-white/10 px-2.5 py-0.5 border border-black/10 dark:border-white/10 text-[#0A0A0A] dark:text-white">
              {currentCard.category}
            </span>
          </div>

          {/* 3D Flip Card Container */}
          <div
            onClick={() => handleFlipCard(currentCard.id)}
            className="w-full max-w-xl h-80 perspective-1000 cursor-pointer select-none"
          >
            <div
              className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform ${
                isCurrentFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Recto (Question / Front) */}
              <div className="absolute inset-0 w-full h-full rounded-3xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] p-8 shadow-xl flex flex-col justify-between backface-hidden backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 px-2.5 py-1 text-xs font-mono font-bold">
                    Question / Notion Clé
                  </span>
                  {isCurrentMastered && (
                    <span className="flex items-center gap-1 text-xs font-bold text-[#10B981]">
                      <CheckCircle2 className="h-4 w-4" /> Maîtrisée
                    </span>
                  )}
                </div>

                <div className="my-auto text-center px-4">
                  <h3 className="text-xl sm:text-2xl font-black text-[#0A0A0A] dark:text-white leading-snug">
                    {currentCard.front}
                  </h3>
                </div>

                <div className="text-center text-xs font-bold text-[#10B981] flex items-center justify-center gap-1.5">
                  <RotateCw className="h-3.5 w-3.5 animate-spin-slow" />
                  <span>Clique ou appuie sur Espace pour révéler</span>
                </div>
              </div>

              {/* Verso (Answer / Back) */}
              <div className="absolute inset-0 w-full h-full rounded-3xl border-2 border-[#10B981]/60 bg-white dark:bg-[#0A0A0A] p-8 shadow-xl flex flex-col justify-between backface-hidden rotate-y-180 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 px-2.5 py-1 text-xs font-mono font-bold">
                    Réponse & Synthèse Pédagogique
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#10B981]">Concept Clé 2A</span>
                </div>

                <div className="my-auto overflow-y-auto max-h-48 pr-1 text-left no-scrollbar">
                  <p className="text-sm sm:text-base font-semibold text-[#0A0A0A] dark:text-white leading-relaxed">
                    {currentCard.back}
                  </p>

                  {currentCard.keyPoints && currentCard.keyPoints.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-black/10 dark:border-white/10 space-y-1.5">
                      {currentCard.keyPoints.map((pt, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-medium text-[#0A0A0A]/85 dark:text-white/85">
                          <span className="text-[#10B981] font-bold">✓</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-center text-xs font-bold text-[#10B981] flex items-center justify-center gap-1.5">
                  <RotateCw className="h-3.5 w-3.5" />
                  <span>Clique pour revenir à la question</span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls below card */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 w-full max-w-xl mt-6">
            <Button
              variant="outline"
              size="sm"
              disabled={activeCardIndex === 0}
              onClick={() => {
                setActiveCardIndex(prev => Math.max(0, prev - 1));
              }}
              className="gap-1.5 order-1 disabled:opacity-30 border-black/15 dark:border-white/15 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Précédente</span>
            </Button>

            <Button
              variant={isCurrentMastered ? "secondary" : "outline"}
              size="sm"
              onClick={() => toggleFlashcardMastered(currentCard.id)}
              className={`gap-1.5 order-3 sm:order-2 w-full sm:w-auto font-bold cursor-pointer ${
                isCurrentMastered 
                  ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/40' 
                  : 'border-black/15 dark:border-white/15 hover:border-[#10B981]'
              }`}
            >
              <CheckCircle2 className={`h-4 w-4 ${isCurrentMastered ? 'text-[#10B981]' : 'text-[#0A0A0A]/40 dark:text-white/40'}`} />
              <span>{isCurrentMastered ? 'Notion acquise ✓' : 'Marquer comme acquise'}</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={activeCardIndex === filteredCards.length - 1}
              onClick={() => {
                setActiveCardIndex(prev => Math.min(filteredCards.length - 1, prev + 1));
              }}
              className="gap-1.5 order-2 sm:order-3 disabled:opacity-30 border-black/15 dark:border-white/15 cursor-pointer"
            >
              <span>Suivante</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

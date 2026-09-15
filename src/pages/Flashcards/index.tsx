import React, { useState } from 'react';
import { FLASHCARDS } from '../../data/flashcards';
import { useProgress } from '../../store/progressStore';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { CreditCard, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { Flashcard } from '../../types';

export function FlashcardsPage() {
  const { progress, toggleFlashcardMastered } = useProgress();
  const [selectedPartFilter, setSelectedPartFilter] = useState<string>('all');
  const [flippedCardIds, setFlippedCardIds] = useState<string[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const filteredCards: Flashcard[] = selectedPartFilter === 'all'
    ? FLASHCARDS
    : FLASHCARDS.filter(c => c.partId === selectedPartFilter);

  const handleFlipCard = (cardId: string) => {
    setFlippedCardIds(prev =>
      prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const masteredCount = progress.masteredFlashcards.length;
  const currentCard = filteredCards[activeCardIndex] || filteredCards[0];
  const isCurrentFlipped = currentCard && flippedCardIds.includes(currentCard.id);
  const isCurrentMastered = currentCard && progress.masteredFlashcards.includes(currentCard.id);

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="reveal-on-scroll rounded-3xl border border-white/10 bg-[#0D1526]/90 backdrop-blur-xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 shadow-lg shrink-0">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Mémorisation Active
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
                Flashcards Interactives 3D
              </h1>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-slate-400">Cartes maîtrisées</span>
            <div className="text-base sm:text-lg font-bold text-emerald-400">
              {masteredCount} / {FLASHCARDS.length} ({Math.round((masteredCount / FLASHCARDS.length) * 100)}%)
            </div>
          </div>
        </div>

        <p className="relative z-10 mt-3 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Clique sur la carte pour la retourner et vérifier tes connaissances. Marque les notions acquises pour suivre ta maîtrise des définitions de référence.
        </p>

        {/* Filter bar - horizontal swipe on mobile */}
        <div className="relative z-10 mt-6 flex overflow-x-auto no-scrollbar sm:flex-wrap items-center gap-2 border-t border-white/10 pt-4 pb-1 sm:pb-0">
          <span className="text-xs font-bold text-slate-400 mr-2 shrink-0">Filtrer :</span>
          <button
            onClick={() => { setSelectedPartFilter('all'); setActiveCardIndex(0); }}
            className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
              selectedPartFilter === 'all' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-[#070B14] border border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            Toutes ({FLASHCARDS.length})
          </button>
          {['part1', 'part2', 'part3', 'part4', 'part5'].map((pid, idx) => (
            <button
              key={pid}
              onClick={() => { setSelectedPartFilter(pid); setActiveCardIndex(0); }}
              className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
                selectedPartFilter === pid ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-[#070B14] border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              Partie {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Flashcard 3D Carousel Area */}
      {filteredCards.length > 0 && currentCard && (
        <div className="flex flex-col items-center">
          {/* Card Progress Navigator */}
          <div className="flex items-center justify-between w-full max-w-xl mb-4 text-xs font-bold text-slate-400">
            <span>Carte {activeCardIndex + 1} sur {filteredCards.length}</span>
            <Badge variant="outline" size="sm" className="bg-white/5 border-white/10 text-slate-300">{currentCard.category}</Badge>
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
              <div className="absolute inset-0 w-full h-full rounded-3xl border border-white/15 bg-[#0D1526]/95 p-8 shadow-2xl flex flex-col justify-between backface-hidden backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <Badge variant="primary" size="sm" className="bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">Question / Notion</Badge>
                  {isCurrentMastered && (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" /> Maîtrisée
                    </span>
                  )}
                </div>

                <div className="my-auto text-center px-4">
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                    {currentCard.front}
                  </h3>
                </div>

                <div className="text-center text-xs font-semibold text-indigo-400">
                  ✦ Clique pour révéler la réponse
                </div>
              </div>

              {/* Verso (Answer / Back) */}
              <div className="absolute inset-0 w-full h-full rounded-3xl border border-indigo-500/40 bg-gradient-to-br from-[#0D1526] via-indigo-950/40 to-[#070B14] p-8 shadow-2xl flex flex-col justify-between backface-hidden rotate-y-180 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <Badge variant="accent" size="sm" className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Réponse & Synthèse</Badge>
                  <span className="text-[11px] font-bold text-indigo-300">Concept Clé 2A</span>
                </div>

                <div className="my-auto overflow-y-auto max-h-48 pr-1 text-left custom-scrollbar">
                  <p className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed">
                    {currentCard.back}
                  </p>

                  {currentCard.keyPoints && currentCard.keyPoints.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/10 space-y-1">
                      {currentCard.keyPoints.map((pt, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-300">
                          <span className="text-cyan-400 font-bold">✓</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-center text-xs font-semibold text-indigo-400">
                  ✦ Clique pour revenir à la question
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
              className="gap-1.5 order-1 border-white/15 bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Précédente</span>
            </Button>

            <Button
              variant={isCurrentMastered ? "secondary" : "outline"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                toggleFlashcardMastered(currentCard.id);
              }}
              className="gap-1.5 text-xs font-bold order-3 sm:order-2 w-full sm:w-auto justify-center border-white/15 bg-white/5 hover:bg-white/10 text-slate-200"
            >
              <CheckCircle2 className={`h-4 w-4 ${isCurrentMastered ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{isCurrentMastered ? 'Carte maîtrisée ✓' : 'Marquer comme maîtrisée'}</span>
            </Button>

            <Button
              variant="primary"
              size="sm"
              disabled={activeCardIndex >= filteredCards.length - 1}
              onClick={() => {
                setActiveCardIndex(prev => Math.min(filteredCards.length - 1, prev + 1));
              }}
              className="gap-1.5 font-bold order-2 sm:order-3 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 disabled:opacity-30"
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

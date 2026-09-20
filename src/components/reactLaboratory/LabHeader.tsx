import React from 'react';
import { 
  Play, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  CheckCircle2, 
  ArrowLeft,
  PanelLeftClose,
  PanelLeftOpen,
  Columns,
  Award
} from 'lucide-react';
import { LabExercise } from '../../types/reactLabTypes';

interface LabHeaderProps {
  exercise: LabExercise;
  currentIndex: number;
  totalExercises: number;
  isSolved: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onRun: () => void;
  onReset: () => void;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
  onBackToOverview: () => void;
  buildStatus: 'ready' | 'running' | 'success' | 'error';
  isLeftHidden: boolean;
  onToggleLeftHidden: () => void;
  onResetLayout?: () => void;
  allPassed?: boolean;
  onValidate?: () => void;
}

export function LabHeader({
  exercise,
  currentIndex,
  totalExercises,
  isSolved,
  onRun,
  onReset,
  isFocusMode,
  onToggleFocusMode,
  onBackToOverview,
  buildStatus,
  isLeftHidden,
  onToggleLeftHidden,
  onResetLayout,
  allPassed,
  onValidate
}: LabHeaderProps) {
  const getDifficultyBadge = (diff: LabExercise['difficulty']) => {
    switch (diff) {
      case 'intro':
        return <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">Débutant</span>;
      case 'practice':
        return <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">Pratique</span>;
      case 'challenge':
        return <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 text-slate-800 dark:text-white border border-slate-300 dark:border-white/20">Défi Examen</span>;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-[#121212] border-b border-slate-200 dark:border-white/10 text-slate-800 dark:text-white select-none transition-colors">
      {/* Left: Navigation & Context */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBackToOverview}
          title="Retour à la carte des ateliers"
          className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden md:inline font-medium">Ateliers</span>
        </button>

        <div className="h-4 w-px bg-slate-200 dark:bg-white/15 hidden sm:block" />

        {/* Toggle Left Sidebar Button */}
        <button
          onClick={onToggleLeftHidden}
          title={isLeftHidden ? "Afficher le volet Mission & Fichiers" : "Masquer le volet gauche (Agrandir l'éditeur)"}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
            isLeftHidden
              ? 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/40 hover:bg-[#10B981]/25 font-bold shadow-xs'
              : 'bg-black/5 dark:bg-white/5 text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10'
          }`}
        >
          {isLeftHidden ? <PanelLeftOpen className="h-3.5 w-3.5 text-[#10B981]" /> : <PanelLeftClose className="h-3.5 w-3.5" />}
          <span className="hidden sm:inline font-medium">{isLeftHidden ? 'Afficher Volet' : 'Masquer Volet'}</span>
        </button>

        <div className="h-4 w-px bg-slate-200 dark:bg-white/15 hidden sm:block" />

        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
              <span>{exercise.title}</span>
              {isSolved && (
                <span title="Atelier Validé !">
                  <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                </span>
              )}
            </h2>
            {getDifficultyBadge(exercise.difficulty)}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-white/50 hidden md:block">
            {exercise.moduleLabel} · {exercise.chapterTitle}
          </p>
        </div>
      </div>

      {/* Middle/Right: Actions & Controls */}
      <div className="flex items-center justify-between sm:justify-end gap-2 flex-wrap">
        {/* Reset Layout Widths Button */}
        {onResetLayout && (
          <button
            onClick={onResetLayout}
            title="Réinitialiser les largeurs des colonnes par défaut"
            className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-white/50 hover:text-slate-900 dark:hover:text-white border border-black/10 dark:border-white/10 text-xs font-mono transition-colors cursor-pointer"
          >
            <Columns className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Disposition</span>
          </button>
        )}

        {/* Static Atelier Index Badge (No skipping chevrons) */}
        <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-2.5 py-1 text-xs font-mono text-slate-700 dark:text-white/60">
          <span className="text-[#10B981] font-bold">Atelier {currentIndex + 1}</span>
          <span className="text-slate-400 dark:text-white/40"> / {totalExercises}</span>
        </div>

        {/* Validation CTA if passed */}
        {allPassed && !isSolved && onValidate && (
          <button
            onClick={onValidate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#10B981] hover:bg-[#22C55E] text-white font-mono text-xs font-bold transition-all shadow-2xs cursor-pointer animate-pulse"
          >
            <Award className="h-3.5 w-3.5" />
            <span>Valider l'Atelier</span>
          </button>
        )}

        {/* Reset Code Trigger */}
        <button
          onClick={onReset}
          title="Réinitialiser le code de cet exercice"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-700 dark:text-white/75 hover:text-slate-900 dark:hover:text-white border border-black/10 dark:border-white/10 text-xs font-mono transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>

        {/* Run Button (Primary) */}
        <button
          onClick={onRun}
          disabled={buildStatus === 'running'}
          title="Exécuter et compiler (Ctrl + Entrée)"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#10B981] hover:bg-[#22C55E] text-white font-mono text-xs font-bold transition-all shadow-2xs cursor-pointer disabled:opacity-50"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          <span>{buildStatus === 'running' ? 'Compil...' : 'Exécuter'}</span>
        </button>

        {/* Focus Mode Trigger */}
        <button
          onClick={onToggleFocusMode}
          title={isFocusMode ? "Quitter le mode focus" : "Passer en mode focus (plein écran)"}
          className="p-1.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white border border-black/10 dark:border-white/10 transition-colors cursor-pointer"
        >
          {isFocusMode ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}

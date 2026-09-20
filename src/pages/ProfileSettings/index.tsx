import React, { useState } from 'react';
import { 
  User, 
  Volume2, 
  VolumeX, 
  Download, 
  RotateCcw, 
  Calendar, 
  ArrowRight
} from 'lucide-react';
import { useProgress } from '../../store/progressStore';
import { Button } from '../../components/ui/Button';
import { Progress } from '../../components/ui/Progress';
import { ThemeToggle } from '../../components/common/ThemeToggle';
import { isSoundEnabled, setSoundEnabled } from '../../lib/soundEffects';

interface ProfileSettingsPageProps {
  onBackToDashboard: () => void;
}

export function ProfileSettingsPage({ onBackToDashboard }: ProfileSettingsPageProps) {
  const { progress, overallPercentage, resetAllProgress } = useProgress();
  const [soundOn, setSoundOn] = useState(isSoundEnabled);
  const [examDate, setExamDate] = useState('2026-06-15');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const toggleAudio = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  // Calculate days remaining until target exam date
  const calculateDaysRemaining = () => {
    const target = new Date(examDate).getTime();
    const now = new Date().getTime();
    const diff = Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)));
    return diff;
  };

  const daysRemaining = calculateDaysRemaining();

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `fullstack2a_progression_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-8 select-none">
      {/* Header Banner */}
      <section className="relative rounded-3xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] p-6 sm:p-8 shadow-xl overflow-hidden">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#10B981]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-xl font-bold shadow-xs">
              <User className="h-7 w-7" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#10B981]">
                Espace Stagiaire · 2ème Année
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] dark:text-white tracking-tight mt-0.5">
                Profil & Paramètres d’Étude
              </h1>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onBackToDashboard}
            className="gap-2 font-bold"
          >
            <span>Retour au tableau de bord</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* 1. Global Progress Overview */}
      <section className="rounded-3xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-black/15 dark:border-white/15 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#0A0A0A] dark:text-white">
              Synthèse de Maîtrise Pédagogique
            </h2>
            <p className="text-xs text-[#0A0A0A]/60 dark:text-white/60 mt-0.5">
              Calculée en temps réel d'après tes lectures de cours et scores QCM
            </p>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-[#10B981]">
            {overallPercentage}%
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-[#0A0A0A] dark:text-white">
            <span>Progression globale vers l'Examen de Fin de Module</span>
            <span>{overallPercentage} / 100%</span>
          </div>
          <Progress value={overallPercentage} className="h-2.5" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10">
            <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0A]/50 dark:text-white/50">Questions erronées</span>
            <div className="text-xl font-black text-[#0A0A0A] dark:text-white mt-1 font-mono">
              {progress.wrongQuestionIds.length}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10">
            <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0A]/50 dark:text-white/50">Flashcards maîtrisées</span>
            <div className="text-xl font-black text-[#10B981] mt-1 font-mono">
              {progress.masteredFlashcards.length}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10">
            <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0A]/50 dark:text-white/50">Tentatives d'Examen</span>
            <div className="text-xl font-black text-[#0A0A0A] dark:text-white mt-1 font-mono">
              {progress.examAttempts.length}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10">
            <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0A]/50 dark:text-white/50">Jours avant EFM</span>
            <div className="text-xl font-black text-[#22C55E] mt-1 font-mono">
              {daysRemaining} j
            </div>
          </div>
        </div>
      </section>

      {/* 2. Learning Preferences */}
      <section className="rounded-3xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-black/15 dark:border-white/15 pb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#0A0A0A] dark:text-white">
            Préférences d'Étude & Interface
          </h2>
          <p className="text-xs text-[#0A0A0A]/60 dark:text-white/60 mt-0.5">
            Personnalise ton environnement de révision
          </p>
        </div>

        <div className="space-y-4">
          {/* Audio Feedback */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/5 dark:bg-white/10 text-[#0A0A0A] dark:text-white">
                {soundOn ? <Volume2 className="h-5 w-5 text-[#10B981]" /> : <VolumeX className="h-5 w-5 opacity-40" />}
              </div>
              <div>
                <div className="text-sm font-bold text-[#0A0A0A] dark:text-white">
                  Effets sonores interactifs
                </div>
                <div className="text-xs text-[#0A0A0A]/60 dark:text-white/60">
                  Retour audio lors des sélections et réponses aux QCM
                </div>
              </div>
            </div>

            <button
              onClick={toggleAudio}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                soundOn
                  ? 'bg-[#10B981] text-white shadow-xs'
                  : 'bg-black/10 dark:bg-white/10 text-[#0A0A0A]/60 dark:text-white/60'
              }`}
            >
              {soundOn ? 'Activé' : 'Désactivé'}
            </button>
          </div>

          {/* Theme appearance */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
            <div>
              <div className="text-sm font-bold text-[#0A0A0A] dark:text-white">
                Mode d'affichage
              </div>
              <div className="text-xs text-[#0A0A0A]/60 dark:text-white/60">
                Bascule entre le mode sombre (recommandé) et le mode clair
              </div>
            </div>
            <ThemeToggle variant="switch" />
          </div>

          {/* Exam Target Date */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/5 dark:bg-white/10 text-[#0A0A0A] dark:text-white">
                <Calendar className="h-5 w-5 text-[#10B981]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#0A0A0A] dark:text-white">
                  Date cible de l'examen officiel
                </div>
                <div className="text-xs text-[#0A0A0A]/60 dark:text-white/60">
                  Affiche le compte à rebours de préparation
                </div>
              </div>
            </div>

            <input
              type="date"
              value={examDate}
              onChange={e => setExamDate(e.target.value)}
              className="rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] px-3 py-1.5 text-xs font-mono font-bold text-[#0A0A0A] dark:text-white focus:outline-none focus:border-[#10B981]"
            />
          </div>
        </div>
      </section>

      {/* 3. Data Backup & Reset */}
      <section className="rounded-3xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] p-6 sm:p-8 shadow-sm space-y-4">
        <div className="border-b border-black/15 dark:border-white/15 pb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#0A0A0A] dark:text-white">
            Sauvegarde & Gestion des Données
          </h2>
          <p className="text-xs text-[#0A0A0A]/60 dark:text-white/60 mt-0.5">
            Tes données sont stockées localement dans ton navigateur
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          <Button
            variant="outline"
            size="md"
            onClick={handleExportData}
            className="gap-2 font-semibold text-xs justify-center"
          >
            <Download className="h-4 w-4 text-[#10B981]" />
            <span>Exporter ma progression (JSON)</span>
          </Button>

          {!showResetConfirm ? (
            <Button
              variant="outline"
              size="md"
              onClick={() => setShowResetConfirm(true)}
              className="gap-2 font-semibold text-xs justify-center text-[#0A0A0A]/60 dark:text-white/60 hover:text-red-500"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Réinitialiser mes résultats</span>
            </Button>
          ) : (
            <div className="flex items-center gap-2 p-2 rounded-xl border border-red-500/30 bg-red-500/10">
              <span className="text-xs text-red-500 font-bold">Confirmer l'effacement ?</span>
              <button
                onClick={() => {
                  resetAllProgress();
                  setShowResetConfirm(false);
                }}
                className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-xs font-bold cursor-pointer"
              >
                Oui, réinitialiser
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-2 py-1 text-xs text-[#0A0A0A]/60 dark:text-white/60 hover:text-[#0A0A0A] dark:hover:text-white cursor-pointer"
              >
                Annuler
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

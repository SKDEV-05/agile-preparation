import React from 'react';
import { 
  Code2, 
  Sparkles, 
  ArrowRight, 
  Award, 
  FlaskConical, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle2, 
  Play, 
  Layers,
  Clock,
  Compass,
  Zap,
  BookOpen
} from 'lucide-react';
import { REACT_MODULES } from '../../data/reactCourse';
import { useReactProgress } from '../../store/reactProgressStore';
import { ReactModuleId } from '../../types/reactTypes';

interface ReactDashboardProps {
  onNavigateModule: (moduleId: ReactModuleId) => void;
  onOpenPlayground: () => void;
  onOpenLaboratory: () => void;
  onOpenFlashcards: () => void;
  onOpenExam: () => void;
  onOpenErrors: () => void;
  onSwitchCurriculum: () => void;
}

export function ReactDashboardPage({
  onNavigateModule,
  onOpenPlayground,
  onOpenLaboratory,
  onOpenFlashcards,
  onOpenExam,
  onOpenErrors,
  onSwitchCurriculum
}: ReactDashboardProps) {
  const { progress, overallPercentage } = useReactProgress();
  const errorCount = progress.wrongQuestionIds.length;

  // Find next module to study
  const nextModule = REACT_MODULES.find(m => !progress.modules[m.id]?.quizCompleted) || REACT_MODULES[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-[#0A0A0A] dark:text-white select-none pb-12">
      {/* 1. HERO COMMAND DECK FOR REACT */}
      <section className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-gradient-to-b from-white/95 to-white/70 dark:from-[#0A0A0A]/95 dark:to-[#0A0A0A]/80 backdrop-blur-xl p-6 sm:p-10 overflow-hidden shadow-lg">
        {/* Ambient Auras */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#10B981]/15 blur-3xl pointer-events-none" />
        {/* Big Brand Logo in Top Right (Desktop/Web only, hidden on mobile for clean UI) */}
        <div className="hidden lg:block absolute right-8 top-8 xl:right-12 xl:top-8 z-0 pointer-events-none select-none opacity-80 dark:opacity-90">
          <div className="relative animate-watermark-float">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#10B981]/25 to-[#22C55E]/30 blur-2xl scale-125 pointer-events-none" />
            <svg
              width="220"
              height="220"
              viewBox="-11.5 -10.23174 23 20.46348"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#10B981] drop-shadow-[0_8px_32px_rgba(16,185,129,0.35)] animate-spin-slow"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="reactHeroWatermarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22C55E" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              <circle cx="0" cy="0" r="2.3" fill="url(#reactHeroWatermarkGrad)" />
              <circle cx="0" cy="0" r="1.1" fill="#FFFFFF" fillOpacity="0.85" />
              <g stroke="url(#reactHeroWatermarkGrad)" strokeWidth="1.1" fill="none">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
              </g>
            </svg>
          </div>
        </div>

        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-4 text-left">
            {/* Tag Pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/10 dark:border-white/10 px-3 py-1 text-xs shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="font-mono font-bold text-[#10B981]">Formation Active</span>
              <span className="text-black/30 dark:text-white/30">·</span>
              <span className="font-semibold text-xs text-[#0A0A0A]/75 dark:text-white/75">
                Développement Web Front-End (React.js &amp; Redux Toolkit)
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0A0A0A] dark:text-white leading-[1.15]">
                Comprendre le code.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-[#22C55E] to-[#10B981]">
                  Pratiquer en direct.
                </span>
              </h1>
              <p className="text-xs sm:text-base font-bold text-[#0A0A0A]/80 dark:text-white/80">
                La référence interactive conforme au programme officiel des 8 modules OFPPT.
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#0A0A0A]/70 dark:text-white/70 max-w-2xl leading-relaxed">
              Une pédagogie axée sur le code réel : visualisations d'arbres de composants, mini playground d'exécution instantanée, 7 ateliers pratiques et 120+ QCM corrigés avec barèmes EFM.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="p-3 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04]">
                <div className="flex items-center gap-1.5 text-[#10B981] mb-0.5">
                  <Layers className="h-3.5 w-3.5" />
                  <span className="text-xs font-mono font-bold">8 Modules</span>
                </div>
                <div className="text-[11px] font-medium text-[#0A0A0A]/70 dark:text-white/70">PDF 1 à 8</div>
              </div>

              <div className="p-3 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04]">
                <div className="flex items-center gap-1.5 text-[#22C55E] mb-0.5">
                  <FlaskConical className="h-3.5 w-3.5" />
                  <span className="text-xs font-mono font-bold">7 Labs</span>
                </div>
                <div className="text-[11px] font-medium text-[#0A0A0A]/70 dark:text-white/70">Pratique &amp; Bugs</div>
              </div>

              <div className="p-3 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04]">
                <div className="flex items-center gap-1.5 text-[#10B981] mb-0.5">
                  <CreditCard className="h-3.5 w-3.5" />
                  <span className="text-xs font-mono font-bold">24 Cartes</span>
                </div>
                <div className="text-[11px] font-medium text-[#0A0A0A]/70 dark:text-white/70">Flashcards 3D</div>
              </div>

              <div className="p-3 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04]">
                <div className="flex items-center gap-1.5 text-[#22C55E] mb-0.5">
                  <Award className="h-3.5 w-3.5" />
                  <span className="text-xs font-mono font-bold">40 QCM EFM</span>
                </div>
                <div className="text-[11px] font-medium text-[#0A0A0A]/70 dark:text-white/70">Examen Blanc</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigateModule(nextModule.id)}
                className="px-5 py-3 rounded-2xl bg-[#10B981] hover:bg-[#22C55E] text-white font-bold text-xs shadow-lg shadow-[#10B981]/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Reprendre le Module 0{nextModule.orderNumber}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onOpenPlayground}
                className="px-4 py-3 rounded-2xl border border-black/15 dark:border-white/15 hover:border-[#10B981] text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer bg-white dark:bg-[#0A0A0A]"
              >
                <Code2 className="h-4 w-4 text-[#10B981]" />
                <span>Ouvrir le Code Playground</span>
              </button>

              <button
                onClick={onOpenLaboratory}
                className="px-4 py-3 rounded-2xl border border-black/15 dark:border-white/15 hover:border-[#10B981] text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer bg-white dark:bg-[#0A0A0A]"
              >
                <FlaskConical className="h-4 w-4 text-[#22C55E]" />
                <span>Laboratoire Interactif</span>
              </button>
            </div>
          </div>

          {/* Right Column: Progression Card in Bottom Right */}
          <div className="lg:col-span-4 flex flex-col justify-end h-full pt-6 lg:pt-20 space-y-4 relative z-10">
            {/* Global Mastery Card (Bottom Right) */}
            <div className="rounded-2xl border border-[#10B981]/30 bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-xl p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#10B981]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Maîtrise Globale React</span>
                </span>
                <span className="text-xl font-black font-mono text-[#10B981]">
                  {overallPercentage}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#10B981] to-[#22C55E] transition-all duration-500 rounded-full"
                  style={{ width: `${overallPercentage}%` }}
                />
              </div>

              <div className="text-[11px] text-[#0A0A0A]/60 dark:text-white/60 font-mono flex justify-between pt-1">
                <span>Modules assimilés</span>
                <span>
                  {Object.values(progress.modules).filter(m => m.quizCompleted).length} / 8
                </span>
              </div>
            </div>

            {/* Erreurs à réviser card */}
            {errorCount > 0 && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-red-500/15 text-red-500 flex items-center justify-center shrink-0">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-red-500">
                      {errorCount} notion(s) à rattraper
                    </div>
                    <p className="text-[10px] text-[#0A0A0A]/60 dark:text-white/60">
                      Erreurs enregistrées lors des QCM
                    </p>
                  </div>
                </div>

                <button
                  onClick={onOpenErrors}
                  className="px-3 py-1.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  Réviser
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. THE 8 OFFICIAL OFPPT MODULES GRID */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-black/10 dark:border-white/10 pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Programme Officiel · 8 Modules de Formation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0A] dark:text-white tracking-tight">
              Progression Pédagogique Recommandée
            </h2>
          </div>

          <span className="text-xs font-mono text-[#0A0A0A]/60 dark:text-white/60">
            Ordre strict sans lacune
          </span>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REACT_MODULES.map(mod => {
            const mProg = progress.modules[mod.id] || { completedSections: [], quizCompleted: false, bestScore: 0 };
            const isCompleted = mProg.quizCompleted;
            const completedSteps = mProg.completedSections.length;

            return (
              <div
                key={mod.id}
                onClick={() => onNavigateModule(mod.id)}
                className="group relative rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-4 flex flex-col justify-between hover:border-[#10B981] transition-all duration-300 shadow-xs cursor-pointer"
              >
                <div className="space-y-2.5">
                  {/* Top Bar: PDF Tag & Checkmark */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded">
                      Module 0{mod.orderNumber} · {mod.pdfReference}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-[#10B981] font-bold">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981]" />
                        <span>Validé</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-[#0A0A0A]/40 dark:text-white/40">
                        {completedSteps} / {mod.sections.length}
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-sm font-bold text-[#0A0A0A] dark:text-white group-hover:text-[#10B981] transition-colors line-clamp-2">
                      {mod.title}
                    </h3>
                    <p className="text-[11px] text-[#0A0A0A]/60 dark:text-white/60 mt-1 line-clamp-2 leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Best Score & Link */}
                <div className="pt-3 mt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs font-mono">
                  {mProg.bestScore > 0 ? (
                    <span className="text-[#22C55E] font-bold text-[11px]">
                      Score QCM : {mProg.bestScore}%
                    </span>
                  ) : (
                    <span className="text-[#0A0A0A]/40 dark:text-white/40 text-[10px]">
                      QCM en attente
                    </span>
                  )}
                  <span className="text-[#10B981] group-hover:translate-x-1 transition-transform flex items-center font-bold text-xs">
                    Étudier →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. PRACTICAL ACTIVITIES ROW */}
      <section className="grid sm:grid-cols-3 gap-4 pt-2">
        {/* Playground Card */}
        <div
          onClick={onOpenPlayground}
          className="p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] hover:border-[#10B981] transition-all shadow-xs cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="h-10 w-10 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Code2 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#0A0A0A] dark:text-white">
              Code Playground
            </h3>
            <p className="text-xs text-[#0A0A0A]/70 dark:text-white/70 leading-relaxed">
              Testez vos propres idées, modifiez les composants officiels et voyez le résultat instantanément.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 text-xs font-mono font-bold text-[#10B981]">
            Ouvrir l'éditeur →
          </div>
        </div>

        {/* 3D Flashcards Card */}
        <div
          onClick={onOpenFlashcards}
          className="p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] hover:border-[#10B981] transition-all shadow-xs cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="h-10 w-10 rounded-xl bg-[#22C55E]/15 text-[#22C55E] flex items-center justify-center group-hover:scale-105 transition-transform">
              <CreditCard className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#0A0A0A] dark:text-white">
              Flashcards 3D (Active Recall)
            </h3>
            <p className="text-xs text-[#0A0A0A]/70 dark:text-white/70 leading-relaxed">
              24 cartes pour ancrer les définitions officielles, les règles de syntaxe et les pièges classiques.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 text-xs font-mono font-bold text-[#22C55E]">
            Lancer la révision →
          </div>
        </div>

        {/* Examen Blanc EFM Card */}
        <div
          onClick={onOpenExam}
          className="p-5 rounded-2xl border border-[#10B981]/30 bg-[#10B981]/5 hover:bg-[#10B981]/10 transition-all shadow-xs cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="h-10 w-10 rounded-xl bg-[#10B981] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#0A0A0A] dark:text-white">
              Examen Blanc EFM (React)
            </h3>
            <p className="text-xs text-[#0A0A0A]/70 dark:text-white/70 leading-relaxed">
              40 questions minutées (45 minutes) conformes aux barèmes officiels de l'OFPPT pour décrocher la mention.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#10B981]/20 text-xs font-mono font-bold text-[#10B981]">
            Démarrer le chronomètre →
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import {
  Zap,
  Code2,
  Server,
  Database,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Compass,
  FlaskConical,
  CreditCard,
  Award,
  Lock,
  Clock,
  Layers
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { PlatformLogo } from '../../components/common/PlatformLogo';

const Hero3DScene = React.lazy(() => import('../../components/3d/Hero3DScene').then(m => ({ default: m.Hero3DScene })));

interface CurriculumHubProps {
  onSelectAgile: () => void;
  onSelectReact?: () => void;
  onOpenMethodology?: () => void;
}

// Authentic Brand SVGs for the 4 Curriculum Modules (React, Laravel, MongoDB, Scrum)
function ReactBrandLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="0" cy="0" r="2.05" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function LaravelBrandLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L5.043.05a.375.375 0 01.375 0L9.93 2.647h.002c.015.01.027.021.04.033l.038.027c.013.014.02.03.033.045.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.02.025-.033.012-.015.021-.03.033-.043.012-.012.025-.02.037-.028.014-.01.026-.023.041-.032h.001l4.513-2.598a.375.375 0 01.375 0l4.513 2.598c.016.01.027.021.042.031.012.01.025.018.036.028.013.014.022.03.034.044.008.012.019.021.024.033.011.02.018.04.024.06.006.01.012.021.015.032zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.04-.01-.011-.021-.022-.028-.036h-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.163 3.76 2.163 3.759-2.164zm-.376 4.978L16.21 7.087 14.63 6.18v4.283l2.182 1.256 1.58.908zm-8.65 9.654l5.514-3.148 2.756-1.572-3.757-2.163-4.323 2.489-3.941 2.27z" />
    </svg>
  );
}

function MongoBrandLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C11.83 0 11.66.07 11.53.2 9.87 1.83 4 8.16 4 14.28 4 18.73 7.54 22.3 11.97 22.4v1.39c0 .12.09.21.21.21.12 0 .22-.09.22-.21V22.4c4.43-.1 7.97-3.67 7.97-8.12 0-6.12-5.87-12.45-7.53-14.08A.73.73 0 0 0 12 0zm-.03 2.37c1.33 1.37 6.43 6.94 6.43 11.91 0 3.52-2.73 6.41-6.21 6.57l-.22-18.48zm-.4 0v18.48c-3.48-.16-6.21-3.05-6.21-6.57 0-4.97 5.1-10.54 6.43-11.91z" />
    </svg>
  );
}

function ScrumBrandLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.5 2v6h-6" />
      <path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function CurriculumHub({ onSelectAgile, onSelectReact, onOpenMethodology }: CurriculumHubProps) {
  // Exactly 4 Official Modules with Authentic Real Logos
  const catalogueModules = [
    {
      id: 'agile',
      title: 'Approche Agile & Gestion de Projet',
      category: 'Scrum & Méthodes Agiles',
      status: 'available' as const,
      isOpen: true,
      description: 'Méthodologies prédictives vs agiles, calculs PERT & Gantt, Scrum, Jira, Git 4 zones et GitLab CI/CD.',
      icon: ScrumBrandLogo,
      gradient: 'from-[#10B981] to-[#22C55E]',
      topics: ['Cycle en V vs Agile', 'Calculs PERT & Marges', 'Scrum & Jira', 'GitLab CI/CD'],
      stats: '5 Parties · 20 Chapitres · 200 QCM',
      preview: (
        <div className="rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 p-2 font-mono text-[9px]">
          <div className="flex items-center justify-between text-[#10B981] font-bold pb-1 mb-1 border-b border-black/10 dark:border-white/10">
            <span className="flex items-center gap-1.5"><ScrumBrandLogo className="h-3.5 w-3.5 text-[#10B981]" /> Scrum Sprint Live</span>
            <span className="text-[8px] font-bold bg-[#10B981]/15 px-1.5 py-0.5 rounded text-[#10B981]">Actif</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-center">
            <div className="bg-white dark:bg-[#0A0A0A] p-0.5 rounded border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70">PERT</div>
            <div className="bg-[#22C55E]/10 text-[#22C55E] p-0.5 rounded border border-[#22C55E]/30 font-bold">Scrum</div>
            <div className="bg-[#10B981]/10 text-[#10B981] p-0.5 rounded border border-[#10B981]/30 font-bold">CI/CD ✓</div>
          </div>
        </div>
      )
    },
    {
      id: 'react',
      title: 'React.js & Frontend Moderne',
      category: 'Front-End Moderne & Redux',
      status: 'available' as const,
      isOpen: true,
      description: 'Architecture SPA, JSX, Hooks (useState, useEffect), Redux Toolkit, Router v6 et Tests Jest/RTL.',
      icon: ReactBrandLogo,
      gradient: 'from-[#22C55E] to-[#10B981]',
      topics: ['JSX & Virtual DOM', 'Hooks & State', 'Redux Toolkit', 'React Router v6'],
      stats: '8 Modules · 7 Labs · 120+ QCM',
      preview: (
        <div className="rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 p-2 font-mono text-[9px]">
          <div className="flex items-center justify-between text-[#10B981] font-bold pb-1 mb-1 border-b border-black/10 dark:border-white/10">
            <span className="flex items-center gap-1.5 font-bold"><ReactBrandLogo className="h-3.5 w-3.5 text-[#22C55E]" /> &lt;VirtualDOM /&gt;</span>
            <span className="text-[8px] font-bold bg-[#10B981]/15 px-1.5 py-0.5 rounded text-[#10B981]">60 FPS ✓</span>
          </div>
          <div className="bg-white dark:bg-[#0A0A0A] p-1 rounded border border-black/10 dark:border-white/10 text-[8px] space-y-0.5">
            <div><span className="text-[#10B981] font-bold">const</span> [state] = <span className="text-[#22C55E]">useState</span>();</div>
          </div>
        </div>
      )
    },
    {
      id: 'laravel',
      title: 'Laravel & Architecture Backend APIs',
      category: 'Back-End & APIs REST (Laravel)',
      status: 'upcoming' as const,
      isOpen: false,
      description: 'Architecture MVC en PHP 8, persistance Eloquent ORM, authentification Sanctum, migrations et tests unitaires.',
      icon: LaravelBrandLogo,
      gradient: 'from-[#10B981] via-[#22C55E] to-[#0A0A0A]',
      topics: ['Architecture MVC', 'Eloquent ORM', 'Sanctum Auth', 'Tests Pest'],
      stats: '5 Modules · 20 Chapitres · 160 QCM',
      preview: (
        <div className="rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 p-2 font-mono text-[9px]">
          <div className="flex items-center justify-between text-black/60 dark:text-white/60 pb-1 mb-1 border-b border-black/10 dark:border-white/10">
            <span className="flex items-center gap-1.5 font-bold text-black dark:text-white"><LaravelBrandLogo className="h-3 w-3 text-[#10B981]" /> api/v1/routes</span>
            <span className="text-[8px] text-[#10B981]">200 OK ✓</span>
          </div>
          <div className="bg-white dark:bg-[#0A0A0A] p-1 rounded border border-black/10 dark:border-white/10 text-[8px] space-y-0.5">
            <div><span className="text-[#22C55E] font-bold">Route::</span>get(<span className="text-[#10B981]">'/stagiaires'</span>);</div>
          </div>
        </div>
      )
    },
    {
      id: 'database',
      title: 'SGBD, SQL Avancé & NoSQL (MongoDB)',
      category: 'Bases de Données & NoSQL (MongoDB)',
      status: 'upcoming' as const,
      isOpen: false,
      description: 'Modélisation Merise (MCD/MLD), requêtes SQL complexes, index B-Tree, transactions ACID et MongoDB NoSQL.',
      icon: MongoBrandLogo,
      gradient: 'from-[#22C55E] to-[#10B981]',
      topics: ['Merise MCD & MLD', 'SQL Jointures & Index', 'Transactions ACID', 'MongoDB NoSQL'],
      stats: '4 Modules · 16 Chapitres · 140 QCM',
      preview: (
        <div className="rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 p-2 font-mono text-[9px]">
          <div className="flex items-center justify-between text-black/60 dark:text-white/60 pb-1 mb-1 border-b border-black/10 dark:border-white/10">
            <span className="flex items-center gap-1.5 font-bold text-black dark:text-white"><MongoBrandLogo className="h-3.5 w-3.5 text-[#10B981]" /> mongodb://cluster</span>
            <span className="text-[8px] text-[#10B981]">NoSQL ✓</span>
          </div>
          <div className="bg-white dark:bg-[#0A0A0A] p-1 rounded border border-black/10 dark:border-white/10 text-[8px] space-y-0.5">
            <div><span className="text-[#22C55E] font-bold">db.stagiaires.</span>find(<span className="text-[#10B981]">&#123; active: true &#125;</span>);</div>
          </div>
        </div>
      )
    }
  ];

  const handleScrollToCourses = () => {
    const el = document.getElementById('courses-catalogue-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const learningPillars = [
    {
      title: 'Apprendre',
      desc: 'Comprendre les concepts clés de chaque module grâce à des synthèses claires et pragmatiques.',
      icon: BookOpen,
      badge: '01 · Synthèses 2A'
    },
    {
      title: 'Pratiquer',
      desc: 'Manipuler directement sur des simulateurs interactifs : code, logique, SGBD et workflows Agiles.',
      icon: FlaskConical,
      badge: '02 · Labs Live'
    },
    {
      title: 'Réviser',
      desc: 'Mémoriser activement avec les Flashcards intelligentes et le carnet d’analyse des erreurs.',
      icon: CreditCard,
      badge: '03 · Rattrapage'
    },
    {
      title: 'Performer',
      desc: 'Valider les examens blancs officiels minutés pour décrocher la meilleure mention à l’EFM.',
      icon: Award,
      badge: '04 · Barème EFM'
    }
  ];

  return (
    <div className="min-h-screen bg-transparent text-[#0A0A0A] dark:text-white py-2 sm:py-8 px-0 sm:px-2 space-y-8 sm:space-y-12 transition-colors select-none w-full max-w-full overflow-hidden">

      {/* ═══════════════════════════════════════════════════════════════
          1. HERO COMMAND DECK (GENERAL FOR OFPPT FULLSTACK 2A)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative max-w-7xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-gradient-to-b from-white/95 to-white/70 dark:from-[#0A0A0A]/95 dark:to-[#0A0A0A]/80 backdrop-blur-xl shadow-lg p-3.5 sm:p-7 lg:p-10 w-full min-w-0">
        {/* Luminescent background aura */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#10B981]/15 blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 -bottom-20 h-64 w-64 rounded-full bg-[#22C55E]/10 blur-3xl pointer-events-none" />

        {/* Main 2-Column Hero Content */}
        <div className="relative z-10 grid lg:grid-cols-12 gap-6 sm:gap-8 items-center pt-1 w-full min-w-0">

          {/* Left Column: Brand + Headline + General Curriculum Copy + Mini Squares + Actions */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-5 text-left w-full min-w-0">

            {/* Logo Pill */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/10 dark:border-white/10 px-2.5 sm:px-3.5 py-1 text-xs shadow-2xs max-w-full min-w-0">
              <PlatformLogo size={20} />
              <span className="font-handwriting text-xl sm:text-2xl font-black text-[#0A0A0A] dark:text-white leading-none shrink-0">
                FullStack <span className="text-[#10B981]">2A</span>
              </span>
              <span className="text-black/25 dark:text-white/25 shrink-0">·</span>
              <span className="font-semibold text-[11px] sm:text-xs text-[#0A0A0A]/75 dark:text-white/75 truncate">
                Développement Digital OFPPT
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-1.5 sm:space-y-2">
              <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0A0A0A] dark:text-white leading-[1.12]">
                Apprendre avec méthode.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-[#22C55E] to-[#10B981] block sm:inline">
                  Pratiquer en direct.
                </span>
              </h1>
              <p className="text-xs sm:text-base font-bold text-[#0A0A0A]/85 dark:text-white/85 tracking-tight leading-snug">
                La plateforme moderne pour réussir tes examens de 2ème année Full Stack.
              </p>
            </div>

            {/* General OFPPT 2A Curriculum Copy (Not 100% Agile) */}
            <p className="text-xs sm:text-sm text-[#0A0A0A]/70 dark:text-white/70 leading-relaxed max-w-xl font-normal">
              Conçu pour éliminer le flou et réussir ses examens : cours synthétisés,
              <span className="text-[#0A0A0A] dark:text-white font-semibold"> simulateurs interactifs (React, Laravel, SQL, Git & Agile)</span>,
              et entraînements QCM corrigés conformes aux barèmes officiels de l'OFPPT.
            </p>

            {/* MINI SQUARE INFORMATION CARDS (GENERAL CURRICULUM OVERVIEW) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-1 w-full min-w-0">
              <div className="rounded-xl sm:rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] p-2.5 sm:p-3 shadow-xs min-w-0 overflow-hidden">
                <div className="flex items-center gap-1.5 text-[#10B981] mb-0.5 sm:mb-1">
                  <Layers className="h-3.5 w-3.5 shrink-0 text-[#10B981]" />
                  <span className="text-xs font-mono font-bold truncate">4 Modules</span>
                </div>
                <div className="text-[10px] sm:text-[11px] font-medium text-[#0A0A0A]/70 dark:text-white/70 truncate">Curriculum 2A</div>
              </div>

              <div className="rounded-xl sm:rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] p-2.5 sm:p-3 shadow-xs min-w-0 overflow-hidden">
                <div className="flex items-center gap-1.5 text-[#22C55E] mb-0.5 sm:mb-1">
                  <Award className="h-3.5 w-3.5 shrink-0 text-[#22C55E]" />
                  <span className="text-xs font-mono font-bold truncate">650+ QCM</span>
                </div>
                <div className="text-[10px] sm:text-[11px] font-medium text-[#0A0A0A]/70 dark:text-white/70 truncate">Banque Corrigée</div>
              </div>

              <div className="rounded-xl sm:rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] p-2.5 sm:p-3 shadow-xs min-w-0 overflow-hidden">
                <div className="flex items-center gap-1.5 text-[#10B981] mb-0.5 sm:mb-1">
                  <FlaskConical className="h-3.5 w-3.5 shrink-0 text-[#10B981]" />
                  <span className="text-xs font-mono font-bold truncate">Labs Live</span>
                </div>
                <div className="text-[10px] sm:text-[11px] font-medium text-[#0A0A0A]/70 dark:text-white/70 truncate">Simulateurs</div>
              </div>

              <div className="rounded-xl sm:rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] p-2.5 sm:p-3 shadow-xs min-w-0 overflow-hidden">
                <div className="flex items-center gap-1.5 text-[#22C55E] mb-0.5 sm:mb-1">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-[#22C55E]" />
                  <span className="text-xs font-mono font-bold truncate">Barème EFM</span>
                </div>
                <div className="text-[10px] sm:text-[11px] font-medium text-[#0A0A0A]/70 dark:text-white/70 truncate">Examens Blancs</div>
              </div>
            </div>

            {/* Action Buttons: Clicking Commencer smoothly scrolls to the 4 modules catalogue */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={handleScrollToCourses}
                className="gap-2.5 font-bold shadow-lg shadow-[#10B981]/25 bg-[#10B981] hover:bg-[#22C55E] text-white cursor-pointer"
              >
                <span>Commencer à apprendre</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              {onOpenMethodology ? (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={onOpenMethodology}
                  className="gap-2 font-semibold border-black/15 dark:border-white/15 hover:border-[#10B981] cursor-pointer text-xs"
                >
                  <Sparkles className="h-4 w-4 text-[#10B981]" />
                  <span>Découvrir la méthode</span>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleScrollToCourses}
                  className="gap-2 font-semibold border-black/15 dark:border-white/15 hover:border-[#10B981] cursor-pointer text-xs"
                >
                  <Compass className="h-4 w-4 text-[#10B981]" />
                  <span>Explorer les modules</span>
                </Button>
              )}
            </div>
          </div>

          {/* Right Column: 3D Interactive Multi-Module Command Deck */}
          <div className="lg:col-span-5 relative z-10 pointer-events-auto mt-4 lg:mt-0">
            <React.Suspense fallback={<div className="h-[340px] w-full rounded-3xl bg-black/5 dark:bg-white/5 animate-pulse" />}>
              <Hero3DScene />
            </React.Suspense>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. THE 4-PHASE LEARNING SYSTEM (PILLARS)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto space-y-6 defer-render">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>La Boucle Pédagogique Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] dark:text-white tracking-tight">
            Comment fonctionne l'apprentissage
          </h2>
          <p className="text-xs sm:text-sm text-[#0A0A0A]/60 dark:text-white/60">
            Une méthode pragmatique qui te guide pas à pas vers la maîtrise sans mémorisation passive.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {learningPillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] flex flex-col justify-between shadow-xs hover:border-[#10B981] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-10 w-10 rounded-2xl bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#0A0A0A]/40 dark:text-white/40">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#0A0A0A] dark:text-white mb-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#0A0A0A]/70 dark:text-white/70 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 text-[11px] font-mono font-semibold text-[#10B981]">
                  {p.badge}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. 4 CARDS IN 2x2 GRID (2 IN ROW, DECREASED HEIGHT, SLEEK UI)
          ═══════════════════════════════════════════════════════════════ */}
      <section id="courses-catalogue-section" className="max-w-7xl mx-auto space-y-5 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#10B981] uppercase tracking-wider mb-1 font-mono">
              <BookOpen className="h-3.5 w-3.5 text-[#10B981]" />
              <span>Curriculum Officiel · 2ème Année</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] dark:text-white tracking-tight">
              Catalogue des Matières & Simulateurs
            </h2>
            <p className="text-xs sm:text-sm text-[#0A0A0A]/70 dark:text-white/70 mt-1 max-w-2xl">
              Chaque module correspond au référentiel officiel OFPPT. L'Approche Agile et React.js sont débloqués et prêts pour l'entraînement.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-bold">
              <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
              2 Ouverts
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 border border-red-500/30 font-bold">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              2 Fermés
            </span>
          </div>
        </div>

        {/* 2 Cards in a Row Grid (Total 4 Cards, Decreased Height) */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
          {catalogueModules.map((mod) => {
            const Icon = mod.icon;
            const isAvailable = mod.status === 'available';

            return (
              <div
                key={mod.id}
                onClick={() => {
                  if (isAvailable) {
                    if (mod.id === 'react' && onSelectReact) {
                      onSelectReact();
                    } else {
                      onSelectAgile();
                    }
                  }
                }}
                className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden bg-white dark:bg-[#0A0A0A] p-4 sm:p-5 shadow-xs ${
                  isAvailable
                    ? 'border-2 border-[#10B981] shadow-md shadow-[#10B981]/15 ring-1 ring-[#10B981]/30 cursor-pointer hover:scale-[1.008]'
                    : 'border-black/10 dark:border-white/10 opacity-90 hover:opacity-100'
                }`}
              >
                {/* Accent top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${mod.gradient}`} />

                {/* Subtle Background Watermark Logo (Desktop/Web only, hidden on mobile) */}
                <div className="hidden md:block absolute -right-6 -bottom-6 z-0 pointer-events-none select-none opacity-[0.07] dark:opacity-[0.12] text-[#10B981] group-hover:opacity-[0.18] dark:group-hover:opacity-[0.24] group-hover:scale-105 transition-all duration-300" aria-hidden="true">
                  <Icon className="h-40 w-40" />
                </div>

                {/* TOP-RIGHT RED / GREEN CIRCLE BADGE (HIGH Z-INDEX) */}
                <div className="absolute top-3.5 right-3.5 z-20">
                  {mod.isOpen ? (
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/40 text-[10px] font-bold font-mono shadow-xs">
                      <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                      <span>Ouvert</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/30 text-[10px] font-bold font-mono shadow-xs">
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      <span>Fermé</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2.5 pr-16">
                  {/* Icon & Category */}
                  <div className="flex items-center gap-2.5 pt-0.5">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${mod.gradient} text-white shadow-xs`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-black text-[#10B981] tracking-wider block">
                        {mod.category}
                      </span>
                      <span className="text-[10px] text-[#0A0A0A]/50 dark:text-white/50 font-medium">
                        {mod.stats}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0A0A0A] dark:text-white tracking-tight leading-snug">
                      {mod.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#0A0A0A]/70 dark:text-white/70 leading-relaxed mt-0.5 line-clamp-1">
                      {mod.description}
                    </p>
                  </div>
                </div>

                {/* Miniature Preview Box & Topics */}
                <div className="space-y-2 mt-2.5">
                  <div>{mod.preview}</div>

                  <div className="flex flex-wrap gap-1">
                    {mod.topics.map((t, idx) => (
                      <span
                        key={idx}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-medium ${
                          isAvailable
                            ? 'bg-[#10B981]/10 text-[#0A0A0A] dark:text-white border border-[#10B981]/20'
                            : 'bg-black/[0.03] dark:bg-white/[0.05] text-[#0A0A0A]/60 dark:text-white/60 border border-black/10 dark:border-white/10'
                        }`}
                      >
                        <CheckCircle2 className={`h-2.5 w-2.5 shrink-0 ${isAvailable ? 'text-[#10B981]' : 'opacity-40'}`} />
                        <span>{t}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-2.5 border-t border-black/10 dark:border-white/10 mt-2.5">
                  {isAvailable ? (
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (mod.id === 'react' && onSelectReact) {
                          onSelectReact();
                        } else {
                          onSelectAgile();
                        }
                      }}
                      className="w-full justify-between font-bold text-xs shadow-sm shadow-[#10B981]/20 bg-[#10B981] hover:bg-[#22C55E] text-white cursor-pointer py-1.5"
                    >
                      <span>Accéder à la formation</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  ) : (
                    <div className="w-full flex items-center justify-between px-3 py-1 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-[10px] font-medium text-[#0A0A0A]/50 dark:text-white/50">
                      <span className="flex items-center gap-1.5">
                        <Lock className="h-3 w-3 opacity-60" />
                        <span>Module en cours de finalisation</span>
                      </span>
                      <span className="text-[10px] font-mono text-red-500 font-bold">Fermé</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Alignment Banner */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981]">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0A0A0A] dark:text-white tracking-tight">
                Alignement Pédagogique Officiel — Filière Développement Digital
              </h3>
              <p className="text-xs text-[#0A0A0A]/70 dark:text-white/70 mt-0.5 max-w-2xl leading-relaxed">
                Les modules respectent rigoureusement les compétences requises par le programme marocain.
                L'Approche Agile et React.js sont prêts pour l'entraînement intensif avec tous les barèmes de calculs, exercices interactifs et QCMs.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {onSelectReact && (
              <Button
                variant="primary"
                onClick={onSelectReact}
                className="gap-2 font-bold text-xs shadow-sm shadow-[#10B981]/20 bg-[#10B981] hover:bg-[#22C55E] text-white cursor-pointer"
              >
                <span>Démarrer avec React.js</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="outline"
              onClick={onSelectAgile}
              className="gap-2 font-bold text-xs border-[#10B981]/30 hover:border-[#10B981] cursor-pointer"
            >
              <span>Démarrer Approche Agile</span>
              <ArrowRight className="h-4 w-4 text-[#10B981]" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

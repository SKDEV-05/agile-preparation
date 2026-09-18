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
import logoImg from '../../assets/logo.webp';

const Hero3DScene = React.lazy(() => import('../../components/3d/Hero3DScene').then(m => ({ default: m.Hero3DScene })));

interface CurriculumHubProps {
  onSelectAgile: () => void;
  onOpenMethodology?: () => void;
}

export function CurriculumHub({ onSelectAgile, onOpenMethodology }: CurriculumHubProps) {
  // Exactly 4 Official Modules
  const catalogueModules = [
    {
      id: 'agile',
      title: 'Approche Agile & Gestion de Projet',
      shortCode: 'M201',
      status: 'available' as const,
      isOpen: true,
      description: 'Méthodologies prédictives vs agiles, calculs PERT & Gantt, Scrum, Jira, Git 4 zones et GitLab CI/CD.',
      icon: Zap,
      gradient: 'from-[#10B981] to-[#22C55E]',
      topics: ['Cycle en V vs Agile', 'Calculs PERT & Marges', 'Scrum & Jira', 'GitLab CI/CD'],
      stats: '5 Parties · 20 Chapitres · 200 QCM',
      preview: (
        <div className="rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 p-2 font-mono text-[9px]">
          <div className="flex items-center justify-between text-[#10B981] font-bold pb-1 mb-1 border-b border-black/10 dark:border-white/10">
            <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-[#10B981]" /> Scrum Board Live</span>
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
      shortCode: 'M202',
      status: 'upcoming' as const,
      isOpen: false,
      description: 'Composants fonctionnels, hooks avancés (useState, useEffect), Redux Toolkit, Router v6 et API REST.',
      icon: Code2,
      gradient: 'from-[#22C55E] to-[#10B981]',
      topics: ['JSX & Virtual DOM', 'Hooks & State', 'Redux Toolkit', 'React Router v6'],
      stats: '6 Modules · 24 Chapitres · 150 QCM',
      preview: (
        <div className="rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 p-2 font-mono text-[9px]">
          <div className="flex items-center justify-between text-black/60 dark:text-white/60 pb-1 mb-1 border-b border-black/10 dark:border-white/10">
            <span className="flex items-center gap-1 font-bold text-black dark:text-white"><Code2 className="h-3 w-3 text-[#22C55E]" /> &lt;VirtualDOM /&gt;</span>
            <span className="text-[8px] text-[#10B981]">60 FPS ✓</span>
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
      shortCode: 'M203',
      status: 'upcoming' as const,
      isOpen: false,
      description: 'Architecture MVC en PHP 8, persistance Eloquent ORM, authentification Sanctum, migrations et tests unitaires.',
      icon: Server,
      gradient: 'from-[#10B981] via-[#22C55E] to-[#0A0A0A]',
      topics: ['Architecture MVC', 'Eloquent ORM', 'Sanctum Auth', 'Tests Pest'],
      stats: '5 Modules · 20 Chapitres · 160 QCM',
      preview: (
        <div className="rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 p-2 font-mono text-[9px]">
          <div className="flex items-center justify-between text-black/60 dark:text-white/60 pb-1 mb-1 border-b border-black/10 dark:border-white/10">
            <span className="flex items-center gap-1 font-bold text-black dark:text-white"><Server className="h-3 w-3 text-[#10B981]" /> api/v1/routes</span>
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
      title: 'SGBD, SQL Avancé & NoSQL',
      shortCode: 'M204',
      status: 'upcoming' as const,
      isOpen: false,
      description: 'Modélisation Merise (MCD/MLD), requêtes SQL complexes, index B-Tree, transactions ACID et MongoDB NoSQL.',
      icon: Database,
      gradient: 'from-[#22C55E] to-[#10B981]',
      topics: ['Merise MCD & MLD', 'SQL Jointures & Index', 'Transactions ACID', 'MongoDB NoSQL'],
      stats: '4 Modules · 16 Chapitres · 140 QCM',
      preview: (
        <div className="rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 p-2 font-mono text-[9px]">
          <div className="flex items-center justify-between text-black/60 dark:text-white/60 pb-1 mb-1 border-b border-black/10 dark:border-white/10">
            <span className="flex items-center gap-1 font-bold text-black dark:text-white"><Database className="h-3 w-3 text-[#10B981]" /> db_ofppt.sql</span>
            <span className="text-[8px] text-[#10B981]">ACID ✓</span>
          </div>
          <div className="bg-white dark:bg-[#0A0A0A] p-1 rounded border border-black/10 dark:border-white/10 text-[8px] space-y-0.5">
            <div><span className="text-[#22C55E] font-bold">SELECT</span> * <span className="text-[#10B981]">FROM</span> stagiaires;</div>
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
              <img
                src={logoImg}
                alt="Logo FullStack 2A"
                width={18}
                height={18}
                className="h-4.5 w-4.5 sm:h-5 sm:w-5 rounded-md object-cover ring-1 ring-[#10B981]/40 shrink-0"
              />
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
              Chaque module correspond au référentiel officiel OFPPT. L'Approche Agile (M201) est débloquée et prête à être étudiée.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-bold">
              <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
              1 Ouvert
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 border border-red-500/30 font-bold">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              3 Fermés
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
                className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden bg-white dark:bg-[#0A0A0A] p-4 sm:p-5 shadow-xs ${
                  isAvailable
                    ? 'border-2 border-[#10B981] shadow-md shadow-[#10B981]/15 ring-1 ring-[#10B981]/30'
                    : 'border-black/10 dark:border-white/10 opacity-90 hover:opacity-100'
                }`}
              >
                {/* Accent top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${mod.gradient}`} />

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
                  {/* Icon & Code */}
                  <div className="flex items-center gap-2.5 pt-0.5">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${mod.gradient} text-white shadow-xs`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-black text-[#10B981] tracking-wider block">
                        {mod.shortCode}
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
                      onClick={onSelectAgile}
                      className="w-full justify-between font-bold text-xs shadow-sm shadow-[#10B981]/20 bg-[#10B981] hover:bg-[#22C55E] text-white cursor-pointer py-1.5"
                    >
                      <span>Accéder au module M201</span>
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
                L'Approche Agile (M201) est prête pour l'entraînement intensif avec tous les barèmes de calculs (PERT, Marges, Scrum).
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={onSelectAgile}
            className="shrink-0 gap-2 font-bold text-xs shadow-sm shadow-[#10B981]/20 bg-[#10B981] hover:bg-[#22C55E] text-white cursor-pointer"
          >
            <span>Démarrer avec Approche Agile</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}

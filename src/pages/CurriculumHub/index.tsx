import React, { useState } from 'react';
import { 
  Zap, 
  Code2, 
  Server, 
  Database, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  FlaskConical, 
  Award, 
  ChevronRight,
  Terminal,
  ShieldCheck,
  Compass,
  Laptop
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Hero3DScene } from '../../components/3d/Hero3DScene';
import logoImg from '../../assets/logo.webp';

interface CurriculumHubProps {
  onSelectAgile: () => void;
}

export function CurriculumHub({ onSelectAgile }: CurriculumHubProps) {
  const [hoveredModuleId, setHoveredModuleId] = useState<string | null>(null);

  const modules = [
    {
      id: 'agile',
      title: 'Approche Agile & Gestion de Projet',
      shortCode: 'M201',
      status: 'available',
      badgeText: 'Disponible maintenant',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      difficulty: 'Intermédiaire',
      difficultyColor: 'text-amber-400',
      description: 'Le socle méthodologique complet : Fondamentaux prédictifs vs agiles, calculs de réseaux PERT & Gantt, framework Scrum, outils Jira, Git & GitLab, et pipelines DevOps CI/CD.',
      icon: Zap,
      gradient: 'from-indigo-600 via-purple-600 to-pink-500',
      borderGlow: 'hover:border-indigo-500/50 hover:shadow-[0_0_35px_rgba(99,102,241,0.25)]',
      topics: [
        'Cycle en V, Cascade & Manifeste Agile',
        'Calcul PERT, Dates au plus tôt/tard, Marges & Chemin Critique',
        'Scrum : Rôles (PO/SM/Dev), Cérémonies & Definition of Done',
        'User Stories INVEST, Story Points, Fibonacci & Board Jira',
        'Git 4 Zones, Conflits de Merge & Qualité SonarQube',
        'Culture CALMS, Pipelines .gitlab-ci.yml & Runners'
      ],
      stats: {
        parts: '5 Parties',
        lessons: '20 Chapitres',
        questions: '200 QCM',
        labs: '5 Labs Simus',
        exam: '50 QCM Examen'
      },
      preview3D: (
        <div className="rounded-xl bg-slate-900/90 border border-indigo-500/40 p-3 shadow-lg transform-style-preserve-3d animate-float-subtle">
          <div className="flex items-center justify-between text-[10px] text-indigo-300 font-bold mb-2 pb-1 border-b border-white/10">
            <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-amber-400" /> Scrum Board</span>
            <span className="text-emerald-400 text-[9px]">En cours</span>
          </div>
          <div className="grid grid-cols-3 gap-1 text-[8px] font-mono">
            <div className="bg-slate-800/80 p-1.5 rounded border border-white/5 text-slate-400">
              <div className="font-bold text-slate-300 mb-0.5">To Do</div>
              <div className="bg-slate-700/60 p-1 rounded text-[7px] text-slate-300">PERT #01</div>
            </div>
            <div className="bg-indigo-950/40 p-1.5 rounded border border-indigo-500/30 text-indigo-200">
              <div className="font-bold text-indigo-400 mb-0.5">In Dev</div>
              <div className="bg-indigo-900/60 p-1 rounded text-[7px] text-white">Scrum #03</div>
            </div>
            <div className="bg-emerald-950/40 p-1.5 rounded border border-emerald-500/30 text-emerald-200">
              <div className="font-bold text-emerald-400 mb-0.5">Done</div>
              <div className="bg-emerald-900/60 p-1 rounded text-[7px] text-white">GitLab CI ✓</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'react',
      title: 'React.js & Frontend Moderne',
      shortCode: 'M202',
      status: 'upcoming',
      badgeText: 'Bientôt disponible',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      difficulty: 'Avancé',
      difficultyColor: 'text-rose-400',
      description: 'Développement d’interfaces réactives et performantes : composants fonctionnels, hooks avancés, gestion d’état globale et intégration d’APIs.',
      icon: Code2,
      gradient: 'from-cyan-500 via-blue-600 to-indigo-600',
      borderGlow: 'hover:border-cyan-500/50 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]',
      topics: [
        'JSX, Virtual DOM & Cycle de vie des composants',
        'Hooks fondamentaux (useState, useEffect, useMemo, useCallback)',
        'Custom Hooks & Gestion d’état avec Context API et Redux Toolkit',
        'Routage déclaratif avec React Router v6',
        'Consommation d’APIs REST & TanStack Query (React Query)',
        'Next.js 14+ (App Router, Server Components & SEO)'
      ],
      stats: {
        parts: '6 Modules',
        lessons: '24 Chapitres',
        questions: '150 QCM',
        labs: 'Playground',
        exam: 'Prochainement'
      },
      preview3D: (
        <div className="rounded-xl bg-slate-900/90 border border-cyan-500/40 p-3 shadow-lg font-mono text-[9px] text-cyan-300 transform-style-preserve-3d animate-float-subtle">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1.5 pb-1 border-b border-white/10">
            <Code2 className="h-3 w-3 text-cyan-400" />
            <span className="text-white font-bold">&lt;ComponentTree /&gt;</span>
          </div>
          <div className="space-y-1 text-slate-400 text-[8px]">
            <div><span className="text-purple-400">const</span> [state] = <span className="text-cyan-400">useState</span>();</div>
            <div><span className="text-purple-400">return</span> &lt;<span className="text-indigo-400">VirtualDOM</span> /&gt;</div>
            <div className="text-emerald-400 font-bold">Fast Refresh Active ✓</div>
          </div>
        </div>
      )
    },
    {
      id: 'laravel',
      title: 'Laravel & Architecture Backend APIs',
      shortCode: 'M203',
      status: 'upcoming',
      badgeText: 'Bientôt disponible',
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      difficulty: 'Avancé',
      difficultyColor: 'text-rose-400',
      description: 'Conception de backends robustes et sécurisés en PHP moderne : architecture MVC, persistance Eloquent ORM, sécurité et conception d’APIs RESTful.',
      icon: Server,
      gradient: 'from-rose-500 via-red-600 to-amber-500',
      borderGlow: 'hover:border-rose-500/50 hover:shadow-[0_0_35px_rgba(244,63,94,0.25)]',
      topics: [
        'Architecture MVC, Routing & Middlewares de sécurité',
        'Eloquent ORM : Modèles, Relations 1-N, N-N et Eager Loading',
        'Migrations, Seeders & Factories de données',
        'Authentification moderne : Laravel Breeze & Sanctum Tokens',
        'Conception d’APIs RESTful conformes aux standards JSON',
        'Tests automatisés unitaires et fonctionnels avec Pest / PHPUnit'
      ],
      stats: {
        parts: '5 Modules',
        lessons: '20 Chapitres',
        questions: '160 QCM',
        labs: 'API Sandbox',
        exam: 'Prochainement'
      },
      preview3D: (
        <div className="rounded-xl bg-slate-900/90 border border-rose-500/40 p-3 shadow-lg font-mono text-[9px] text-rose-300 transform-style-preserve-3d animate-float-subtle">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1.5 pb-1 border-b border-white/10">
            <Server className="h-3 w-3 text-rose-400" />
            <span className="text-white font-bold">api/v1/routes.php</span>
          </div>
          <div className="space-y-1 text-slate-400 text-[8px]">
            <div><span className="text-amber-400">Route::</span>get(<span className="text-emerald-400">'/stagiaires'</span>);</div>
            <div>Eloquent: <span className="text-rose-400">Stagiaire::with('notes')</span></div>
            <div className="text-emerald-400 font-bold">200 JSON Response ✓</div>
          </div>
        </div>
      )
    },
    {
      id: 'database',
      title: 'Gestion des Données & SGBD (SQL & NoSQL)',
      shortCode: 'M204',
      status: 'upcoming',
      badgeText: 'Bientôt disponible',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      difficulty: 'Intermédiaire',
      difficultyColor: 'text-amber-400',
      description: 'Modélisation, administration et requêtage avancé des bases de données relationnelles et documentaires pour applications web à forte charge.',
      icon: Database,
      gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
      borderGlow: 'hover:border-emerald-500/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.25)]',
      topics: [
        'Modélisation conceptuelle Merise (MCD, MLD, MPD)',
        'SQL Avancé : Jointures complexes, sous-requêtes, vues et CTE',
        'Procédures stockées, Déclencheurs (Triggers) et Transactions ACID',
        'Optimisation des performances : Index B-Tree et Explain Plan',
        'Bases de données NoSQL : Architecture et requêtes MongoDB',
        'Sécurité, Sauvegardes et Réplication haute disponibilité'
      ],
      stats: {
        parts: '4 Modules',
        lessons: '16 Chapitres',
        questions: '140 QCM',
        labs: 'Query Lab',
        exam: 'Prochainement'
      },
      preview3D: (
        <div className="rounded-xl bg-slate-900/90 border border-emerald-500/40 p-3 shadow-lg font-mono text-[9px] text-emerald-300 transform-style-preserve-3d animate-float-subtle">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1.5 pb-1 border-b border-white/10">
            <Database className="h-3 w-3 text-emerald-400" />
            <span className="text-white font-bold">db_ofppt_2a.sql</span>
          </div>
          <div className="space-y-1 text-slate-400 text-[8px]">
            <div><span className="text-indigo-400">SELECT</span> s.nom, p.score</div>
            <div><span className="text-indigo-400">FROM</span> stagiaires s <span className="text-indigo-400">JOIN</span> pert;</div>
            <div className="text-emerald-400 font-bold">Index B-Tree Cached ✓</div>
          </div>
        </div>
      )
    }
  ];

  const handleScrollToCourses = () => {
    const el = document.getElementById('courses-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-100 py-6 sm:py-10 px-4 sm:px-6 lg:px-8 space-y-16">
      {/* 1. MAJOR UX HERO SECTION */}
      <section className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-8 sm:pt-12 min-h-[520px] rounded-3xl overflow-hidden p-6 sm:p-10 border border-white/10 bg-[#0D1526]/60 backdrop-blur-xl shadow-2xl">
        {/* Left Side: Pitch & Official Branding */}
        <div className="lg:col-span-7 space-y-6 text-left relative z-10 pointer-events-auto">
          <div className="inline-flex items-center gap-2.5 rounded-full bg-slate-900/80 border border-indigo-500/30 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 shadow-inner backdrop-blur-md">
            <img 
              src={logoImg} 
              alt="Logo FullStack 2A" 
              width={20}
              height={20}
              fetchPriority="high"
              decoding="async"
              className="h-5 w-5 rounded-md object-cover ring-1 ring-indigo-400/50" 
            />
            <span>Cursus Développement Digital · 2ème Année</span>
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-ping"></span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              FULLSTACK <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400">2A</span>
            </h1>
            <p className="text-base sm:text-xl font-bold text-slate-300 tracking-tight">
              Plateforme de préparation — 2ème année Full Stack OFPPT
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl font-normal">
            L’environnement d’excellence conçu spécifiquement pour réussir tes examens de 2ème année : 
            cours synthétisés, <span className="text-slate-200 font-semibold">5 simulateurs interactifs (PERT, Gantt, Jira, Git, CI/CD)</span>, 
            explications 3D et plus de 200 QCM corrigés en conditions réelles.
          </p>

          {/* Value Badges */}
          <div className="flex flex-wrap gap-2.5 pt-1 text-xs">
            <span className="flex items-center gap-1.5 rounded-lg bg-slate-800/80 border border-white/10 px-3 py-1 text-slate-300">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Simulateurs Pratiques</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-slate-800/80 border border-white/10 px-3 py-1 text-slate-300">
              <Laptop className="h-3.5 w-3.5 text-cyan-400" />
              <span>Visualisations 3D</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-slate-800/80 border border-white/10 px-3 py-1 text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>200 QCM Conformes EFM</span>
            </span>
          </div>

          {/* Primary & Secondary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={onSelectAgile}
              className="gap-2.5 font-bold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>Commencer à apprendre</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleScrollToCourses}
              className="gap-2 border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white transition-all"
            >
              <Compass className="h-4 w-4 text-cyan-400" />
              <span>Explorer les cours</span>
            </Button>
          </div>
        </div>

        {/* Right Side: Interactive 3D Educational Scene */}
        <div className="lg:col-span-5 relative z-10 pointer-events-auto">
          <Hero3DScene />
        </div>
      </section>

      {/* 2. COURSE SELECTION MARKETPLACE (4 MODULES) */}
      <section id="courses-grid" className="max-w-7xl mx-auto space-y-8 pt-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Programme Pédagogique 2A</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Modules & Matières d'Examen
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Sélectionne ton module d’étude pour accéder aux cours rédigés, simulateurs dédiés et QCM d'entraînement.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-slate-300">1 Module Actif</span>
            <span>· 3 Modules en rédaction</span>
          </div>
        </div>

        {/* 4 Interactive Course Marketplace Cards */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {modules.map((mod) => {
            const Icon = mod.icon;
            const isAvailable = mod.status === 'available';
            const isHovered = hoveredModuleId === mod.id;

            return (
              <div
                key={mod.id}
                onMouseEnter={() => setHoveredModuleId(mod.id)}
                onMouseLeave={() => setHoveredModuleId(null)}
                className={`group relative rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden glass-card ${
                  isAvailable 
                    ? `border-indigo-500/30 ${mod.borderGlow} hover:-translate-y-1.5` 
                    : 'border-white/5 opacity-80 hover:opacity-100 hover:border-slate-700 hover:-translate-y-0.5'
                }`}
              >
                {/* Gradient accent top bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${mod.gradient}`}></div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    {/* Header with status and difficulty badge */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${mod.gradient} text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                            Module {mod.shortCode}
                          </span>
                          <span className="text-xs font-bold text-slate-200">
                            {mod.stats.parts} · {mod.stats.lessons}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${mod.badgeColor}`}>
                          {isAvailable ? (
                            <>
                              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                              <span>{mod.badgeText}</span>
                            </>
                          ) : (
                            <>
                              <Clock className="h-3 w-3 text-slate-400" />
                              <span>{mod.badgeText}</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-indigo-300 transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5">
                      {mod.description}
                    </p>

                    {/* Interactive 3D Miniature Box on Hover */}
                    <div className="mb-5 transition-all duration-300">
                      {mod.preview3D}
                    </div>

                    {/* Key Topics List */}
                    <div className="space-y-2 mb-4">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                        Programme examens couvert :
                      </span>
                      <ul className="space-y-1.5">
                        {mod.topics.map((top, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${isAvailable ? 'text-indigo-400' : 'text-slate-500'}`} />
                            <span className="leading-snug">{top}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer & Action Button */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-[11px] font-medium text-slate-400">
                        {isAvailable ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                            <span>200 QCM Corrigés + 5 Simulateurs</span>
                          </span>
                        ) : (
                          <span className="text-slate-500 italic">
                            En cours de finalisation
                          </span>
                        )}
                      </div>

                      {isAvailable ? (
                        <Button
                          variant="primary"
                          onClick={onSelectAgile}
                          className="gap-2 font-bold shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all text-xs"
                        >
                          <span>Accéder au module</span>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          disabled
                          className="opacity-40 cursor-not-allowed text-xs font-semibold border-slate-700 bg-slate-900/40 text-slate-400"
                        >
                          <span>Bientôt disponible</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner: OFPPT Curriculum Architecture */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-cyan-950/40 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 shadow-md">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Alignement Pédagogique Officiel — Filière Développement Digital
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Les modules respectent rigoureusement les compétences requises par le programme marocain. 
                L'Approche Agile (M201) est prête pour l'entraînement intensif avec tous les barèmes de calculs (PERT, Marges, Scrum).
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={onSelectAgile}
            className="shrink-0 gap-2 font-bold text-xs"
          >
            <span>Démarrer avec Approche Agile</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}

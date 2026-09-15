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
  ChevronRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import logoImg from '../../assets/logo.jpg';

interface CurriculumHubProps {
  onSelectAgile: () => void;
}

export function CurriculumHub({ onSelectAgile }: CurriculumHubProps) {

  const modules = [
    {
      id: 'agile',
      title: 'Approche Agile & Gestion de Projet',
      shortCode: 'M201',
      status: 'available',
      badgeText: 'Disponible maintenant',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: 'Le socle méthodologique complet : Fondamentaux, Planification Gantt & PERT, Framework Scrum, Outils Jira, Git & GitLab, et DevOps CI/CD.',
      icon: Zap,
      gradient: 'from-indigo-600 via-purple-600 to-pink-500',
      glowColor: 'group-hover:shadow-indigo-500/20',
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
        questions: '200 QCM',
        labs: '5 Simulateurs',
        features: '3D + Vidéos FR/EN'
      }
    },
    {
      id: 'react',
      title: 'React.js & Frontend Moderne',
      shortCode: 'M202',
      status: 'upcoming',
      badgeText: 'Bientôt disponible',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
      description: 'Développement d’interfaces réactives et performantes : composants fonctionnels, hooks avancés, gestion d’état globale et intégration d’APIs.',
      icon: Code2,
      gradient: 'from-cyan-500 via-blue-600 to-indigo-600',
      glowColor: 'group-hover:shadow-cyan-500/20',
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
        questions: '150 QCM',
        labs: 'Code Playground',
        features: 'En cours de rédaction'
      }
    },
    {
      id: 'laravel',
      title: 'Laravel & Architecture Backend APIs',
      shortCode: 'M203',
      status: 'upcoming',
      badgeText: 'Bientôt disponible',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      description: 'Conception de backends robustes et sécurisés en PHP moderne : architecture MVC, persistance Eloquent ORM, sécurité et conception d’APIs RESTful.',
      icon: Server,
      gradient: 'from-rose-500 via-red-600 to-amber-500',
      glowColor: 'group-hover:shadow-rose-500/20',
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
        questions: '160 QCM',
        labs: 'API Sandbox',
        features: 'En cours de rédaction'
      }
    },
    {
      id: 'database',
      title: 'Gestion des Données & SGBD (SQL & NoSQL)',
      shortCode: 'M204',
      status: 'upcoming',
      badgeText: 'Bientôt disponible',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: 'Modélisation, administration et requêtage avancé des bases de données relationnelles et documentaires pour applications web à forte charge.',
      icon: Database,
      gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
      glowColor: 'group-hover:shadow-emerald-500/20',
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
        questions: '140 QCM',
        labs: 'Query Lab',
        features: 'En cours de rédaction'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section with Brand Logo */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-1.5 shadow-sm border border-slate-200">
            <img 
              src={logoImg} 
              alt="Full Stack Web Master Logo" 
              className="h-6 w-6 rounded-md object-cover shadow-xs"
            />
            <span className="text-xs font-bold text-slate-800 tracking-wide">
              Cursus Développement Digital · Option Full Stack Web
            </span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-extrabold text-primary uppercase">
              2ème Année
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative mb-3">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 opacity-20 blur-xl"></div>
              <img 
                src={logoImg} 
                alt="Full Stack Web Master Logo" 
                className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl shadow-xl border-2 border-white object-cover"
              />
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Full Stack Web <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">Master</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            Plateforme d’excellence pour réviser et réussir les examens de 2ème année : 
            cours interactifs, simulateurs temps réel, explications 3D et QCM d’entraînement.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5 bg-slate-100/80 px-3 py-1.5 rounded-xl">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Simulateurs Pratiques
            </span>
            <span className="flex items-center gap-1.5 bg-slate-100/80 px-3 py-1.5 rounded-xl">
              <Layers className="h-3.5 w-3.5 text-teal-600" />
              Modèles Visuels 3D
            </span>
            <span className="flex items-center gap-1.5 bg-slate-100/80 px-3 py-1.5 rounded-xl">
              <Award className="h-3.5 w-3.5 text-amber-500" />
              Cas Réels d’Entreprise
            </span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {modules.map((mod) => {
            const Icon = mod.icon;
            const isAvailable = mod.status === 'available';

            return (
              <div
                key={mod.id}
                className={`group relative rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden bg-white shadow-card hover:shadow-xl ${
                  isAvailable 
                    ? 'border-indigo-300 ring-2 ring-indigo-500/10 hover:-translate-y-1' 
                    : 'border-slate-200/90 opacity-95 hover:-translate-y-0.5'
                }`}
              >
                {/* Gradient accent top bar */}
                <div className={`h-2 w-full bg-gradient-to-r ${mod.gradient}`}></div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header with status badge */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${mod.gradient} text-white shadow-md`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                            Module {mod.shortCode}
                          </span>
                          <span className="text-xs font-extrabold text-slate-700">
                            {mod.stats.parts}
                          </span>
                        </div>
                      </div>

                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${mod.badgeColor}`}>
                        {isAvailable ? (
                          <>
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
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

                    {/* Title & Description */}
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2.5">
                      {mod.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                      {mod.description}
                    </p>

                    {/* Key Topics List */}
                    <div className="space-y-2 mb-6">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        Programme couvert :
                      </span>
                      <ul className="space-y-1.5">
                        {mod.topics.map((top, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${isAvailable ? 'text-indigo-600' : 'text-slate-400'}`} />
                            <span className="leading-snug">{top}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer & Action Button */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-[11px] font-medium text-slate-500">
                        {isAvailable ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <Sparkles className="h-3 w-3" /> 200 QCM Corrigés + Simulateurs
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">
                            Publication prochaine
                          </span>
                        )}
                      </div>

                      {isAvailable ? (
                        <Button
                          variant="primary"
                          onClick={onSelectAgile}
                          className="gap-2 font-bold shadow-md hover:shadow-lg transition-all"
                        >
                          <span>Accéder au module</span>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          disabled
                          className="opacity-60 cursor-not-allowed text-xs font-semibold"
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

        {/* Global Track Roadmap / Notification Banner */}
        <div className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50/70 via-white to-teal-50/70 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Cursus Officiel 2ème Année · Filière Développement Digital
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Le module <b>Approche Agile</b> est actuellement 100% opérationnel avec tous ses cours, 
                cas d'entreprises marocaines, visualisations 3D, vidéos et simulateurs. 
                Les modules <b>React.js</b>, <b>Laravel</b> et <b>Gestion des Données</b> sont en cours de déploiement progressif.
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={onSelectAgile}
            className="w-full md:w-auto shrink-0 gap-2 font-bold shadow-sm"
          >
            <span>Lancer la préparation Agile</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

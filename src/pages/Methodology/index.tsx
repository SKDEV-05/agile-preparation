import React, { useState } from 'react';
import { 
  BookOpen, 
  Lightbulb, 
  FlaskConical, 
  Award, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Sparkles,
  Code2,
  Zap,
  Layers,
  Server,
  Database
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { PartId } from '../../types';
import { ActiveView } from '../../components/layout/Sidebar';

interface MethodologyPageProps {
  onNavigate: (view: ActiveView, partId?: PartId) => void;
}

export function MethodologyPage({ onNavigate }: MethodologyPageProps) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Découvrir : Synthèses claires sans surcharge',
      category: 'Learn',
      icon: BookOpen,
      badge: 'Synthèses Modulaires 2A',
      summary: 'Des fiches de cours structurées en concepts concis et précis. Nous éliminons les pavés théoriques pour aller directement aux notions et règles exigées par le référentiel OFPPT.',
      details: [
        'React & Front-End : Architecture SPA, Virtual DOM, JSX, Hooks (useState, useEffect) et flux Redux Toolkit',
        'Approche Agile & DevOps : Cycle de vie informatique, calculs PERT/Gantt, Scrum, Jira, Git 4 zones et CI/CD',
        'Définitions officielles exactes et mémos « En clair » pour assimiler vite et sans ambiguïté'
      ],
      actions: [
        { label: 'Découvrir React.js', action: () => onNavigate('react-dashboard'), primary: true },
        { label: 'Découvrir Approche Agile', action: () => onNavigate('dashboard') }
      ]
    },
    {
      number: '02',
      title: 'Comprendre : Visualisations interactives et schémas 3D',
      category: 'Understand',
      icon: Lightbulb,
      badge: 'Visualiseurs Graphiques',
      summary: 'Les concepts complexes prennent vie grâce à nos composants visuels interactifs : visualisez l’arborescence des composants React, le graphe PERT ou le flux des branches Git.',
      details: [
        'React Props & State Tree : Visualisez le passage des données de parent à enfant en temps réel',
        'Réseau PERT & Gantt : Visualisez le chemin critique et les marges libres/totales instantanément',
        'Architecture Git 4 Zones : Visualisez Working Directory, Staging, Local Repo et Remote Repo'
      ],
      actions: [
        { label: 'Explorer le cours React', action: () => onNavigate('react-module1') },
        { label: 'Explorer le cours Agile', action: () => onNavigate('part3') }
      ]
    },
    {
      number: '03',
      title: 'Pratiquer : Simulateurs temps réel et code en direct',
      category: 'Practice',
      icon: FlaskConical,
      badge: 'Laboratoires & Playground',
      summary: 'Ne restez jamais simple spectateur du cours. Manipulez du code réel, observez les rendus instantanés et testez vos réflexes sur nos simulateurs professionnels.',
      details: [
        'Playground React Live : Écrivez du JSX avec useState, compilez instantanément et visualisez le rendu',
        '7 Ateliers Pratiques React : Corrigez des bugs réels, configurez Redux et gérez les cycles de vie',
        '5 Simulateurs Agiles : Calculez le réseau PERT, pilotez le Scrum Board et exécutez des pipelines CI/CD'
      ],
      actions: [
        { label: 'Ouvrir le Playground React', action: () => onNavigate('react-playground'), primary: true },
        { label: 'Simulateurs Agiles', action: () => onNavigate('simulators') }
      ]
    },
    {
      number: '04',
      title: 'Évaluer : 320+ QCM corrigés aux barèmes officiels',
      category: 'Test',
      icon: Award,
      badge: 'Banque Officielle EFM',
      summary: 'Validez votre compréhension avec des questions à choix multiples rédigées selon les standards des épreuves de fin de module (EFM) et examens nationaux OFPPT.',
      details: [
        'React : 120+ QCM couvrant les 8 modules de cours avec barèmes et explications détaillées',
        'Approche Agile : 200 QCM couvrant les 5 parties clés avec justification pédagogique pour chaque option',
        'Navigation rapide au clavier (touches 1 à 4 et Entrée) pour des entraînements intensifs'
      ],
      actions: [
        { label: 'QCM React Module 1', action: () => onNavigate('react-module1') },
        { label: 'QCM Agile Partie 1', action: () => onNavigate('part1') }
      ]
    },
    {
      number: '05',
      title: 'Réviser : Carnet d’erreurs et flashcards 3D intelligentes',
      category: 'Review',
      icon: AlertTriangle,
      badge: 'Zéro Faiblesse à l’Examen',
      summary: 'Chaque question ratée est automatiquement enregistrée dans votre carnet d’erreurs personnel. Rejouez des sessions ciblées jusqu’à atteindre 100% de maîtrise.',
      details: [
        'Carnet d’erreurs dédié pour chaque matière (React et Agile) avec analyse de vos points faibles',
        'Sessions de rattrapage ciblées uniquement sur vos questions erronées',
        'Flashcards 3D interactives pour mémoriser rapidement le vocabulaire et les formules clés'
      ],
      actions: [
        { label: 'Flashcards React 3D', action: () => onNavigate('react-flashcards'), primary: true },
        { label: 'Flashcards Agile 3D', action: () => onNavigate('flashcards') }
      ]
    },
    {
      number: '06',
      title: 'Progresser : Examens blancs chronométrés',
      category: 'Progress',
      icon: Sparkles,
      badge: 'Conditions Réelles EFM',
      summary: 'Mettez-vous dans les conditions réelles de l’épreuve officielle : compte à rebours, score sur 20 ou 50 points et bilan de compétences complet pour le jour J.',
      details: [
        'Examen Blanc React : 40 QCM chronométrés (40 min) avec ventilation par compétence',
        'Examen Blanc Agile : 50 QCM chronométrés (45 min) avec calcul de note prévisionnelle EFM',
        'Recommandations stratégiques personnalisées selon les thèmes à consolider avant l’examen'
      ],
      actions: [
        { label: 'Examen Blanc React (40 QCM)', action: () => onNavigate('react-final-exam'), primary: true },
        { label: 'Examen Blanc Agile (50 QCM)', action: () => onNavigate('final-exam') }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-2 sm:py-4 space-y-6 sm:space-y-10 select-none">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('curriculum-hub')}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] text-xs font-bold text-[#0A0A0A] dark:text-white hover:border-[#10B981] hover:text-[#10B981] transition-all cursor-pointer shadow-xs active:scale-95"
        >
          <ArrowLeft className="h-4 w-4 text-[#10B981]" />
          <span>Retour à l’accueil des modules</span>
        </button>

        <span className="text-xs font-mono text-[#0A0A0A]/50 dark:text-white/50 hidden sm:inline">
          Guide Pédagogique 2A · OFPPT
        </span>
      </div>

      {/* Hero Header */}
      <section className="relative rounded-3xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] p-6 sm:p-10 shadow-xl overflow-hidden">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#10B981]/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 -bottom-20 h-64 w-64 rounded-full bg-[#22C55E]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 px-3.5 py-1 text-xs font-mono font-bold text-[#10B981]">
            <Sparkles className="h-3.5 w-3.5 text-[#10B981]" />
            <span>MÉTHODE D’EXCELLENCE · CURSUS DIGITAL 2A</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0A0A0A] dark:text-white leading-tight">
            Comment apprendre avec méthode et réussir tes examens.
          </h1>

          <p className="text-xs sm:text-sm text-[#0A0A0A]/70 dark:text-white/70 leading-relaxed font-normal">
            Apprendre ne consiste pas à lire passivement des dizaines de pages de diapositives. 
            La méthode FullStack 2A s'applique à l'ensemble du programme (React, Agile & DevOps, Laravel, SGBD) et repose sur une boucle active en 6 étapes : 
            <b className="text-[#0A0A0A] dark:text-white block mt-1">
              Découvrir ➔ Comprendre ➔ Pratiquer ➔ Évaluer ➔ Réviser ses erreurs ➔ Valider l'Examen.
            </b>
          </p>

          {/* Quick Launch Switcher for Active Modules */}
          <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('react-dashboard')}
              className="gap-2 font-bold shadow-md shadow-[#10B981]/20 bg-[#10B981] hover:bg-[#22C55E] text-white"
            >
              <Code2 className="h-4 w-4" />
              <span>Explorer React.js</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => onNavigate('dashboard')}
              className="gap-2 font-bold border-[#10B981]/30 hover:border-[#10B981]"
            >
              <Zap className="h-4 w-4 text-[#10B981]" />
              <span>Explorer Approche Agile</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => onNavigate('curriculum-hub')}
              className="gap-2 font-semibold"
            >
              <Layers className="h-4 w-4 text-[#10B981]" />
              <span>Tous les modules 2A</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Curriculum Overview Strip */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] shadow-xs">
          <div className="flex items-center gap-2 text-[#10B981] mb-1 font-bold text-xs">
            <Code2 className="h-4 w-4" />
            <span>React &amp; Redux</span>
          </div>
          <div className="text-[11px] text-[#0A0A0A]/70 dark:text-white/70">8 Modules · 7 Labs · 120+ QCM</div>
        </div>

        <div className="p-3.5 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] shadow-xs">
          <div className="flex items-center gap-2 text-[#22C55E] mb-1 font-bold text-xs">
            <Zap className="h-4 w-4" />
            <span>Agile &amp; DevOps</span>
          </div>
          <div className="text-[11px] text-[#0A0A0A]/70 dark:text-white/70">5 Parties · 5 Labs · 200 QCM</div>
        </div>

        <div className="p-3.5 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] shadow-xs">
          <div className="flex items-center gap-2 text-[#10B981] mb-1 font-bold text-xs">
            <Server className="h-4 w-4" />
            <span>Laravel REST</span>
          </div>
          <div className="text-[11px] text-[#0A0A0A]/70 dark:text-white/70">MVC · Eloquent · Sanctum</div>
        </div>

        <div className="p-3.5 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] shadow-xs">
          <div className="flex items-center gap-2 text-[#22C55E] mb-1 font-bold text-xs">
            <Database className="h-4 w-4" />
            <span>SGBD &amp; SQL</span>
          </div>
          <div className="text-[11px] text-[#0A0A0A]/70 dark:text-white/70">Merise · Index · ACID</div>
        </div>
      </section>

      {/* Interactive Step Navigator */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-black/15 dark:border-white/15 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0A] dark:text-white tracking-tight">
              La Boucle d’Apprentissage Actif en 6 Étapes
            </h2>
            <p className="text-xs text-[#0A0A0A]/60 dark:text-white/60 mt-0.5">
              Cette méthodologie est appliquée de façon uniforme sur chaque matière de 2ème année
            </p>
          </div>
          <Badge variant="outline" size="sm" className="hidden sm:inline-flex">
            Boucle Active 2A
          </Badge>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            const isCurrent = activeStep === idx;

            return (
              <div
                key={st.number}
                onClick={() => setActiveStep(idx)}
                className={`rounded-3xl border transition-all p-5 sm:p-6 flex flex-col justify-between cursor-pointer ${
                  isCurrent
                    ? 'border-[#10B981] bg-[#10B981]/5 shadow-md ring-1 ring-[#10B981]/30'
                    : 'border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] hover:border-[#10B981]/50 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs font-black px-2.5 py-1 rounded-xl flex items-center gap-1.5 ${
                        isCurrent 
                          ? 'bg-[#10B981] text-white' 
                          : 'bg-black/5 dark:bg-white/10 text-[#0A0A0A]/60 dark:text-white/60 border border-black/10 dark:border-white/10'
                      }`}>
                        <Icon className="h-3.5 w-3.5" />
                        <span>{st.number}</span>
                      </span>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#10B981]">
                        {st.category}
                      </span>
                    </div>

                    <Badge variant={isCurrent ? 'primary' : 'default'} size="sm">
                      {st.badge}
                    </Badge>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0A0A0A] dark:text-white tracking-tight mb-2">
                    {st.title}
                  </h3>

                  <p className="text-xs text-[#0A0A0A]/70 dark:text-white/70 leading-relaxed mb-4">
                    {st.summary}
                  </p>

                  <ul className="space-y-1.5 border-t border-black/10 dark:border-white/10 pt-3 mb-5 text-xs text-[#0A0A0A]/80 dark:text-white/80">
                    {st.details.map((dt, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                        <span className="leading-snug">{dt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-black/10 dark:border-white/10 flex flex-wrap gap-2">
                  {st.actions.map((act, aIdx) => (
                    <Button
                      key={aIdx}
                      variant={act.primary ? 'primary' : 'outline'}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        act.action();
                      }}
                      className="flex-1 justify-between text-xs font-bold min-w-[140px]"
                    >
                      <span className="truncate">{act.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1 shrink-0" />
                    </Button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Recommendation Footer */}
      <section className="rounded-3xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#0A0A0A] dark:text-white">
              Prêt à démarrer ta session d’entraînement ?
            </h3>
            <p className="text-xs sm:text-sm text-[#0A0A0A]/70 dark:text-white/70 mt-1 max-w-xl leading-relaxed">
              Consacre 15 à 30 minutes par jour : commence par un concept clé, pratique sur un simulateur interactif et résous le QCM associé.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
          <Button
            variant="primary"
            size="lg"
            onClick={() => onNavigate('react-dashboard')}
            className="gap-2 font-bold flex-1 sm:flex-initial justify-center shadow-sm shadow-[#10B981]/20 bg-[#10B981] hover:bg-[#22C55E] text-white"
          >
            <Code2 className="h-4 w-4" />
            <span>React.js</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => onNavigate('dashboard')}
            className="gap-2 font-bold flex-1 sm:flex-initial justify-center border-[#10B981]/30 hover:border-[#10B981]"
          >
            <Zap className="h-4 w-4 text-[#10B981]" />
            <span>Agile</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}

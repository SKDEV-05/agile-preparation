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
  Sparkles
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
      title: 'Apprendre l’essentiel sans surcharge',
      category: 'Learn',
      icon: BookOpen,
      badge: 'Cours Synthétisés',
      summary: 'Des leçons modulaires structurées en concepts courts, éliminant les pavés théoriques au profit des notions exactes exigées par le référentiel OFPPT.',
      details: [
        'Définitions officielles exactes pour les questions directes',
        'Explications vulgarisées (« En clair ») avec métaphores parlantes',
        'Synthèse des pièges récurrents posés lors des épreuves'
      ],
      ctaLabel: 'Ouvrir la Partie 1 (Fondamentaux)',
      ctaAction: () => onNavigate('part1')
    },
    {
      number: '02',
      title: 'Comprendre par l’image et l’exemple',
      category: 'Understand',
      icon: Lightbulb,
      badge: 'Visualisations & Schémas 3D',
      summary: 'Les concepts abstraits (cycle en V vs Agile, calculs de marges, 4 zones Git) deviennent clairs grâce aux diagrammes vectoriels et études de cas concrètes.',
      details: [
        'Diagrammes de flux clairs et visualisations interactives 3D',
        'Cas réels d’entreprises (défi, solution Agile, résultats mesurés)',
        'Fiches synthèses et mémos visuels pour retenir vite et durablement'
      ],
      ctaLabel: 'Découvrir les Cas Pratiques',
      ctaAction: () => onNavigate('part3')
    },
    {
      number: '03',
      title: 'Manipuler sur 5 simulateurs professionnels',
      category: 'Practice',
      icon: FlaskConical,
      badge: 'Laboratoire Pratique',
      summary: 'Ne reste pas spectateur de la théorie : calcule le réseau PERT, pilote un Kanban Jira, écris des commandes Git et déclenche un pipeline GitLab CI.',
      details: [
        'PERT Lab : recalcul dynamique des dates au plus tôt/tard et chemin critique',
        'Gantt Planning : ajustement des curseurs de durées et impact calendrier',
        'Git CLI : simulation interactive des 4 zones avec terminal dédié'
      ],
      ctaLabel: 'Accéder aux 5 Simulateurs',
      ctaAction: () => onNavigate('simulators')
    },
    {
      number: '04',
      title: 'Tester sa maîtrise en conditions réelles',
      category: 'Test',
      icon: Award,
      badge: '200 QCM Corrigés',
      summary: 'Entraîne-toi sur des QCM conformes aux examens officiels : 30 questions par module et un grand Examen Blanc de 50 questions minuté en 45 min.',
      details: [
        'Questions classées par niveau de difficulté et thématiques',
        'Raccourcis clavier (touches 1 à 4 et Entrée) pour une session fluide',
        'Chaque mauvaise réponse t’explique le « Pourquoi » pédagogique'
      ],
      ctaLabel: 'Lancer un QCM d’évaluation',
      ctaAction: () => onNavigate('part2')
    },
    {
      number: '05',
      title: 'Transformer ses erreurs en points',
      category: 'Review',
      icon: AlertTriangle,
      badge: 'Carnet de Rattrapage',
      summary: 'La plupart des étudiants refont les mêmes erreurs le jour de l’examen. Le système consigne automatiquement chaque réponse manquée dans ton carnet personnalisé.',
      details: [
        'Suivi précis des questions erronées dans « Mes Erreurs »',
        'Rejoue un quiz ciblé uniquement sur tes erreurs jusqu’à 100% de réussite',
        'Flashcards 3D pour la mémorisation rapide des définitions clés'
      ],
      ctaLabel: 'Consulter mon Carnet d’Erreurs',
      ctaAction: () => onNavigate('errors')
    },
    {
      number: '06',
      title: 'Valider l’Examen Officiel avec sérénité',
      category: 'Progress',
      icon: Sparkles,
      badge: 'Examen Blanc 50 QCM',
      summary: 'Une fois les 5 modules travaillés, passe le grand Examen Blanc pour valider ta note prévisionnelle et identifier tes derniers points faibles.',
      details: [
        'Barème officiel de notation sur 50 points',
        'Ventilation des résultats module par module (Parties 1 à 5)',
        'Recommandation ciblée de révision avant le jour J'
      ],
      ctaLabel: 'Lancer l’Examen Blanc EFM',
      ctaAction: () => onNavigate('final-exam')
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

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 px-3.5 py-1 text-xs font-mono font-bold text-[#10B981]">
            <Sparkles className="h-3.5 w-3.5 text-[#10B981]" />
            <span>MÉTHODE D’EXCELLENCE · FULLSTACK 2A</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0A0A0A] dark:text-white leading-tight">
            Comment apprendre et réussir ton examen en 2026.
          </h1>

          <p className="text-xs sm:text-sm text-[#0A0A0A]/70 dark:text-white/70 leading-relaxed font-normal">
            Apprendre ne consiste pas à lire passivement des dizaines de pages de PDF. 
            La méthode FullStack 2A repose sur une boucle active en 6 étapes : 
            <b className="text-[#0A0A0A] dark:text-white"> Découvrir ➔ Comprendre ➔ Pratiquer ➔ Évaluer ➔ Réviser ses erreurs ➔ Progresser.</b>
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('dashboard')}
              className="gap-2 font-bold"
            >
              <span>Accéder au module M201 (Agile)</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => onNavigate('curriculum-hub')}
              className="gap-2 font-semibold"
            >
              <ArrowLeft className="h-4 w-4 text-[#10B981]" />
              <span>Retour aux modules</span>
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => onNavigate('simulators')}
              className="gap-2"
            >
              <FlaskConical className="h-4 w-4 text-[#10B981]" />
              <span>Tester un simulateur</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Step Navigator */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-black/15 dark:border-white/15 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0A] dark:text-white tracking-tight">
              La Boucle d’Apprentissage Actif
            </h2>
            <p className="text-xs text-[#0A0A0A]/60 dark:text-white/60 mt-0.5">
              Clique sur une étape pour comprendre comment l’utiliser au quotidien
            </p>
          </div>
          <Badge variant="outline" size="sm" className="hidden sm:inline-flex">
            6 Étapes Clés
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
                className={`rounded-3xl border transition-all p-6 flex flex-col justify-between cursor-pointer ${
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

                <div className="pt-3 border-t border-black/10 dark:border-white/10">
                  <Button
                    variant={isCurrent ? 'primary' : 'outline'}
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      st.ctaAction();
                    }}
                    className="w-full justify-between text-xs font-bold"
                  >
                    <span>{st.ctaLabel}</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Summary Recommendation */}
      <section className="rounded-3xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#0A0A0A] dark:text-white">
              Prêt à commencer ta première session ?
            </h3>
            <p className="text-xs sm:text-sm text-[#0A0A0A]/70 dark:text-white/70 mt-1 max-w-xl leading-relaxed">
              Consacre 15 minutes aujourd'hui : lis une notion clé de la Partie 1, résous la question flash associée et teste tes réflexes.
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={() => onNavigate('dashboard')}
          className="shrink-0 gap-2 font-bold w-full sm:w-auto justify-center"
        >
          <span>Ouvrir mon Dashboard</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </section>
    </div>
  );
}

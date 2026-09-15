import React from 'react';
import { COURSE_PARTS } from '../../data/course';
import { useProgress } from '../../store/progressStore';
import { ActiveView } from '../../components/layout/Sidebar';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Progress } from '../../components/ui/Progress';
import {
  ArrowRight,
  BookOpen,
  Award,
  FlaskConical,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Layers,
  CalendarRange,
  Zap,
  GitBranch,
  Rocket
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: ActiveView, partId?: any) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { progress, overallPercentage } = useProgress();

  const iconMap: Record<string, any> = {
    part1: Layers,
    part2: CalendarRange,
    part3: Zap,
    part4: GitBranch,
    part5: Rocket,
  };

  return (
    <div className="space-y-8 sm:space-y-10 pb-12">
      {/* 1. Hero Section */}
      <section className="reveal-on-scroll relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-8 lg:p-10 shadow-card">
        {/* Subtle decorative glow */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-20 -bottom-20 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-3 py-1 text-xs font-bold text-primary">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>MODULE M201 · DÉVELOPPEMENT DIGITAL 2ÈME ANNÉE</span>
          </div>

          <h1 className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
            Maîtrise l’Approche Agile et prépare ton examen avec méthode.
          </h1>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-500 leading-relaxed font-normal">
            Apprends les concepts officiels, expérimente sur 5 simulateurs interactifs, entraîne-toi sur 200 QCM et réussis ton examen avec sérénité.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('part1')}
              className="gap-2 font-bold shadow-sm w-full sm:w-auto justify-center"
            >
              <span>Continuer mon apprentissage</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('final-exam')}
              className="gap-2 font-semibold w-full sm:w-auto justify-center"
            >
              <Award className="h-4 w-4 text-primary" />
              <span>Lancer l’Examen Final (50 QCM)</span>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('simulators')}
              className="gap-2 w-full sm:w-auto justify-center"
            >
              <FlaskConical className="h-4 w-4 text-slate-600" />
              <span>Laboratoire interactif</span>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Key Stats Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="reveal-on-scroll stagger-1 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-card">
          <div className="text-2xl sm:text-4xl font-black text-primary">{overallPercentage}%</div>
          <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">Maîtrise Globale</div>
          <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Progression en temps réel</div>
        </div>

        <div className="reveal-on-scroll stagger-2 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-card">
          <div className="text-2xl sm:text-4xl font-black text-teal-600">200</div>
          <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">QCM Spécialisés</div>
          <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">150 cours + 50 final</div>
        </div>

        <div className="reveal-on-scroll stagger-3 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-card">
          <div className="text-2xl sm:text-4xl font-black text-emerald-600">5</div>
          <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">Simulateurs Pratiques</div>
          <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">PERT, Gantt, Jira, Git, CI/CD</div>
        </div>

        <div className="reveal-on-scroll stagger-4 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-card">
          <div className="text-2xl sm:text-4xl font-black text-amber-500">18</div>
          <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">Flashcards 3D</div>
          <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Mémorisation des notions</div>
        </div>
      </section>

      {/* 3. Learning Path Timeline */}
      <section className="reveal-on-scroll rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-card">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Parcours d’apprentissage</h2>
            <p className="text-xs text-slate-500 mt-0.5">Progression recommandée pour l'examen</p>
          </div>
          <Badge variant="outline" size="sm">5 Modules + Examen</Badge>
        </div>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-center justify-between gap-2.5 sm:gap-3">
          {COURSE_PARTS.map((part, index) => {
            const partProgress = progress.parts[part.id];
            const isDone = partProgress?.quizCompleted;
            const Icon = iconMap[part.id] || BookOpen;

            return (
              <React.Fragment key={part.id}>
                <button
                  onClick={() => onNavigate(part.id)}
                  className="flex-1 min-w-[120px] text-left p-3 sm:p-3.5 rounded-2xl border border-slate-200 hover:border-primary/50 hover:bg-indigo-50/30 transition-all group"
                >
                  <div className="flex items-center justify-between text-[11px] mb-2 font-bold">
                    <span className="text-slate-400 group-hover:text-primary">0{part.orderNumber}</span>
                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                    ) : partProgress.bestScore > 0 ? (
                      <span className="text-primary font-bold">{partProgress.bestScore}%</span>
                    ) : (
                      <span className="text-slate-300">○</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-slate-600 group-hover:text-primary transition-colors shrink-0" />
                    <span className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-primary">
                      {part.title.split('·')[0]}
                    </span>
                  </div>
                </button>

                {index < COURSE_PARTS.length - 1 && (
                  <span className="hidden lg:block text-slate-300 font-bold">➔</span>
                )}
              </React.Fragment>
            );
          })}

          <span className="hidden lg:block text-slate-300 font-bold">➔</span>

          {/* Final Exam Node */}
          <button
            onClick={() => onNavigate('final-exam')}
            className="flex-1 min-w-[120px] text-left p-3 sm:p-3.5 rounded-2xl border-2 border-primary/40 bg-indigo-50/40 hover:bg-indigo-50/80 transition-all group"
          >
            <div className="flex items-center justify-between text-[11px] mb-2 font-bold">
              <span className="text-primary">FINAL</span>
              <Award className="h-4 w-4 text-primary shrink-0" />
            </div>
            <span className="text-xs font-bold text-slate-900 line-clamp-1">
              🏆 50 QCM Examen
            </span>
          </button>
        </div>
      </section>

      {/* 4. The 5 Learning Modules Cards */}
      <section className="reveal-on-scroll">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Modules de cours</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Chaque module propose un cours éditorial, des exemples réels et 30 QCM d’entraînement.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {COURSE_PARTS.map((part, pIdx) => {
            const partProgress = progress.parts[part.id];
            const Icon = iconMap[part.id] || BookOpen;
            const completedNotions = partProgress?.completedSections?.length || 0;
            const bestScore = partProgress?.bestScore || 0;

            return (
              <div
                key={part.id}
                className={`reveal-on-scroll stagger-${(pIdx % 3) + 1} rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-card hover:shadow-hover transition-all duration-200 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-primary shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" size="sm">
                      30 QCM
                    </Badge>
                  </div>

                  <div className="text-xs font-bold text-primary uppercase tracking-wider">
                    Partie 0{part.orderNumber}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1 line-clamp-1">
                    {part.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {part.subtitle}
                  </p>

                  <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                    <div className="flex justify-between font-medium">
                      <span>Notions lues</span>
                      <b className="text-slate-800">{completedNotions} / {part.sections.length}</b>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Meilleur score QCM</span>
                      <b className={bestScore > 0 ? "text-primary font-bold" : "text-slate-400"}>
                        {bestScore > 0 ? `${bestScore}%` : 'Non tenté'}
                      </b>
                    </div>
                    <Progress value={bestScore} className="h-1.5 mt-2" />
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onNavigate(part.id)}
                    className="flex-1 font-bold justify-center"
                  >
                    <span>Consulter le cours</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate(part.id)}
                    className="px-3"
                    title="Aller au module"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}

          {/* Interactive Lab Promo Card */}
          <div className="reveal-on-scroll stagger-3 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-5 sm:p-6 flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700 mb-4">
                <FlaskConical className="h-5 w-5" />
              </div>
              <Badge variant="accent" size="sm">Pratique interactive</Badge>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2">Laboratoire Interactif</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Applique immédiatement les calculs de réseau PERT, la timeline Gantt, le board Jira, le flux Git et le pipeline CI/CD.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('simulators')}
              className="mt-6 font-bold text-teal-800 border-teal-200 hover:bg-teal-50 w-full justify-center"
            >
              <span>Ouvrir les 5 simulateurs ➔</span>
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Revision & Flashcards Banner */}
      <section className="grid sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="reveal-on-scroll rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-card flex flex-col sm:flex-row items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-primary">
            <CreditCard className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-slate-900">Flashcards Interactives 3D</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              18 cartes de révision recto/verso pour retenir par cœur les définitions et pièges récurrents.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('flashcards')}
              className="mt-4 text-xs font-semibold w-full sm:w-auto justify-center"
            >
              Réviser les cartes ➔
            </Button>
          </div>
        </div>

        <div className="reveal-on-scroll stagger-1 rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-card flex flex-col sm:flex-row items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-slate-900">Carnet « Mes Erreurs »</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Retravaille uniquement les questions auxquelles tu as mal répondu pour viser la note maximale le jour de l’EFM.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('errors')}
              className="mt-4 text-xs font-semibold w-full sm:w-auto justify-center"
            >
              Revoir mes erreurs ({progress.wrongQuestionIds.length}) ➔
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { COURSE_PARTS } from '../../data/course';
import { useProgress } from '../../store/progressStore';
import { ActiveView } from '../../components/layout/Sidebar';
import { Button } from '../../components/ui/Button';
import { Progress } from '../../components/ui/Progress';
import { Agile3DBoard } from '../../components/3d/Agile3DBoard';
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
  Rocket,
  Timer,
  Compass
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

  // Compute next recommendation
  const nextPart = COURSE_PARTS.find(p => !progress.parts[p.id]?.quizCompleted) || COURSE_PARTS[0];
  const totalWrong = progress.wrongQuestionIds?.length || 0;
  
  // Readiness label
  const getReadinessStatus = (pct: number) => {
    if (pct >= 85) return { label: 'Excellence EFM garantie', color: 'text-[#10B981]', desc: 'Score cible atteint pour la mention très bien.' };
    if (pct >= 60) return { label: 'Prêt pour l’examen', color: 'text-[#22C55E]', desc: 'Bases solides, consolide avec l’examen blanc.' };
    if (pct >= 30) return { label: 'En progression active', color: 'text-[#22C55E]', desc: 'Continue les modules et pratique sur les simulateurs.' };
    return { label: 'Démarrage du parcours', color: 'text-[#10B981]', desc: 'Commence par la Partie 1 pour bâtir tes fondations.' };
  };

  const readiness = getReadinessStatus(overallPercentage);

  return (
    <div className="space-y-8 sm:space-y-12 pb-16 text-[#0A0A0A] dark:text-[#FFFFFF]">
      {/* 1. Command Center Hero: "Que faire maintenant ?" */}
      <section className="reveal-on-scroll relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-gradient-to-b from-white/95 to-white/75 dark:from-[#0A0A0A]/95 dark:to-[#0A0A0A]/80 p-6 sm:p-10 shadow-xl backdrop-blur-xl">
        {/* Subtle decorative luminescence */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#10B981]/15 blur-3xl pointer-events-none" />
        <div className="absolute right-20 -bottom-20 h-72 w-72 rounded-full bg-[#22C55E]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 px-3.5 py-1.5 text-xs font-mono font-bold text-[#10B981]">
              <Sparkles className="h-3.5 w-3.5 text-[#10B981]" />
              <span>CENTRE DE COMMANDE · DÉVELOPPEMENT DIGITAL 2A</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0A0A0A] dark:text-white leading-[1.15]">
              Maîtrise l’Approche Agile & DevOps pour l’examen OFPPT.
            </h1>

            <p className="text-sm sm:text-base text-[#0A0A0A]/70 dark:text-white/70 leading-relaxed font-normal">
              Progression rythmée, 5 simulateurs interactifs d'entreprise, 200 questions d'examen et révision ciblée de tes erreurs.
            </p>

            {/* Smart Next Step Suggestion Card */}
            <div className="pt-2">
              <div className="rounded-2xl border border-[#10B981]/30 bg-[#10B981]/5 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#10B981] text-white font-bold shadow-md shadow-[#10B981]/25">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#10B981]">
                      Prochaine action recommandée
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#0A0A0A] dark:text-white">
                      Partie 0{nextPart.orderNumber} : {nextPart.title}
                    </h3>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onNavigate(nextPart.id)}
                  className="gap-2 font-bold justify-center w-full sm:w-auto shrink-0 shadow-md shadow-[#10B981]/20 bg-[#10B981] hover:bg-[#22C55E] text-white"
                >
                  <span>Continuer maintenant</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="pt-1 flex flex-wrap gap-2.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('final-exam')}
                className="gap-2 font-bold justify-center text-xs border-black/15 dark:border-white/15 hover:border-[#10B981]"
              >
                <Award className="h-4 w-4 text-[#10B981]" />
                <span>Examen Blanc EFM (50 QCM)</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onNavigate('simulators')}
                className="gap-2 justify-center text-xs bg-[#22C55E] hover:bg-[#10B981] text-white border-none shadow-sm"
              >
                <FlaskConical className="h-4 w-4" />
                <span>5 Simulateurs Pratiques</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('methodology')}
                className="gap-2 justify-center text-xs border-black/15 dark:border-white/15 hover:border-[#10B981]"
              >
                <span>Guide Méthode 2026 ➔</span>
              </Button>
            </div>
          </div>

          {/* Right Readiness Card */}
          <div className="lg:col-span-4 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-5 sm:p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#0A0A0A]/60 dark:text-white/60 font-bold">
                  Niveau de Préparation
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] font-bold border border-[#10B981]/30">
                  Temps Réel
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black font-mono text-[#10B981] tracking-tight">
                  {overallPercentage}%
                </span>
                <span className="text-xs font-bold text-[#0A0A0A]/50 dark:text-white/50">/ 100%</span>
              </div>
              <Progress value={overallPercentage} className="h-2 mt-3" />
              
              <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10">
                <div className={`text-xs font-bold ${readiness.color}`}>
                  {readiness.label}
                </div>
                <p className="text-[11px] text-[#0A0A0A]/60 dark:text-white/60 mt-0.5 leading-relaxed">
                  {readiness.desc}
                </p>
              </div>
            </div>

            {totalWrong > 0 && (
              <div 
                onClick={() => onNavigate('errors')} 
                className="rounded-xl border border-[#22C55E]/30 bg-[#22C55E]/10 p-3 flex items-center justify-between cursor-pointer hover:bg-[#22C55E]/15 transition-all text-xs"
              >
                <div className="flex items-center gap-2 text-[#0A0A0A] dark:text-white font-bold">
                  <AlertTriangle className="h-4 w-4 text-[#22C55E] shrink-0" />
                  <span>{totalWrong} question(s) à retravailler</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-[#22C55E]" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Key Stats Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <div className="reveal-on-scroll stagger-1 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-4 sm:p-5 shadow-sm dark:shadow-xl backdrop-blur-md">
          <div className="text-2xl sm:text-4xl font-black text-[#10B981] font-mono">{overallPercentage}%</div>
          <div className="text-xs sm:text-sm font-bold text-[#0A0A0A] dark:text-white mt-1">Maîtrise Globale</div>
          <div className="text-[11px] sm:text-xs text-[#0A0A0A]/60 dark:text-white/60 mt-0.5">Calculée sur l'ensemble des modules</div>
        </div>

        <div className="reveal-on-scroll stagger-2 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-4 sm:p-5 shadow-sm dark:shadow-xl backdrop-blur-md">
          <div className="text-2xl sm:text-4xl font-black text-[#22C55E] font-mono">200</div>
          <div className="text-xs sm:text-sm font-bold text-[#0A0A0A] dark:text-white mt-1">QCM Spécialisés</div>
          <div className="text-[11px] sm:text-xs text-[#0A0A0A]/60 dark:text-white/60 mt-0.5">150 cours + 50 final</div>
        </div>

        <div className="reveal-on-scroll stagger-3 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-4 sm:p-5 shadow-sm dark:shadow-xl backdrop-blur-md">
          <div className="text-2xl sm:text-4xl font-black text-[#10B981] font-mono">5</div>
          <div className="text-xs sm:text-sm font-bold text-[#0A0A0A] dark:text-white mt-1">Simulateurs Pratiques</div>
          <div className="text-[11px] sm:text-xs text-[#0A0A0A]/60 dark:text-white/60 mt-0.5">PERT, Gantt, Jira, Git, CI/CD</div>
        </div>

        <div className="reveal-on-scroll stagger-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-4 sm:p-5 shadow-sm dark:shadow-xl backdrop-blur-md">
          <div className="text-2xl sm:text-4xl font-black text-[#22C55E] font-mono">18</div>
          <div className="text-xs sm:text-sm font-bold text-[#0A0A0A] dark:text-white mt-1">Flashcards 3D</div>
          <div className="text-[11px] sm:text-xs text-[#0A0A0A]/60 dark:text-white/60 mt-0.5">Mémorisation active des notions</div>
        </div>
      </section>

      {/* 3. Quick Sessions Strip (Sessions Rapides) */}
      <section className="reveal-on-scroll rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-5 sm:p-6 shadow-sm dark:shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-[#10B981]" />
            <h2 className="text-sm sm:text-base font-bold text-[#0A0A0A] dark:text-white">Sessions Rapides Spéciales</h2>
          </div>
          <span className="text-[11px] text-[#0A0A0A]/50 dark:text-white/50 font-mono">Idéal pour réviser entre 2 cours</span>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div 
            onClick={() => onNavigate('flashcards')}
            className="p-3.5 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:border-[#10B981] hover:bg-[#10B981]/5 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold text-[#10B981] px-2 py-0.5 rounded-md bg-[#10B981]/15">⚡ 3 MINUTES</span>
              <CreditCard className="h-4 w-4 text-[#0A0A0A]/40 dark:text-white/40 group-hover:text-[#10B981] transition-colors" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-[#0A0A0A] dark:text-white group-hover:text-[#10B981]">Flashcards Rapides</h4>
            <p className="text-[11px] text-[#0A0A0A]/60 dark:text-white/60 mt-0.5">Révise les termes clés du vocabulaire Agile et DevOps.</p>
          </div>

          <div 
            onClick={() => onNavigate('simulators')}
            className="p-3.5 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:border-[#22C55E] hover:bg-[#22C55E]/5 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold text-[#22C55E] px-2 py-0.5 rounded-md bg-[#22C55E]/15">🧪 5 MINUTES</span>
              <FlaskConical className="h-4 w-4 text-[#0A0A0A]/40 dark:text-white/40 group-hover:text-[#22C55E] transition-colors" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-[#0A0A0A] dark:text-white group-hover:text-[#22C55E]">Atelier Simulateur</h4>
            <p className="text-[11px] text-[#0A0A0A]/60 dark:text-white/60 mt-0.5">Calcule les marges PERT ou manipule les 4 zones Git.</p>
          </div>

          <div 
            onClick={() => onNavigate(totalWrong > 0 ? 'errors' : 'final-exam')}
            className="p-3.5 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:border-[#10B981] hover:bg-[#10B981]/5 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold text-[#10B981] px-2 py-0.5 rounded-md bg-[#10B981]/15">🎯 CIBLÉ</span>
              <AlertTriangle className="h-4 w-4 text-[#0A0A0A]/40 dark:text-white/40 group-hover:text-[#10B981] transition-colors" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-[#0A0A0A] dark:text-white group-hover:text-[#10B981]">
              {totalWrong > 0 ? `Corriger ${totalWrong} Erreur(s)` : 'Test Blanc Rapide'}
            </h4>
            <p className="text-[11px] text-[#0A0A0A]/60 dark:text-white/60 mt-0.5">
              {totalWrong > 0 ? 'Zéro perte de temps : cible directement tes points faibles.' : 'Teste tes connaissances globales en conditions réelles.'}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Learning Path Timeline */}
      <section className="reveal-on-scroll rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-5 sm:p-8 shadow-sm dark:shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#0A0A0A] dark:text-white">Parcours d’apprentissage</h2>
            <p className="text-xs text-[#0A0A0A]/60 dark:text-white/60 mt-0.5">Progression recommandée pour l'examen officiel OFPPT</p>
          </div>
          <span className="rounded-full bg-[#10B981]/10 border border-[#10B981]/30 px-3 py-1 text-xs font-mono font-bold text-[#10B981]">
            5 Parties + Examen
          </span>
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
                  className="flex-1 min-w-[120px] text-left p-3 sm:p-3.5 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:border-[#10B981] hover:bg-[#10B981]/5 transition-all group"
                >
                  <div className="flex items-center justify-between text-[11px] mb-2 font-bold font-mono">
                    <span className="text-[#0A0A0A]/50 dark:text-white/50 group-hover:text-[#10B981]">0{part.orderNumber}</span>
                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0" />
                    ) : partProgress?.bestScore > 0 ? (
                      <span className="text-[#10B981] font-bold">{partProgress.bestScore}%</span>
                    ) : (
                      <span className="text-[#0A0A0A]/30 dark:text-white/30">○</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-[#0A0A0A]/60 dark:text-white/60 group-hover:text-[#10B981] transition-colors shrink-0" />
                    <span className="text-xs font-bold text-[#0A0A0A] dark:text-white line-clamp-1 group-hover:text-[#10B981]">
                      {part.title.split('·')[0]}
                    </span>
                  </div>
                </button>

                {index < COURSE_PARTS.length - 1 && (
                  <span className="hidden lg:block text-[#0A0A0A]/30 dark:text-white/30 font-bold">➔</span>
                )}
              </React.Fragment>
            );
          })}

          <span className="hidden lg:block text-[#0A0A0A]/30 dark:text-white/30 font-bold">➔</span>

          {/* Final Exam Node */}
          <button
            onClick={() => onNavigate('final-exam')}
            className="flex-1 min-w-[120px] text-left p-3 sm:p-3.5 rounded-2xl border-2 border-[#10B981] bg-[#10B981]/10 hover:bg-[#10B981]/20 transition-all group shadow-sm"
          >
            <div className="flex items-center justify-between text-[11px] mb-2 font-bold font-mono">
              <span className="text-[#10B981]">FINAL</span>
              <Award className="h-4 w-4 text-[#10B981] shrink-0" />
            </div>
            <span className="text-xs font-bold text-[#0A0A0A] dark:text-white line-clamp-1">
              🏆 50 QCM Examen
            </span>
          </button>
        </div>
      </section>

      {/* 5. AGILE 3D SPECIAL INTERACTIVE BOARD */}
      <section className="reveal-on-scroll">
        <Agile3DBoard />
      </section>

      {/* 6. The 5 Learning Modules Cards */}
      <section className="reveal-on-scroll space-y-5">
        <div className="flex items-end justify-between border-b border-black/10 dark:border-white/10 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0A0A0A] dark:text-white tracking-tight">Modules de cours officiels</h2>
            <p className="text-xs sm:text-sm text-[#0A0A0A]/70 dark:text-white/70 mt-1">Chaque module propose un cours éditorial complet, des exemples réels et 30 QCM d’entraînement.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {COURSE_PARTS.map((part, pIdx) => {
            const partProgress = progress.parts[part.id];
            const Icon = iconMap[part.id] || BookOpen;
            const completedNotions = partProgress?.completedSections?.length || 0;
            const bestScore = partProgress?.bestScore || 0;

            return (
              <div
                key={part.id}
                className={`reveal-on-scroll stagger-${(pIdx % 3) + 1} rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-5 sm:p-6 shadow-sm dark:shadow-xl hover:border-[#10B981] transition-all duration-200 flex flex-col justify-between backdrop-blur-md`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-black/5 dark:bg-white/10 px-2.5 py-1 text-[11px] font-mono font-bold text-[#0A0A0A] dark:text-white border border-black/10 dark:border-white/10">
                      30 QCM
                    </span>
                  </div>

                  <div className="text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider">
                    Partie 0{part.orderNumber}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0A0A0A] dark:text-white mt-1 line-clamp-1">
                    {part.title}
                  </h3>
                  <p className="text-xs text-[#0A0A0A]/70 dark:text-white/70 mt-1.5 line-clamp-2 leading-relaxed">
                    {part.subtitle}
                  </p>

                  <div className="mt-5 space-y-2 border-t border-black/10 dark:border-white/10 pt-4 text-xs text-[#0A0A0A]/60 dark:text-white/60">
                    <div className="flex justify-between font-medium">
                      <span>Notions validées</span>
                      <b className="text-[#0A0A0A] dark:text-white">{completedNotions} / {part.sections.length}</b>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Meilleur score QCM</span>
                      <b className={bestScore > 0 ? "text-[#10B981] font-bold" : "text-[#0A0A0A]/40 dark:text-white/40"}>
                        {bestScore > 0 ? `${bestScore}%` : 'Non tenté'}
                      </b>
                    </div>
                    <Progress value={bestScore} className="h-1.5 mt-2" />
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onNavigate(part.id)}
                    className="flex-1 font-bold justify-center text-xs bg-[#10B981] hover:bg-[#22C55E] text-white"
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
          <div className="reveal-on-scroll stagger-3 rounded-3xl border border-[#22C55E]/30 bg-[#22C55E]/5 dark:bg-[#22C55E]/10 p-5 sm:p-6 flex flex-col justify-between hover:border-[#22C55E] transition-colors shadow-sm dark:shadow-xl">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 mb-4">
                <FlaskConical className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-[#22C55E]/10 px-2.5 py-1 text-[11px] font-bold text-[#22C55E] border border-[#22C55E]/30">
                Pratique interactive
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#0A0A0A] dark:text-white mt-2">Laboratoire Interactif</h3>
              <p className="text-xs text-[#0A0A0A]/70 dark:text-white/70 mt-1.5 leading-relaxed">
                Applique immédiatement les calculs de réseau PERT, la timeline Gantt, le board Jira, le flux Git et le pipeline CI/CD.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('simulators')}
              className="mt-6 font-bold text-[#22C55E] border-[#22C55E]/40 hover:bg-[#22C55E]/10 w-full justify-center text-xs"
            >
              <span>Ouvrir les 5 simulateurs ➔</span>
            </Button>
          </div>
        </div>
      </section>

      {/* 7. Revision & Flashcards Banner */}
      <section className="grid sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="reveal-on-scroll rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-5 sm:p-6 shadow-sm dark:shadow-xl flex flex-col sm:flex-row items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
            <CreditCard className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-[#0A0A0A] dark:text-white">Flashcards Interactives 3D</h3>
            <p className="text-xs text-[#0A0A0A]/70 dark:text-white/70 mt-1 leading-relaxed">
              18 cartes de révision recto/verso pour retenir par cœur les définitions et pièges récurrents de l'examen.
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

        <div className="reveal-on-scroll stagger-1 rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-5 sm:p-6 shadow-sm dark:shadow-xl flex flex-col sm:flex-row items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-[#0A0A0A] dark:text-white">Carnet « Mes Erreurs »</h3>
            <p className="text-xs text-[#0A0A0A]/70 dark:text-white/70 mt-1 leading-relaxed">
              Retravaille uniquement les questions auxquelles tu as mal répondu pour viser la note maximale le jour de l’EFM.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('errors')}
              className="mt-4 text-xs font-semibold w-full sm:w-auto justify-center"
            >
              Revoir mes erreurs ({totalWrong}) ➔
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

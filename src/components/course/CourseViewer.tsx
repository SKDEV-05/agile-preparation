import React, { useState, useEffect } from 'react';
import { CoursePart, PartId } from '../../types';
import { COURSE_MAP } from '../../data/course';
import { SectionArticle } from './SectionArticle';
import { TableOfContents } from './TableOfContents';
import { useProgress } from '../../store/progressStore';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { 
  Award, 
  FlaskConical, 
  ChevronDown, 
  ChevronUp, 
  BookCheck, 
  ArrowRight, 
  Printer, 
  Sparkles, 
  Check
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface CourseViewerProps {
  coursePart?: CoursePart;
  partId?: PartId;
  onStartQuiz: (partId: PartId) => void;
  onOpenSimulators: () => void;
}

export function CourseViewer({ coursePart: propCoursePart, partId, onStartQuiz, onOpenSimulators }: CourseViewerProps) {
  const coursePart = propCoursePart || (partId ? COURSE_MAP[partId] : null);
  const { progress, markSectionCompleted } = useProgress();
  const [showCaseSolution, setShowCaseSolution] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  // Track active section on scroll - Hook placed unconditionally
  useEffect(() => {
    if (!coursePart) return;
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (const section of coursePart.sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSectionId(section.id);
            break;
          }
        }
      }
      const practicalEl = document.getElementById('practical-case');
      if (practicalEl) {
        const top = practicalEl.offsetTop;
        if (scrollPosition >= top - 80) {
          setActiveSectionId('practical-case');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [coursePart]);

  if (!coursePart) return null;

  const partProgress = progress.parts[coursePart.id] || { completedSections: [], quizCompleted: false, bestScore: 0, attempts: 0 };
  const completedCount = partProgress.completedSections.length;
  const totalSections = coursePart.sections.length;
  const progressPercent = totalSections > 0 ? Math.round((completedCount / totalSections) * 100) : 0;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -85;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="text-[#0A0A0A] dark:text-white select-none">
      {/* ─────────────────────────────────────────────────────────────
          MOBILE/TABLET STICKY STEPPER BAR (DESKTOP USES LOCKED TABLE OF CONTENTS)
      ───────────────────────────────────────────────────────────── */}
      <div className="lg:hidden sticky top-16 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2.5 mb-6 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-black/10 dark:border-white/10 shadow-xs flex items-center justify-between gap-3 overflow-hidden">
        {/* Left: Module Tag & Step Quick Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 min-w-0">
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#10B981] bg-[#10B981]/15 px-2.5 py-1 rounded-xl shrink-0 border border-[#10B981]/30">
            Partie 0{coursePart.orderNumber}
          </span>

          {/* Quick-Jump Step Pills */}
          <div className="flex items-center gap-1.5 shrink-0">
            {coursePart.sections.map(sec => {
              const isCurrent = activeSectionId === sec.id;
              const isCompleted = partProgress.completedSections.includes(sec.id);

              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer",
                    isCurrent
                      ? "bg-[#10B981] text-white shadow-2xs"
                      : isCompleted
                        ? "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 hover:bg-[#10B981]/25"
                        : "bg-black/[0.04] dark:bg-white/[0.06] text-[#0A0A0A]/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10"
                  )}
                  title={sec.title}
                >
                  <span>{sec.order}</span>
                  {isCompleted && <Check className="h-3 w-3" />}
                  <span className="hidden md:inline max-w-[120px] truncate text-[11px] font-sans font-medium">
                    {sec.title}
                  </span>
                </button>
              );
            })}

            {/* Practical Case Pill */}
            <button
              onClick={() => scrollToSection('practical-case')}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer",
                activeSectionId === 'practical-case'
                  ? "bg-[#22C55E] text-white shadow-2xs"
                  : "bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 hover:bg-[#22C55E]/25"
              )}
            >
              <Sparkles className="h-3 w-3" />
              <span>Cas EFM</span>
            </button>
          </div>
        </div>

        {/* Right: Progress & QCM CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
            <span className="text-[#10B981] font-bold">{completedCount}/{totalSections}</span>
            <div className="w-16 h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
              <div 
                className="h-full bg-[#10B981] rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => onStartQuiz(coursePart.id)}
            className="flex items-center gap-1.5 text-xs font-bold bg-[#10B981] hover:bg-[#22C55E] text-white px-3 py-1 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Award className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">30 QCM</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="flex gap-8 items-start">
        {/* Main Editorial Column */}
        <div className="flex-1 min-w-0">
          {/* Module Header Banner */}
          <div className="reveal-on-scroll rounded-3xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] backdrop-blur-xl p-6 sm:p-9 shadow-xl mb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
            
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Badge variant="primary" size="sm" className="bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-semibold font-mono">
                  Partie 0{coursePart.orderNumber} · Référentiel Officiel
                </Badge>
                <Badge variant="outline" size="sm" className="bg-black/5 dark:bg-white/5 text-[#0A0A0A] dark:text-white border border-black/10 dark:border-white/10">
                  30 QCM d’évaluation
                </Badge>
              </div>
              {partProgress.bestScore > 0 && (
                <span className="text-xs font-semibold text-[#0A0A0A]/60 dark:text-white/60 font-mono">
                  Meilleur score : <b className="text-[#10B981] font-bold">{partProgress.bestScore}%</b>
                </span>
              )}
            </div>

            <h1 className="relative z-10 mt-4 text-2xl sm:text-4xl font-black tracking-tight text-[#0A0A0A] dark:text-white leading-tight">
              {coursePart.title}
            </h1>
            <p className="relative z-10 mt-2 text-sm sm:text-base text-[#0A0A0A]/70 dark:text-white/70 leading-relaxed max-w-3xl">
              {coursePart.subtitle}
            </p>

            <p className="relative z-10 mt-4 text-xs sm:text-sm text-[#0A0A0A]/60 dark:text-white/60 leading-relaxed border-t border-black/10 dark:border-white/10 pt-4">
              {coursePart.description}
            </p>

            {/* Module Step Progress Tracker */}
            <div className="relative z-10 mt-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 p-4">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="font-bold text-[#10B981] flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Parcours d'assimilation du module
                </span>
                <span className="text-[#0A0A0A]/60 dark:text-white/60 font-semibold">
                  {completedCount} / {totalSections} notions validées ({progressPercent}%)
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#10B981] to-[#22C55E] transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Action CTAs */}
            <div className="relative z-10 mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => onStartQuiz(coursePart.id)}
                className="gap-2 font-bold shadow-lg shadow-[#10B981]/25 w-full sm:w-auto justify-center bg-[#10B981] hover:bg-[#22C55E] text-white cursor-pointer"
              >
                <Award className="h-4 w-4 shrink-0" />
                <span>Passer aux 30 QCM · Partie {coursePart.orderNumber}</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={onOpenSimulators}
                className="gap-2 w-full sm:w-auto justify-center border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] hover:bg-black/5 dark:hover:bg-white/10 text-[#0A0A0A] dark:text-white cursor-pointer"
              >
                <FlaskConical className="h-4 w-4 text-[#22C55E] shrink-0" />
                <span>Laboratoire interactif</span>
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => window.print()}
                title="Imprimer ou enregistrer cette fiche en PDF pour réviser"
                className="gap-2 w-full sm:w-auto justify-center border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] hover:bg-black/5 dark:hover:bg-white/10 text-[#0A0A0A] dark:text-white print:hidden cursor-pointer"
              >
                <Printer className="h-4 w-4 text-[#10B981] shrink-0" />
                <span>Fiche PDF / Print</span>
              </Button>
            </div>
          </div>

          {/* Section Articles (Sequential Learning Steps) */}
          <div className="space-y-6">
            {coursePart.sections.map(sec => (
              <SectionArticle
                key={sec.id}
                section={sec}
                partId={coursePart.id}
                isCompleted={partProgress.completedSections.includes(sec.id)}
                onMarkCompleted={(secId) => markSectionCompleted(coursePart.id, secId)}
              />
            ))}
          </div>

          {/* ─────────────────────────────────────────────────────────────
              ÉTAPE FINALE · CAS PRATIQUE D'EXAMEN EFM
          ───────────────────────────────────────────────────────────── */}
          <section 
            id="practical-case" 
            className="rounded-3xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] backdrop-blur-xl p-6 sm:p-9 shadow-xl mt-12 relative overflow-hidden scroll-mt-28"
          >
            <div className="absolute top-0 left-0 w-80 h-80 bg-[#22C55E]/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-black/10 dark:border-white/10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#22C55E] font-mono flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" />
                  <span>Étape Finale du Module · Cas Pratique EFM Corrigé</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#0A0A0A] dark:text-white mt-1">
                  {coursePart.practicalCase.title}
                </h3>
              </div>
              <Badge variant="accent" size="md" className="bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 font-semibold">
                Mise en situation d'examen
              </Badge>
            </div>

            {/* Step 1: Scénario et Contexte */}
            <div className="relative z-10 mt-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 p-5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0A]/70 dark:text-white/70 mb-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-black/10 dark:bg-white/10 text-[10px] font-bold">1</span>
                <span>Scénario & Contexte du Projet :</span>
              </div>
              <p className="whitespace-pre-line text-sm text-[#0A0A0A]/80 dark:text-white/80 leading-relaxed font-normal">
                {coursePart.practicalCase.scenario}
              </p>
            </div>

            {/* Step 2: Travail à faire */}
            <div className="relative z-10 mt-4 rounded-2xl bg-[#10B981]/5 border border-[#10B981]/30 p-5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#10B981] mb-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#10B981]/20 text-[10px] font-bold">2</span>
                <span>Consigne d'Évaluation (Travail à faire) :</span>
              </div>
              <p className="text-sm font-semibold text-[#0A0A0A] dark:text-white leading-relaxed">
                {coursePart.practicalCase.challenge}
              </p>
            </div>

            {/* Step 3: Corrigé officiel détaillé */}
            <div className="relative z-10 mt-6">
              <button
                onClick={() => setShowCaseSolution(!showCaseSolution)}
                className="flex items-center gap-2 text-xs font-bold text-[#0A0A0A] dark:text-white bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 px-4 py-2.5 rounded-xl border border-black/15 dark:border-white/15 transition-all shadow-xs cursor-pointer"
              >
                <span>{showCaseSolution ? 'Masquer la correction type' : 'Voir la correction détaillée type EFM'}</span>
                {showCaseSolution ? <ChevronUp className="h-4 w-4 text-[#10B981]" /> : <ChevronDown className="h-4 w-4 text-[#10B981]" />}
              </button>

              {showCaseSolution && (
                <div className="mt-4 rounded-2xl border border-[#22C55E]/30 bg-[#22C55E]/5 p-5 sm:p-6 animate-in fade-in duration-200 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#22C55E] mb-3 font-mono">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#22C55E]/20 text-[10px] font-bold">3</span>
                    <span>Éléments de réponse attendus par l'examinateur :</span>
                  </div>
                  <div className="space-y-2.5">
                    {coursePart.practicalCase.solutionPoints.map((sol, idx) => (
                      <div key={idx} className="flex items-start gap-3 rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 p-3.5 text-xs sm:text-sm text-[#0A0A0A]/85 dark:text-white/85 leading-relaxed">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#10B981]/15 text-[#10B981] font-bold text-xs">
                          ✓
                        </span>
                        <span>{sol}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* End of Lesson CTA Card */}
          <div className="rounded-3xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] p-8 sm:p-10 shadow-xl mt-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-[#10B981]/10 via-transparent to-transparent pointer-events-none"></div>
            <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#10B981] text-white shadow-lg shadow-[#10B981]/40 mb-4 ring-4 ring-[#10B981]/20">
              <BookCheck className="h-7 w-7" />
            </div>
            <h3 className="relative z-10 text-2xl font-black text-[#0A0A0A] dark:text-white">
              Module terminé ! Prêt pour l’évaluation ?
            </h3>
            <p className="relative z-10 mt-2 text-sm text-[#0A0A0A]/70 dark:text-white/70 max-w-xl mx-auto leading-relaxed">
              Tu as parcouru les concepts fondamentaux de cette partie. Valide tes acquis dès maintenant avec les 30 QCM gradués.
            </p>
            <div className="relative z-10 mt-6 flex flex-wrap justify-center gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onStartQuiz(coursePart.id)}
                className="font-bold shadow-lg shadow-[#10B981]/25 bg-[#10B981] hover:bg-[#22C55E] text-white cursor-pointer"
              >
                <span>Commencer les 30 QCM de la Partie {coursePart.orderNumber}</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onOpenSimulators}
                className="border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] hover:bg-black/5 dark:hover:bg-white/10 text-[#0A0A0A] dark:text-white shadow-xs cursor-pointer"
              >
                Pratiquer au laboratoire d’abord
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sticky Table of Contents on Desktop */}
        <TableOfContents
          sections={coursePart.sections}
          completedSectionIds={partProgress.completedSections}
        />
      </div>
    </div>
  );
}

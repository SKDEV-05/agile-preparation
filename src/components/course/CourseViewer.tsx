import React, { useState } from 'react';
import { CoursePart, PartId } from '../../types';
import { COURSE_MAP } from '../../data/course';
import { SectionArticle } from './SectionArticle';
import { TableOfContents } from './TableOfContents';
import { useProgress } from '../../store/progressStore';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Award, FlaskConical, ChevronDown, ChevronUp, BookCheck, ArrowRight } from 'lucide-react';

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

  if (!coursePart) return null;

  const partProgress = progress.parts[coursePart.id] || { completedSections: [], quizCompleted: false, bestScore: 0, attempts: 0 };
  const completedCount = partProgress.completedSections.length;
  const totalSections = coursePart.sections.length;


  return (
    <div className="flex gap-8 items-start">
      {/* Main Editorial Column */}
      <div className="flex-1 min-w-0">
        {/* Module Header Banner */}
        <div className="reveal-on-scroll rounded-3xl border border-white/10 bg-[#0D1526]/85 backdrop-blur-xl p-5 sm:p-8 shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm" className="bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
                Partie {coursePart.orderNumber} · Cours
              </Badge>
              <Badge variant="outline" size="sm" className="bg-white/5 text-slate-300 border border-white/10">
                30 QCM d’évaluation
              </Badge>
            </div>
            {partProgress.bestScore > 0 && (
              <span className="text-xs font-semibold text-slate-400">
                Meilleur score : <b className="text-indigo-400 font-bold">{partProgress.bestScore}%</b>
              </span>
            )}
          </div>

          <h1 className="relative z-10 mt-4 text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            {coursePart.title}
          </h1>
          <p className="relative z-10 mt-2 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {coursePart.subtitle}
          </p>

          <p className="relative z-10 mt-4 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/10 pt-4">
            {coursePart.description}
          </p>

          <div className="relative z-10 mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => onStartQuiz(coursePart.id)}
              className="gap-2 font-bold shadow-lg shadow-indigo-600/30 w-full sm:w-auto justify-center bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400"
            >
              <Award className="h-4 w-4 shrink-0" />
              <span>Passer aux 30 QCM · Partie {coursePart.orderNumber}</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={onOpenSimulators}
              className="gap-2 w-full sm:w-auto justify-center border-white/15 bg-white/5 hover:bg-white/10 text-slate-200"
            >
              <FlaskConical className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>Laboratoire interactif</span>
            </Button>
            <div className="ml-auto text-xs text-slate-400 font-medium hidden lg:block">
              {completedCount} / {totalSections} notions lues
            </div>
          </div>
        </div>

        {/* Section Articles */}
        <div className="space-y-4">
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

        {/* Practical Exam Case */}
        <section id="practical-case" className="rounded-3xl border border-cyan-500/30 bg-[#0A1628]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl mt-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Cas Pratique d’Examen EFM
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                {coursePart.practicalCase.title}
              </h3>
            </div>
            <Badge variant="accent" size="md" className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Application directe
            </Badge>
          </div>

          <div className="relative z-10 mt-5 rounded-2xl bg-[#070B14]/80 border border-white/10 p-5 text-sm text-slate-200 leading-relaxed">
            <p className="font-semibold text-cyan-300 mb-1">Mise en situation :</p>
            <p className="whitespace-pre-line text-slate-300">{coursePart.practicalCase.scenario}</p>
          </div>

          <div className="relative z-10 mt-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 p-5 text-sm text-indigo-100 leading-relaxed">
            <p className="font-bold text-indigo-300 mb-1">Travail à faire :</p>
            <p>{coursePart.practicalCase.challenge}</p>
          </div>

          <div className="relative z-10 mt-5">
            <button
              onClick={() => setShowCaseSolution(!showCaseSolution)}
              className="flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-cyan-200 bg-cyan-950/60 px-4 py-2 rounded-xl border border-cyan-500/40 transition-colors shadow-sm"
            >
              <span>{showCaseSolution ? 'Masquer la correction type' : 'Voir la correction détaillée type EFM'}</span>
              {showCaseSolution ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {showCaseSolution && (
              <div className="mt-4 rounded-2xl border border-cyan-500/30 bg-cyan-950/30 p-5 animate-in fade-in duration-200">
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-3">
                  Éléments de réponse attendus à l’examen :
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                  {coursePart.practicalCase.solutionPoints.map((sol, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="font-bold text-cyan-400">➔</span>
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* End of Lesson CTA Card */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-950/60 via-[#0D1526] to-[#070B14] p-8 sm:p-10 shadow-2xl mt-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-radial from-indigo-600/10 via-transparent to-transparent pointer-events-none"></div>
          <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 mb-4 ring-4 ring-indigo-500/20">
            <BookCheck className="h-7 w-7" />
          </div>
          <h3 className="relative z-10 text-2xl font-black text-white">
            Leçon terminée ! Prêt pour le test ?
          </h3>
          <p className="relative z-10 mt-2 text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Tu as parcouru les concepts fondamentaux de cette partie. Valide tes acquis dès maintenant avec les 30 QCM gradués.
          </p>
          <div className="relative z-10 mt-6 flex flex-wrap justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onStartQuiz(coursePart.id)}
              className="font-bold shadow-lg shadow-indigo-600/30 bg-indigo-600 hover:bg-indigo-500"
            >
              <span>Commencer les 30 QCM de la Partie {coursePart.orderNumber}</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onOpenSimulators}
              className="border-white/15 bg-white/5 hover:bg-white/10 text-slate-200"
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
  );
}

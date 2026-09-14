import React, { useState } from 'react';
import { CoursePart, PartId } from '../../types';
import { SectionArticle } from './SectionArticle';
import { TableOfContents } from './TableOfContents';
import { useProgress } from '../../store/progressStore';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Award, FlaskConical, ChevronDown, ChevronUp, BookCheck, ArrowRight } from 'lucide-react';

interface CourseViewerProps {
  coursePart: CoursePart;
  onStartQuiz: (partId: PartId) => void;
  onOpenSimulators: () => void;
}

export function CourseViewer({ coursePart, onStartQuiz, onOpenSimulators }: CourseViewerProps) {
  const { progress, markSectionCompleted } = useProgress();
  const [showCaseSolution, setShowCaseSolution] = useState(false);

  const partProgress = progress.parts[coursePart.id] || { completedSections: [], quizCompleted: false, bestScore: 0, attempts: 0 };
  const completedCount = partProgress.completedSections.length;
  const totalSections = coursePart.sections.length;

  return (
    <div className="flex gap-8 items-start">
      {/* Main Editorial Column */}
      <div className="flex-1 min-w-0">
        {/* Module Header Banner */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-card mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">
                Partie {coursePart.orderNumber} · Cours
              </Badge>
              <Badge variant="outline" size="sm">
                30 QCM d’évaluation
              </Badge>
            </div>
            {partProgress.bestScore > 0 && (
              <span className="text-xs font-semibold text-slate-500">
                Meilleur score : <b className="text-primary font-bold">{partProgress.bestScore}%</b>
              </span>
            )}
          </div>

          <h1 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
            {coursePart.title}
          </h1>
          <p className="mt-2 text-base text-slate-500 leading-relaxed max-w-3xl">
            {coursePart.subtitle}
          </p>

          <p className="mt-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
            {coursePart.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => onStartQuiz(coursePart.id)}
              className="gap-2 font-bold shadow-sm"
            >
              <Award className="h-4 w-4" />
              <span>Passer aux 30 QCM de la Partie {coursePart.orderNumber}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={onOpenSimulators}
              className="gap-2"
            >
              <FlaskConical className="h-4 w-4 text-slate-500" />
              <span>Laboratoire interactif</span>
            </Button>
            <div className="ml-auto text-xs text-slate-400 font-medium hidden sm:block">
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
        <section id="practical-case" className="rounded-3xl border border-teal-200/90 bg-white p-6 sm:p-8 shadow-card mt-12">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Cas Pratique d’Examen EFM
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {coursePart.practicalCase.title}
              </h3>
            </div>
            <Badge variant="accent" size="md">
              Application directe
            </Badge>
          </div>

          <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-200/80 p-5 text-sm text-slate-700 leading-relaxed">
            <p className="font-semibold text-slate-900 mb-1">Mise en situation :</p>
            <p className="whitespace-pre-line">{coursePart.practicalCase.scenario}</p>
          </div>

          <div className="mt-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 p-5 text-sm text-indigo-950 leading-relaxed">
            <p className="font-bold text-primary mb-1">Travail à faire :</p>
            <p>{coursePart.practicalCase.challenge}</p>
          </div>

          <div className="mt-5">
            <button
              onClick={() => setShowCaseSolution(!showCaseSolution)}
              className="flex items-center gap-2 text-xs font-bold text-teal-800 hover:text-teal-900 bg-teal-50 px-4 py-2 rounded-xl border border-teal-200 transition-colors"
            >
              <span>{showCaseSolution ? 'Masquer la correction type' : 'Voir la correction détaillée type EFM'}</span>
              {showCaseSolution ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {showCaseSolution && (
              <div className="mt-4 rounded-2xl border border-teal-200 bg-teal-50/40 p-5 animate-in fade-in duration-200">
                <div className="text-xs font-bold uppercase tracking-wider text-teal-900 mb-3">
                  Éléments de réponse attendus à l’examen :
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {coursePart.practicalCase.solutionPoints.map((sol, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="font-bold text-teal-700">➔</span>
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* End of Lesson CTA Card */}
        <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-indigo-50/50 via-white to-slate-50 p-8 sm:p-10 shadow-card mt-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-sm mb-4">
            <BookCheck className="h-7 w-7" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">
            Leçon terminée ! Prêt pour le test ?
          </h3>
          <p className="mt-2 text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Tu as parcouru les concepts fondamentaux de cette partie. Valide tes acquis dès maintenant avec les 30 QCM gradués.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onStartQuiz(coursePart.id)}
              className="font-bold shadow-sm"
            >
              <span>Commencer les 30 QCM de la Partie {coursePart.orderNumber}</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onOpenSimulators}
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

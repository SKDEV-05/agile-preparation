import React, { useState } from 'react';
import { CourseSection, PartId } from '../../types';
import { CourseDiagram } from './CourseDiagram';
import { CheckCircle2, AlertTriangle, Lightbulb, Check, X, BookmarkCheck } from 'lucide-react';
import { Button } from '../ui/Button';

interface SectionArticleProps {
  section: CourseSection;
  partId: PartId;
  isCompleted: boolean;
  onMarkCompleted: (sectionId: string) => void;
}

export function SectionArticle({ section, isCompleted, onMarkCompleted }: SectionArticleProps) {
  const [selectedMiniAnswer, setSelectedMiniAnswer] = useState<number | null>(null);
  const [isMiniAnswerChecked, setIsMiniAnswerChecked] = useState(false);

  const handleMiniCheck = (index: number) => {
    if (isMiniAnswerChecked) return;
    setSelectedMiniAnswer(index);
    setIsMiniAnswerChecked(true);
    if (index === section.miniQuestion?.correctIndex) {
      onMarkCompleted(section.id);
    }
  };

  return (
    <article id={section.id} className="scroll-mt-24 border-b border-slate-200/80 pb-12 mb-12">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 font-bold text-xs text-primary">
          {section.order}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          {section.title}
        </h2>
      </div>

      {/* 1. Définition */}
      <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4 sm:p-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <BookmarkCheck className="h-4 w-4" />
          Définition
        </div>
        <p className="mt-2 text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
          {section.definition}
        </p>
      </div>

      {/* 2. En termes simples */}
      <div className="mt-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          En termes simples
        </h3>
        <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
          {section.explanation}
        </p>
      </div>

      {/* 3. Exemples concrets */}
      {section.examples && section.examples.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Exemples concrets
          </h3>
          <div className="mt-2.5 space-y-2">
            {section.examples.map((ex, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-sm text-xs sm:text-sm text-slate-700 leading-relaxed">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500 font-bold text-[11px]">
                  {idx + 1}
                </span>
                <span>{ex}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Schéma interactif / vectoriel */}
      {section.diagramType && <CourseDiagram type={section.diagramType} />}

      {/* 5. À retenir & Attention (2 colonnes) */}
      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        {/* À retenir */}
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            À retenir pour l’examen
          </div>
          <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-700">
            {section.keyPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-2 leading-relaxed">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Attention / Pièges */}
        <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            Attention : Pièges fréquents
          </div>
          <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-700">
            {section.traps.map((tr, i) => (
              <li key={i} className="flex items-start gap-2 leading-relaxed">
                <span className="text-amber-600 font-bold">!</span>
                <span>{tr}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 6. Contexte d'Examen OFPPT */}
      {section.examContext && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-xs sm:text-sm text-slate-700">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-primary mt-0.5">
            <Lightbulb className="h-4 w-4" />
          </div>
          <div className="leading-relaxed">
            <span className="font-bold text-slate-900">Astuce Examen OFPPT : </span>
            {section.examContext}
          </div>
        </div>
      )}

      {/* 7. Mini question de compréhension interactive */}
      {section.miniQuestion && (
        <div className="mt-8 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Mini-Test de compréhension immédiate
            </span>
            <span className="text-[11px] font-medium text-slate-400">1 question</span>
          </div>

          <p className="mt-4 text-sm sm:text-base font-bold text-slate-900">
            {section.miniQuestion.question}
          </p>

          {/* Options */}
          <div className="mt-4 space-y-2.5">
            {section.miniQuestion.options.map((opt, idx) => {
              const isSelected = selectedMiniAnswer === idx;
              const isCorrect = idx === section.miniQuestion?.correctIndex;

              let btnCls = "w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ";
              if (!isMiniAnswerChecked) {
                btnCls += "border-slate-200/90 bg-slate-50/50 hover:bg-slate-100/80 hover:border-slate-300 text-slate-700";
              } else if (isCorrect) {
                btnCls += "border-emerald-300 bg-emerald-50 text-emerald-950 font-semibold";
              } else if (isSelected && !isCorrect) {
                btnCls += "border-red-300 bg-red-50 text-red-950";
              } else {
                btnCls += "border-slate-100 bg-slate-50/30 text-slate-400 opacity-60";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleMiniCheck(idx)}
                  disabled={isMiniAnswerChecked}
                  className={btnCls}
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white border border-slate-200 text-slate-700 font-bold text-xs mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-snug">{opt}</span>
                  {isMiniAnswerChecked && isCorrect && (
                    <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  )}
                  {isMiniAnswerChecked && isSelected && !isCorrect && (
                    <X className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {isMiniAnswerChecked && (
            <div className={`mt-4 rounded-xl p-3.5 text-xs sm:text-sm ${
              selectedMiniAnswer === section.miniQuestion.correctIndex
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                : 'bg-red-50 border border-red-200 text-red-900'
            }`}>
              <div className="font-bold flex items-center gap-1.5 mb-1">
                {selectedMiniAnswer === section.miniQuestion.correctIndex ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Excellente réponse !</span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-red-500" />
                    <span>Pas tout à fait.</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed text-slate-700">
                {section.miniQuestion.explanation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Completion footer button */}
      <div className="mt-6 flex justify-end">
        <Button
          size="sm"
          variant={isCompleted ? "secondary" : "outline"}
          onClick={() => onMarkCompleted(section.id)}
          className="gap-2"
        >
          <CheckCircle2 className={`h-4 w-4 ${isCompleted ? 'text-success' : 'text-slate-400'}`} />
          <span>{isCompleted ? 'Notion comprise ✓' : 'Marquer comme comprise'}</span>
        </Button>
      </div>
    </article>
  );
}

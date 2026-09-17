import React, { useState } from 'react';
import { CourseSection, PartId } from '../../types';
import { CourseDiagram } from './CourseDiagram';
import { Concept3DVisualizer } from './Concept3DVisualizer';
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Check,
  X,
  BookmarkCheck,
  Building2,
  BookOpen,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { Button } from '../ui/Button';
import { playCorrect, playIncorrect } from '../../lib/soundEffects';

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
      playCorrect();
    } else {
      playIncorrect();
    }
  };

  return (
    <article id={section.id} className="reveal-on-scroll scroll-mt-24 border-b border-slate-200 dark:border-white/10 pb-12 mb-12 text-slate-700 dark:text-slate-200">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 font-mono font-bold text-xs text-indigo-700 dark:text-indigo-400 shrink-0">
          {section.order}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          {section.title}
        </h2>
      </div>

      {/* 1. Définition Card */}
      <div className="mt-5 rounded-2xl border border-indigo-200 dark:border-indigo-500/30 bg-gradient-to-r from-indigo-50/80 via-white to-slate-50 dark:from-indigo-950/40 dark:via-slate-900/60 dark:to-slate-900/60 p-4 sm:p-5 shadow-sm dark:shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
          <BookmarkCheck className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
          <span>Définition Officielle</span>
        </div>
        <p className="mt-2 text-sm sm:text-base font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
          {section.definition}
        </p>
      </div>

      {/* 2. En termes simples */}
      <div className="mt-6">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          En termes simples & vulgarisation
        </h3>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {section.explanation}
        </p>
      </div>

      {/* 3. Explication Approfondie & Clés Pédagogiques */}
      {section.deepExplanation && (
        <div className="mt-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/70 p-5 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Explication Approfondie · Clés de Maîtrise</span>
          </h3>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal whitespace-pre-line">
            {section.deepExplanation}
          </p>
        </div>
      )}

      {/* 4. Exemples concrets */}
      {section.examples && section.examples.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Exemples concrets du quotidien
          </h3>
          <div className="mt-2.5 space-y-2">
            {section.examples.map((ex, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-xl border border-slate-200/80 dark:border-white/5 bg-white dark:bg-slate-900/60 p-3.5 shadow-sm text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono font-bold text-[11px]">
                  {idx + 1}
                </span>
                <span>{ex}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Étude de Cas Réelle en Entreprise */}
      {section.realWorldCase && (
        <div className="mt-7 rounded-3xl border border-cyan-200 dark:border-cyan-500/30 bg-gradient-to-br from-cyan-50/60 via-white to-indigo-50/40 dark:from-cyan-950/30 dark:via-slate-900/80 dark:to-indigo-950/30 p-5 sm:p-6 shadow-md dark:shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-cyan-200 dark:border-cyan-500/20">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-700 dark:text-cyan-300 uppercase tracking-wider">
              <Building2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <span>Cas Réel d'Entreprise · {section.realWorldCase.company}</span>
            </div>
            <span className="rounded-full bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-300 dark:border-cyan-500/30 px-2.5 py-0.5 text-[10px] font-bold text-cyan-800 dark:text-cyan-300 font-mono">
              {section.realWorldCase.sector}
            </span>
          </div>

          <div className="mt-4 space-y-3 text-xs sm:text-sm">
            <div>
              <span className="font-bold text-slate-900 dark:text-white">Le Défi rencontré : </span>
              <span className="text-slate-600 dark:text-slate-300">{section.realWorldCase.problem}</span>
            </div>
            <div>
              <span className="font-bold text-cyan-700 dark:text-cyan-300">Solution Agile adoptée : </span>
              <span className="text-slate-600 dark:text-slate-300">{section.realWorldCase.agileSolution}</span>
            </div>
            <div className="rounded-xl bg-cyan-100/70 dark:bg-cyan-950/50 border border-cyan-300 dark:border-cyan-500/30 p-3 text-cyan-900 dark:text-cyan-200 font-semibold text-xs flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <span><b>Résultat concret : </b>{section.realWorldCase.concreteResult}</span>
            </div>
          </div>
        </div>
      )}

      {/* 6. Visualisation 3D Interactive (si disponible) */}
      {section.model3D && (
        <div className="mt-6">
          <Concept3DVisualizer type={section.model3D} />
        </div>
      )}

      {/* 7. Schéma vectoriel 2D */}
      {section.diagramType && (
        <div className="mt-6">
          <CourseDiagram type={section.diagramType} />
        </div>
      )}


      {/* 9. À retenir & Attention (2 colonnes) */}
      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        {/* À retenir */}
        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/20 p-4 sm:p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>À retenir pour l’examen</span>
          </div>
          <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {section.keyPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-2 leading-relaxed">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Attention / Pièges */}
        <div className="rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/70 dark:bg-amber-950/20 p-4 sm:p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span>Attention : Pièges fréquents</span>
          </div>
          <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {section.traps.map((tr, i) => (
              <li key={i} className="flex items-start gap-2 leading-relaxed">
                <span className="text-amber-600 dark:text-amber-400 font-bold font-mono">!</span>
                <span>{tr}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 10. Contexte d'Examen OFPPT */}
      {section.examContext && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-indigo-200 dark:border-indigo-500/20 bg-indigo-50/80 dark:bg-indigo-950/30 p-4 shadow-sm text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 mt-0.5 border border-indigo-200 dark:border-indigo-500/30">
            <Lightbulb className="h-4 w-4" />
          </div>
          <div className="leading-relaxed">
            <span className="font-bold text-slate-900 dark:text-white">Astuce Examen OFPPT : </span>
            {section.examContext}
          </div>
        </div>
      )}

      {/* 11. Mini question de compréhension immédiate */}
      {section.miniQuestion && (
        <div className="mt-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 p-5 sm:p-6 shadow-md dark:shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Question Rapide · Auto-Évaluation</span>
            </span>
            <span className="text-[11px] font-mono text-slate-500">1 question</span>
          </div>

          <p className="mt-4 text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            {section.miniQuestion.question}
          </p>

          {/* Options */}
          <div className="mt-4 space-y-2.5">
            {section.miniQuestion.options.map((opt, idx) => {
              const isSelected = selectedMiniAnswer === idx;
              const isCorrect = idx === section.miniQuestion?.correctIndex;

              let btnCls = "w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ";
              if (!isMiniAnswerChecked) {
                btnCls += "border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/40 text-slate-700 dark:text-slate-200";
              } else if (isCorrect) {
                btnCls += "border-emerald-500/50 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-semibold";
              } else if (isSelected && !isCorrect) {
                btnCls += "border-red-500/50 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200 animate-error-shake";
              } else {
                btnCls += "border-slate-200 dark:border-white/5 bg-slate-100/50 dark:bg-slate-900/40 text-slate-400 dark:text-slate-500 opacity-50";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleMiniCheck(idx)}
                  disabled={isMiniAnswerChecked}
                  className={btnCls}
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 font-mono font-bold text-xs mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-snug">{opt}</span>
                  {isMiniAnswerChecked && isCorrect && (
                    <Check className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                  )}
                  {isMiniAnswerChecked && isSelected && !isCorrect && (
                    <X className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {isMiniAnswerChecked && (
            <div className={`mt-4 rounded-xl p-3.5 text-xs sm:text-sm ${
              selectedMiniAnswer === section.miniQuestion.correctIndex
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-200'
                : 'bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-500/40 text-red-900 dark:text-red-200'
            }`}>
              <div className="font-bold flex items-center gap-1.5 mb-1">
                {selectedMiniAnswer === section.miniQuestion.correctIndex ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Excellente réponse !</span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <span>Pas tout à fait.</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed text-slate-700 dark:text-slate-300">
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
          className={`gap-2 w-full sm:w-auto justify-center font-semibold text-xs ${
            isCompleted 
              ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30' 
              : 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <CheckCircle2 className={`h-4 w-4 ${isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`} />
          <span>{isCompleted ? 'Notion comprise ✓' : 'Marquer comme comprise'}</span>
        </Button>
      </div>
    </article>
  );
}

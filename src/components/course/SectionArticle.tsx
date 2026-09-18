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

  // Splits deepExplanation into clean, structured paragraphs
  const renderDeepExplanation = (text: string) => {
    const paragraphs = text
      .split(/\n+/)
      .map(p => p.trim())
      .filter(p => p.length > 0);

    return (
      <div className="space-y-3">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-sm sm:text-base leading-relaxed text-[#0A0A0A]/80 dark:text-white/80 font-normal">
            {para}
          </p>
        ))}
      </div>
    );
  };

  return (
    <article 
      id={section.id} 
      className="reveal-on-scroll scroll-mt-28 rounded-3xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] p-6 sm:p-9 shadow-lg mb-10 text-[#0A0A0A] dark:text-white transition-all relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#10B981]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      {/* Section Header with Step Pill & Completion Status */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 font-mono font-bold text-xs text-[#10B981] shrink-0">
            {section.order}
          </span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#10B981]">
            Notion {section.order} · Parcours d'Assimilation
          </span>
        </div>
        {isCompleted ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Notion validée</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#0A0A0A]/50 dark:text-white/50 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10">
            <span>À compléter</span>
          </span>
        )}
      </div>

      {/* Main Section Title */}
      <h2 className="relative z-10 mt-4 text-2xl sm:text-3xl font-black tracking-tight text-[#0A0A0A] dark:text-white leading-snug">
        {section.title}
      </h2>

      {/* Pedagogical Step Stepper Bar */}
      <div className="relative z-10 mt-6 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[11px] font-mono font-bold select-none">
        <div className="rounded-xl border border-[#10B981]/30 bg-[#10B981]/10 px-2 py-1.5 text-[#10B981]">
          1. Définition
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] px-2 py-1.5 text-[#0A0A0A]/70 dark:text-white/70">
          2. Analyse & Schéma
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] px-2 py-1.5 text-[#0A0A0A]/70 dark:text-white/70">
          3. Cas Réel
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] px-2 py-1.5 text-[#0A0A0A]/70 dark:text-white/70">
          4. Points Examen
        </div>
        <div className="col-span-2 sm:col-span-1 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] px-2 py-1.5 text-[#0A0A0A]/70 dark:text-white/70">
          5. Test Flash
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ÉTAPE 1 · FONDEMENT CONCEPTUEL & INTUITION
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 mt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#10B981]">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#10B981]/20 text-[#10B981] font-mono text-xs">01</span>
          <span>Étape 1 · Le Fondement Conceptuel & Vulgarisation</span>
        </div>

        {/* 1.A Définition Officielle */}
        <div className="rounded-2xl border-l-4 border-l-[#10B981] border-y border-r border-black/10 dark:border-white/10 bg-[#10B981]/5 p-4 sm:p-5 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#10B981]">
            <BookmarkCheck className="h-4 w-4 shrink-0 text-[#10B981]" />
            <span>Définition Officielle au Référentiel</span>
          </div>
          <p className="mt-2.5 text-sm sm:text-base font-semibold text-[#0A0A0A] dark:text-white leading-relaxed">
            {section.definition}
          </p>
        </div>

        {/* 1.B En termes simples (« En clair ») */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4 sm:p-5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0A]/60 dark:text-white/60 mb-2">
            <Lightbulb className="h-4 w-4 text-[#10B981]" />
            <span>En termes simples & vulgarisation (« En clair »)</span>
          </div>
          <p className="text-sm sm:text-base text-[#0A0A0A]/80 dark:text-white/80 leading-relaxed font-normal">
            <span className="font-handwriting text-xl text-[#10B981] font-bold mr-1.5">L'astuce pour retenir :</span>
            {section.explanation}
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ÉTAPE 2 · ANALYSE APPROFONDIE & SCHÉMAS VISUELS
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 mt-10 space-y-5">
        <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#10B981]">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#10B981]/20 text-[#10B981] font-mono text-xs">02</span>
          <span>Étape 2 · Analyse Approfondie & Mécanismes Clés</span>
        </div>

        {section.deepExplanation && (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-5 sm:p-6 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#10B981] font-mono mb-3">
              <BookOpen className="h-4 w-4" />
              <span>Clés de Maîtrise Théorique</span>
            </div>
            {renderDeepExplanation(section.deepExplanation)}
          </div>
        )}

        {/* Modèle 3D Interactif */}
        {section.model3D && (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden shadow-sm">
            <Concept3DVisualizer type={section.model3D} />
          </div>
        )}

        {/* Schéma vectoriel 2D */}
        {section.diagramType && (
          <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden shadow-sm">
            <CourseDiagram type={section.diagramType} />
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ÉTAPE 3 · CAS RÉEL D'ENTREPRISE & EXEMPLES
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 mt-10 space-y-5">
        <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#10B981]">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#10B981]/20 text-[#10B981] font-mono text-xs">03</span>
          <span>Étape 3 · Le Terrain & Cas Réel d'Entreprise</span>
        </div>

        {/* Exemples concrets */}
        {section.examples && section.examples.length > 0 && (
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0A]/60 dark:text-white/60">
              Exemples concrets d'application
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {section.examples.map((ex, idx) => (
                <div 
                  key={idx} 
                  className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-4 text-xs sm:text-sm text-[#0A0A0A]/80 dark:text-white/80 leading-relaxed shadow-xs flex items-start gap-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#10B981]/15 text-[#10B981] font-mono font-bold text-xs">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{ex}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Étude de Cas Réelle (Structured 3-Phase Flow) */}
        {section.realWorldCase && (
          <div className="rounded-3xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] p-5 sm:p-7 shadow-md relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-[#10B981] uppercase tracking-wider font-mono">
                <Building2 className="h-4 w-4 text-[#10B981]" />
                <span>Cas Réel d'Entreprise · {section.realWorldCase.company}</span>
              </div>
              <span className="rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 px-3 py-0.5 text-[11px] font-mono font-bold text-[#0A0A0A]/70 dark:text-white/70">
                {section.realWorldCase.sector}
              </span>
            </div>

            {/* 3-Step Flow Pipeline */}
            <div className="mt-5 grid md:grid-cols-3 gap-4">
              {/* Step 1: Défi */}
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#0A0A0A]/60 dark:text-white/60 uppercase tracking-wider mb-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-black/10 dark:bg-white/10 font-bold text-[10px]">1</span>
                    <span>Le Défi Métier</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#0A0A0A]/80 dark:text-white/80 leading-relaxed">
                    {section.realWorldCase.problem}
                  </p>
                </div>
              </div>

              {/* Step 2: Solution Agile */}
              <div className="rounded-2xl border border-[#10B981]/30 bg-[#10B981]/5 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider mb-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#10B981]/20 text-[#10B981] font-bold text-[10px]">2</span>
                    <span>Solution Agile Adoptée</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#0A0A0A]/90 dark:text-white/90 leading-relaxed font-medium">
                    {section.realWorldCase.agileSolution}
                  </p>
                </div>
              </div>

              {/* Step 3: Résultat Concret */}
              <div className="rounded-2xl border border-[#22C55E]/40 bg-[#22C55E]/10 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#22C55E] uppercase tracking-wider mb-2">
                    <Sparkles className="h-3.5 w-3.5 text-[#22C55E]" />
                    <span>Résultat Chiffré</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#0A0A0A] dark:text-white leading-relaxed">
                    {section.realWorldCase.concreteResult}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ÉTAPE 4 · RÉUSSIR L'EXAMEN : POINTS CLÉS & PIÈGES
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 mt-10 space-y-4">
        <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#10B981]">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#10B981]/20 text-[#10B981] font-mono text-xs">04</span>
          <span>Étape 4 · Points Examen & Pièges à Éviter</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Points Gagnants */}
          <div className="rounded-2xl border border-[#10B981]/30 bg-[#10B981]/5 p-5 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#10B981]">
              <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
              <span>À retenir pour l’examen</span>
            </div>
            <ul className="mt-3.5 space-y-2.5 text-xs sm:text-sm text-[#0A0A0A]/85 dark:text-white/85">
              {section.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#10B981]/20 text-[#10B981] text-[10px] font-bold mt-0.5">✓</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pièges Fréquents */}
          <div className="rounded-2xl border border-black/15 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.02] p-5 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#22C55E]">
              <AlertTriangle className="h-4 w-4 text-[#22C55E]" />
              <span>Attention aux pièges d’examen</span>
            </div>
            <ul className="mt-3.5 space-y-2.5 text-xs sm:text-sm text-[#0A0A0A]/85 dark:text-white/85">
              {section.traps.map((tr, i) => (
                <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#22C55E]/20 text-[#22C55E] text-[10px] font-bold font-mono mt-0.5">!</span>
                  <span>{tr}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Astuce Examen OFPPT */}
        {section.examContext && (
          <div className="flex items-start gap-3.5 rounded-2xl border border-[#10B981]/30 bg-[#10B981]/10 p-4 sm:p-5 shadow-xs text-xs sm:text-sm text-[#0A0A0A]/90 dark:text-white/90">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#10B981]/20 text-[#10B981] mt-0.5 border border-[#10B981]/30">
              <Lightbulb className="h-4 w-4" />
            </div>
            <div className="leading-relaxed">
              <span className="font-bold text-[#10B981] uppercase tracking-wider font-mono text-xs block mb-1">
                Conseil de l'examinateur OFPPT :
              </span>
              <span className="font-medium leading-relaxed">{section.examContext}</span>
            </div>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ÉTAPE 5 · AUTO-ÉVALUATION FLASH (MINI-QUESTION)
      ───────────────────────────────────────────────────────────── */}
      {section.miniQuestion && (
        <div className="relative z-10 mt-10 space-y-4">
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#10B981]">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#10B981]/20 text-[#10B981] font-mono text-xs">05</span>
            <span>Étape 5 · Auto-Évaluation Flash</span>
          </div>

          <div className="rounded-3xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] p-5 sm:p-7 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#10B981] flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4" />
                <span>Question de Validation Immédiate</span>
              </span>
              <span className="text-[11px] font-mono font-bold text-[#0A0A0A]/50 dark:text-white/50 bg-black/5 dark:bg-white/10 px-2.5 py-0.5 rounded-full">
                1 question · Test Flash
              </span>
            </div>

            <p className="mt-4 text-sm sm:text-base font-bold text-[#0A0A0A] dark:text-white leading-snug">
              {section.miniQuestion.question}
            </p>

            {/* Options */}
            <div className="mt-4 space-y-2.5">
              {section.miniQuestion.options.map((opt, idx) => {
                const isSelected = selectedMiniAnswer === idx;
                const isCorrect = idx === section.miniQuestion?.correctIndex;

                let btnCls = "w-full text-left p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3.5 cursor-pointer ";
                if (!isMiniAnswerChecked) {
                  btnCls += "border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/5 dark:hover:bg-white/5 hover:border-[#10B981]/40 text-[#0A0A0A] dark:text-white";
                } else if (isCorrect) {
                  btnCls += "border-[#10B981] bg-[#10B981]/15 text-[#0A0A0A] dark:text-white font-semibold ring-2 ring-[#10B981]/30";
                } else if (isSelected && !isCorrect) {
                  btnCls += "border-black/40 bg-black/10 dark:bg-white/10 text-[#0A0A0A] dark:text-white animate-error-shake";
                } else {
                  btnCls += "border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01] text-[#0A0A0A]/40 dark:text-white/40 opacity-40";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleMiniCheck(idx)}
                    disabled={isMiniAnswerChecked}
                    className={btnCls}
                  >
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-mono font-bold text-xs mt-0.5 border ${
                      isMiniAnswerChecked && isCorrect 
                        ? 'bg-[#10B981] text-white border-[#10B981]' 
                        : 'bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/15 text-[#0A0A0A] dark:text-white'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt}</span>
                    {isMiniAnswerChecked && isCorrect && (
                      <Check className="h-5 w-5 shrink-0 text-[#10B981] mt-0.5" />
                    )}
                    {isMiniAnswerChecked && isSelected && !isCorrect && (
                      <X className="h-5 w-5 shrink-0 text-[#22C55E] mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback message */}
            {isMiniAnswerChecked && (
              <div className={`mt-5 rounded-2xl p-4 text-xs sm:text-sm border animate-in fade-in duration-200 ${
                selectedMiniAnswer === section.miniQuestion.correctIndex
                  ? 'bg-[#10B981]/15 border-[#10B981]/40 text-[#0A0A0A] dark:text-white'
                  : 'bg-black/5 dark:bg-white/5 border-black/15 dark:border-white/15 text-[#0A0A0A] dark:text-white'
              }`}>
                <div className="font-bold flex items-center gap-2 mb-1.5">
                  {selectedMiniAnswer === section.miniQuestion.correctIndex ? (
                    <>
                      <Check className="h-5 w-5 text-[#10B981]" />
                      <span className="text-[#10B981] font-extrabold text-sm">Excellente réponse ! Notion assimilée.</span>
                    </>
                  ) : (
                    <>
                      <X className="h-5 w-5 text-[#22C55E]" />
                      <span className="text-[#22C55E] font-extrabold text-sm">Pas tout à fait. Voici l'explication :</span>
                    </>
                  )}
                </div>
                <p className="leading-relaxed text-[#0A0A0A]/80 dark:text-white/80">
                  {section.miniQuestion.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Completion footer button */}
      <div className="relative z-10 mt-8 pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-[#0A0A0A]/60 dark:text-white/60 font-mono">
          {isCompleted ? (
            <span className="text-[#10B981] font-bold flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              Notion {section.order} validée avec succès
            </span>
          ) : (
            <span>Clique sur le bouton pour valider cette étape</span>
          )}
        </div>
        <Button
          size="md"
          variant={isCompleted ? "secondary" : "outline"}
          onClick={() => onMarkCompleted(section.id)}
          className={`gap-2 w-full sm:w-auto justify-center font-bold text-xs cursor-pointer ${
            isCompleted 
              ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/40 shadow-xs' 
              : 'border-black/15 dark:border-white/20 bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-white hover:border-[#10B981] hover:text-[#10B981]'
          }`}
        >
          <CheckCircle2 className={`h-4 w-4 ${isCompleted ? 'text-[#10B981]' : 'text-[#0A0A0A]/40 dark:text-white/40'}`} />
          <span>{isCompleted ? 'Notion comprise ✓' : 'Marquer l’étape comme comprise'}</span>
        </Button>
      </div>
    </article>
  );
}

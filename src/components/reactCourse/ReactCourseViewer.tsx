import React, { useState } from 'react';
import { ReactCourseModule, ReactModuleId } from '../../types/reactTypes';
import { REACT_MODULES_MAP } from '../../data/reactCourse';
import { ConceptCard } from './ConceptCard';
import { MiniQuizCard } from './MiniQuizCard';
import { InteractiveCodeBlock } from './InteractiveCodeBlock';
import { VirtualDomVisualizer } from '../reactVisualizers/VirtualDomVisualizer';
import { PropsTreeVisualizer } from '../reactVisualizers/PropsTreeVisualizer';
import { StateLifecycleVisualizer } from '../reactVisualizers/StateLifecycleVisualizer';
import { ReduxFlowVisualizer } from '../reactVisualizers/ReduxFlowVisualizer';
import { useReactProgress } from '../../store/reactProgressStore';
import { 
  BookOpen, 
  Award, 
  FlaskConical, 
  CheckCircle2, 
  ArrowRight, 
  Code2, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface ReactCourseViewerProps {
  moduleId: ReactModuleId;
  onStartModuleQuiz: (moduleId: ReactModuleId) => void;
  onOpenPlayground: (code?: string) => void;
  onOpenLaboratory: () => void;
}

export function ReactCourseViewer({
  moduleId,
  onStartModuleQuiz,
  onOpenPlayground,
  onOpenLaboratory
}: ReactCourseViewerProps) {
  const moduleData: ReactCourseModule = REACT_MODULES_MAP[moduleId];
  const { progress, markSectionCompleted } = useReactProgress();
  const [showChallengeSolution, setShowChallengeSolution] = useState(false);

  if (!moduleData) return null;

  const moduleProgress = progress.modules[moduleId] || {
    completedSections: [],
    quizCompleted: false,
    bestScore: 0,
    attempts: 0
  };

  const renderVisualizer = (diagramType?: string) => {
    switch (diagramType) {
      case 'virtual_dom_diff':
      case 'spa_vs_mpa':
        return <VirtualDomVisualizer />;
      case 'props_tree':
      case 'stack_vs_heap':
        return <PropsTreeVisualizer />;
      case 'state_render_cycle':
      case 'use_effect_lifecycle':
        return <StateLifecycleVisualizer />;
      case 'redux_unidirectional':
      case 'rtk_thunk_flow':
        return <ReduxFlowVisualizer />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-[#0A0A0A] dark:text-white select-none pb-12">
      {/* 1. MODULE HERO BANNER */}
      <section className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-6 sm:p-8 overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-[#10B981]/15 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] font-mono text-xs font-bold border border-[#10B981]/30">
              Module 0{moduleData.orderNumber} · {moduleData.pdfReference}
            </span>
            <span className="text-xs font-mono text-[#0A0A0A]/50 dark:text-white/50">
              Référentiel Officiel OFPPT Front-End React
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[#0A0A0A] dark:text-white">
            {moduleData.title}
          </h1>

          <p className="text-xs sm:text-sm text-[#0A0A0A]/70 dark:text-white/70 max-w-3xl leading-relaxed">
            {moduleData.description}
          </p>

          {/* Progress and quick stats */}
          <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-black/10 dark:border-white/10 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="text-[#0A0A0A]/60 dark:text-white/60">Progression :</span>
              <span className="font-bold text-[#10B981]">
                {moduleProgress.completedSections.length} / {moduleData.sections.length} Étapes
              </span>
            </div>

            {moduleProgress.bestScore > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="text-[#0A0A0A]/60 dark:text-white/60">Meilleur Score QCM :</span>
                <span className="font-bold text-[#22C55E]">{moduleProgress.bestScore}%</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. PROGRESSIVE SECTIONS */}
      <div className="space-y-10">
        {moduleData.sections.map((sec, idx) => {
          const isCompleted = moduleProgress.completedSections.includes(sec.id);

          return (
            <div key={sec.id} id={sec.id} className="space-y-4 scroll-mt-24">
              {/* Concept Presentation */}
              <ConceptCard
                order={sec.order}
                title={sec.title}
                quickSummary={sec.quickSummary}
                conceptExplanation={sec.conceptExplanation}
                deepExplanation={sec.deepExplanation}
                keyPoints={sec.keyPoints}
                examTraps={sec.examTraps}
              />

              {/* Interactive Visualizer if applicable */}
              {sec.diagramType && (
                <div className="pt-1">
                  {renderVisualizer(sec.diagramType)}
                </div>
              )}

              {/* Practical Code Examples */}
              {sec.codeExamples && sec.codeExamples.length > 0 && (
                <div className="space-y-3 pt-1">
                  {sec.codeExamples.map((ex, exIdx) => (
                    <InteractiveCodeBlock
                      key={exIdx}
                      title={ex.title}
                      description={ex.description}
                      code={ex.code}
                      outputPreview={ex.outputPreview}
                      onOpenPlayground={onOpenPlayground}
                    />
                  ))}
                </div>
              )}

              {/* Instant Mini-Quiz check */}
              {sec.miniQuestion && (
                <div className="pt-1">
                  <MiniQuizCard question={sec.miniQuestion} />
                </div>
              )}

              {/* Step Completion Toggle */}
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => markSectionCompleted(moduleId, sec.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                      : 'bg-black/5 dark:bg-white/5 hover:bg-[#10B981]/10 text-[#0A0A0A]/70 dark:text-white/70 hover:text-[#10B981] border border-black/10 dark:border-white/10'
                  }`}
                >
                  <CheckCircle2 className={`h-4 w-4 ${isCompleted ? 'text-[#10B981]' : 'opacity-40'}`} />
                  <span>{isCompleted ? 'Étape validée ✓' : 'Marquer comme assimilé'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. PRACTICAL CHALLENGE OF THE MODULE */}
      <section className="rounded-3xl border border-[#10B981]/30 bg-gradient-to-br from-[#10B981]/5 to-transparent p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#10B981]">
            <FlaskConical className="h-4 w-4" />
            <span>Défi Pratique du Module</span>
          </div>
          <span className="text-[10px] font-mono bg-[#10B981]/15 text-[#10B981] px-2 py-0.5 rounded font-bold">
            Application Immédiate
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-[#0A0A0A] dark:text-white">
          {moduleData.practicalChallenge.title}
        </h3>

        <p className="text-xs sm:text-sm text-[#0A0A0A]/80 dark:text-white/80 leading-relaxed">
          {moduleData.practicalChallenge.description}
        </p>

        {/* Starter Code */}
        <InteractiveCodeBlock
          title="Code d'amorçage à compléter"
          description="Testez vos compétences directement :"
          code={moduleData.practicalChallenge.starterCode}
          onOpenPlayground={onOpenPlayground}
        />

        {/* Toggle Solution */}
        <div className="pt-2">
          <button
            onClick={() => setShowChallengeSolution(prev => !prev)}
            className="flex items-center gap-2 text-xs font-mono font-bold text-[#10B981] hover:underline cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{showChallengeSolution ? 'Masquer le corrigé officiel' : 'Consulter le corrigé officiel & explication'}</span>
          </button>

          {showChallengeSolution && (
            <div className="mt-3 space-y-3 p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10">
              <InteractiveCodeBlock
                title="Corrigé Officiel OFPPT"
                description="Solution conforme aux standards :"
                code={moduleData.practicalChallenge.solutionCode}
                outputPreview={moduleData.practicalChallenge.expectedOutcome}
                onOpenPlayground={onOpenPlayground}
              />
              <p className="text-xs text-[#0A0A0A]/80 dark:text-white/80 font-mono leading-relaxed">
                <strong>Analyse :</strong> {moduleData.practicalChallenge.explanation}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 4. MODULE VALIDATION FOOTER (QUIZ + LABS) */}
      <section className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#10B981]">
            <Award className="h-4 w-4" />
            <span>Évaluation de Fin de Module</span>
          </div>
          <h3 className="text-xl font-bold text-[#0A0A0A] dark:text-white">
            Prêt à valider vos compétences sur ce module ?
          </h3>
          <p className="text-xs text-[#0A0A0A]/70 dark:text-white/70 max-w-xl">
            Passez le QCM officiel de 10 questions pour enregistrer votre score et identifier vos éventuelles erreurs dans votre carnet.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => onStartModuleQuiz(moduleId)}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#10B981] hover:bg-[#22C55E] text-white font-bold text-xs shadow-md shadow-[#10B981]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Award className="h-4 w-4" />
            <span>Lancer le QCM (10 Questions)</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={onOpenLaboratory}
            className="w-full sm:w-auto px-4 py-3 rounded-2xl border border-black/15 dark:border-white/15 hover:border-[#10B981] hover:text-[#10B981] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <FlaskConical className="h-4 w-4 text-[#10B981]" />
            <span>Laboratoire Interactif</span>
          </button>
        </div>
      </section>
    </div>
  );
}

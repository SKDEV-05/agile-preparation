import React from 'react';
import { Target, CheckSquare, BookOpen, Bug, Sparkles } from 'lucide-react';
import { LabExercise } from '../../types/reactLabTypes';

interface LabBriefProps {
  exercise: LabExercise;
  onTriggerBreakIt?: () => void;
  onOpenLesson?: () => void;
}

export function LabBrief({ exercise, onTriggerBreakIt, onOpenLesson }: LabBriefProps) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#141414] border-r border-slate-200 dark:border-white/10 text-slate-800 dark:text-white overflow-y-auto p-4 space-y-4 text-xs font-mono transition-colors">
      {/* 1. Goal & Concepts */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#10B981] tracking-wider">
          <Target className="h-3.5 w-3.5" />
          <span>Objectif de l'Atelier</span>
        </div>
        <p className="text-sm font-bold text-slate-900 dark:text-white font-sans leading-snug">
          {exercise.subtitle}
        </p>

        {/* Concepts Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {exercise.concepts.map(c => (
            <span
              key={c}
              className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[10px] text-slate-700 dark:text-white/70 font-bold"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="h-px bg-slate-200 dark:bg-white/10" />

      {/* 2. Step-by-step Task Instructions */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-500 dark:text-white/50 tracking-wider">
          <CheckSquare className="h-3.5 w-3.5 text-[#10B981]" />
          <span>Instructions &amp; Mission</span>
        </div>

        <div className="space-y-2">
          {exercise.taskInstructions.map((instruction, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
              <span className="h-5 w-5 rounded-full bg-[#10B981]/20 text-[#10B981] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-xs text-slate-700 dark:text-white/80 font-sans leading-relaxed">
                {instruction}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-slate-200 dark:bg-white/10" />

      {/* 3. Acceptance Criteria Checklist */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#10B981] tracking-wider">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Critères de Validation Requis</span>
        </div>

        <div className="space-y-1.5">
          {exercise.tests.map(test => (
            <div key={test.id} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] shrink-0 mt-1.5" />
              <span className="font-sans leading-snug">{test.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Action Cards (Break It / Open Lesson) */}
      <div className="space-y-2 pt-2 mt-auto">
        {exercise.breakItChallenge && onTriggerBreakIt && (
          <button
            onClick={onTriggerBreakIt}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2">
              <Bug className="h-4 w-4 shrink-0 text-rose-500" />
              <div>
                <div className="font-bold text-[11px]">Mode "Chasse aux Bugs"</div>
                <div className="text-[10px] opacity-80 font-sans">Injecter un bug réaliste d'examen à diagnostiquer</div>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-rose-500/20 px-2 py-0.5 rounded">Défi</span>
          </button>
        )}

        {onOpenLesson && (
          <button
            onClick={onOpenLesson}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-slate-700 dark:text-white/80 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 shrink-0 text-[#10B981]" />
              <div>
                <div className="font-bold text-[11px]">Consulter le Cours Associé</div>
                <div className="text-[10px] opacity-70 font-sans">Fiche théorique et exemples de syntaxe</div>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-[#10B981]/20 text-[#10B981] px-2 py-0.5 rounded">Fiche</span>
          </button>
        )}
      </div>
    </div>
  );
}

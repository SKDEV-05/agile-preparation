import React from 'react';
import { Sparkles, AlertTriangle, Lightbulb, BookOpen } from 'lucide-react';

interface ConceptCardProps {
  order: string;
  title: string;
  quickSummary: string;
  conceptExplanation: string;
  deepExplanation?: string;
  keyPoints: string[];
  examTraps: string[];
}

export function ConceptCard({
  order,
  title,
  quickSummary,
  conceptExplanation,
  deepExplanation,
  keyPoints,
  examTraps
}: ConceptCardProps) {
  return (
    <div className="rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-5 sm:p-7 space-y-4 shadow-xs">
      {/* Top Tag & Title */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#10B981]">
          <span className="bg-[#10B981]/15 px-2 py-0.5 rounded">Étape {order}</span>
          <span className="text-[#0A0A0A]/40 dark:text-white/40">·</span>
          <span className="text-[#0A0A0A]/70 dark:text-white/70">{quickSummary}</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-[#0A0A0A] dark:text-white tracking-tight">
          {title}
        </h3>
      </div>

      {/* Main explanation */}
      <div className="text-xs sm:text-sm text-[#0A0A0A]/80 dark:text-white/80 leading-relaxed font-normal">
        {conceptExplanation}
      </div>

      {deepExplanation && (
        <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 text-xs text-[#0A0A0A]/70 dark:text-white/70 leading-relaxed font-normal">
          {deepExplanation}
        </div>
      )}

      {/* Key Takeaways & Traps Grid */}
      <div className="grid md:grid-cols-2 gap-3 pt-2">
        {/* Key Points */}
        <div className="rounded-xl border border-[#10B981]/25 bg-[#10B981]/5 p-3.5 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#10B981]">
            <Lightbulb className="h-3.5 w-3.5 shrink-0" />
            <span>Points Clés Officiels</span>
          </div>
          <ul className="space-y-1 text-xs text-[#0A0A0A]/80 dark:text-white/80 list-disc list-inside">
            {keyPoints.map((pt, i) => (
              <li key={i} className="leading-snug">{pt}</li>
            ))}
          </ul>
        </div>

        {/* Traps */}
        {examTraps.length > 0 && (
          <div className="rounded-xl border border-red-500/25 bg-red-500/5 p-3.5 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-red-500">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              <span>Pièges d'Examen Fréquents</span>
            </div>
            <ul className="space-y-1 text-xs text-[#0A0A0A]/80 dark:text-white/80 list-disc list-inside">
              {examTraps.map((tr, i) => (
                <li key={i} className="leading-snug">{tr}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

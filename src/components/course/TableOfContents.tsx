import React, { useEffect, useState } from 'react';
import { CourseSection } from '../../types';
import { cn } from '../../lib/utils';
import { CheckCircle2, Circle, Sparkles, Compass } from 'lucide-react';

interface TableOfContentsProps {
  sections: CourseSection[];
  completedSectionIds: string[];
}

export function TableOfContents({ sections, completedSectionIds }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(section.id);
            break;
          }
        }
      }
      // Check practical case
      const practicalEl = document.getElementById('practical-case');
      if (practicalEl) {
        const top = practicalEl.offsetTop;
        if (scrollPosition >= top - 80) {
          setActiveId('practical-case');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -85;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const progressPercent = sections.length > 0 ? Math.round((completedSectionIds.length / sections.length) * 100) : 0;

  return (
    <aside className="hidden lg:block w-72 shrink-0 self-start sticky top-20 z-20 select-none">
      <div className="rounded-3xl border border-black/15 dark:border-white/15 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-xl p-5 shadow-xl transition-all">
        {/* Header with Title and Percentage Badge */}
        <div className="flex items-center justify-between pb-3.5 border-b border-black/10 dark:border-white/10">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#10B981]">
              <Compass className="h-3.5 w-3.5 text-[#10B981]" />
              <span>Étapes du cours</span>
            </div>
            <p className="text-[11px] font-mono text-[#0A0A0A]/60 dark:text-white/60 mt-0.5">
              {completedSectionIds.length} / {sections.length} notions validées
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#10B981] bg-[#10B981]/15 px-2.5 py-1 rounded-xl border border-[#10B981]/30">
            {progressPercent}%
          </span>
        </div>

        {/* Mini progress bar */}
        <div className="mt-3.5 h-1.5 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#10B981] to-[#22C55E] transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Section Step Items */}
        <div className="mt-4 space-y-1.5 max-h-[calc(100vh-16rem)] overflow-y-auto no-scrollbar pr-0.5">
          {sections.map(sec => {
            const isCurrent = activeId === sec.id;
            const isCompleted = completedSectionIds.includes(sec.id);

            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={cn(
                  "group flex w-full items-start gap-2.5 rounded-2xl px-3 py-2.5 text-left text-xs transition-all cursor-pointer",
                  isCurrent
                    ? "bg-[#10B981]/15 text-[#10B981] font-bold border border-[#10B981]/40 shadow-2xs"
                    : isCompleted
                      ? "bg-black/[0.02] dark:bg-white/[0.02] text-[#0A0A0A]/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/5 border border-transparent"
                      : "text-[#0A0A0A]/65 dark:text-white/65 hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#0A0A0A] dark:hover:text-white border border-transparent"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#10B981] mt-0.5" />
                ) : (
                  <Circle className={cn(
                    "h-4 w-4 shrink-0 mt-0.5 transition-colors",
                    isCurrent ? "text-[#10B981] fill-[#10B981]/20" : "text-[#0A0A0A]/25 dark:text-white/25 group-hover:text-[#10B981]"
                  )} />
                )}
                <span className="line-clamp-2 leading-relaxed">
                  <span className={cn("font-mono font-bold mr-1", isCurrent ? "text-[#10B981]" : "text-[#10B981]/80")}>
                    Étape {sec.order} ·
                  </span>
                  <span className="font-medium">{sec.title}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Practical Case link */}
        <button
          onClick={() => scrollToSection('practical-case')}
          className={cn(
            "mt-4 block w-full border-t border-black/10 dark:border-white/10 pt-3 text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer px-2 py-1.5 rounded-xl",
            activeId === 'practical-case'
              ? "bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30"
              : "text-[#22C55E] hover:bg-[#22C55E]/10"
          )}
        >
          <span className="flex items-center gap-1.5 truncate">
            <Sparkles className="h-3.5 w-3.5 text-[#22C55E] shrink-0" />
            <span className="truncate">Étape Finale · Cas Pratique EFM</span>
          </span>
          <span className="text-[10px] font-mono text-[#22C55E] bg-[#22C55E]/15 px-1.5 py-0.2 rounded-md shrink-0">
            Corrigé
          </span>
        </button>
      </div>
    </aside>
  );
}

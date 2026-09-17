import React, { useEffect, useState } from 'react';
import { CourseSection } from '../../types';
import { cn } from '../../lib/utils';
import { CheckCircle2, Circle } from 'lucide-react';

interface TableOfContentsProps {
  sections: CourseSection[];
  completedSectionIds: string[];
}

export function TableOfContents({ sections, completedSectionIds }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="hidden xl:block w-64 shrink-0">
      <div className="sticky top-24 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0D1526]/85 backdrop-blur-xl p-5 shadow-lg dark:shadow-2xl">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Sommaire du cours
        </h4>
        <div className="mt-4 space-y-1">
          {sections.map(sec => {
            const isCurrent = activeId === sec.id;
            const isCompleted = completedSectionIds.includes(sec.id);

            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={cn(
                  "group flex w-full items-start gap-2.5 rounded-xl px-2.5 py-2 text-left text-xs transition-all",
                  isCurrent
                    ? "bg-indigo-50 dark:bg-indigo-600/20 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-500/30 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-200 border border-transparent"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                ) : (
                  <Circle className={cn(
                    "h-4 w-4 shrink-0 mt-0.5",
                    isCurrent ? "text-indigo-600 dark:text-indigo-400 fill-indigo-100 dark:fill-indigo-400/20" : "text-slate-300 dark:text-slate-600"
                  )} />
                )}
                <span className="line-clamp-2 leading-relaxed">
                  {sec.order}. {sec.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Practical Case link */}
        <button
          onClick={() => scrollToSection('practical-case')}
          className="mt-3 block w-full border-t border-slate-200 dark:border-white/10 pt-3 text-left text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
        >
          ✦ Cas Pratique & Corrigé
        </button>
      </div>
    </div>
  );
}

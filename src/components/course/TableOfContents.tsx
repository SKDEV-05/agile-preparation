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
      <div className="sticky top-24 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
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
                  "group flex w-full items-start gap-2.5 rounded-xl px-2.5 py-2 text-left text-xs transition-colors",
                  isCurrent
                    ? "bg-indigo-50/80 text-primary font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-success mt-0.5" />
                ) : (
                  <Circle className={cn(
                    "h-4 w-4 shrink-0 mt-0.5",
                    isCurrent ? "text-primary fill-primary/20" : "text-slate-300"
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
          className="mt-3 block w-full border-t border-slate-100 pt-3 text-left text-xs font-semibold text-teal-700 hover:text-teal-800"
        >
          ✦ Cas Pratique & Corrigé
        </button>
      </div>
    </div>
  );
}

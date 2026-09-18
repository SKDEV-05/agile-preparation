import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, BookOpen, FlaskConical, CreditCard, Award, CornerDownLeft } from 'lucide-react';
import { COURSE_PARTS } from '../../data/course';
import { FLASHCARDS } from '../../data/flashcards';
import { PartId } from '../../types';
import { ActiveView } from '../layout/Sidebar';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ActiveView, partId?: PartId) => void;
}

interface SearchItem {
  id: string;
  category: 'Modules' | 'Notions' | 'Simulateurs' | 'Flashcards' | 'Évaluation';
  title: string;
  subtitle: string;
  badge?: string;
  action: () => void;
}

export function CommandPalette({ isOpen, onClose, onNavigate }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        setSelectedIndex(0);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Build searchable index from real course data, simulators, flashcards
  const allItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [];

    // 1. Course Modules
    COURSE_PARTS.forEach(part => {
      items.push({
        id: `module-${part.id}`,
        category: 'Modules',
        title: part.title,
        subtitle: part.subtitle,
        badge: `Partie 0${part.orderNumber}`,
        action: () => {
          onNavigate(part.id);
          onClose();
        }
      });

      // 2. Sections / Lessons
      part.sections.forEach(sec => {
        items.push({
          id: `sec-${sec.id}`,
          category: 'Notions',
          title: sec.title,
          subtitle: `${part.title} · ${sec.definition.slice(0, 75)}...`,
          badge: sec.order,
          action: () => {
            onNavigate(part.id);
            onClose();
          }
        });
      });
    });

    // 3. Simulators
    const simulators = [
      { id: 'pert', name: 'Simulateur PERT Lab', desc: 'Calcul de dates au plus tôt/tard, marges et chemin critique' },
      { id: 'gantt', name: 'Simulateur Gantt Planning', desc: 'Timeline dynamique, durées des phases et jalons' },
      { id: 'jira', name: 'Simulateur Jira Board', desc: 'Gestion de tickets, sprint backlog et colonnes Scrum' },
      { id: 'git', name: 'Simulateur Git 4 Zones CLI', desc: 'Commandes terminal, staging, commits et branches' },
      { id: 'pipeline', name: 'Simulateur DevOps CI/CD', desc: 'Pipeline GitLab CI, jobs de test, SonarQube et déploiement' }
    ];

    simulators.forEach(sim => {
      items.push({
        id: `sim-${sim.id}`,
        category: 'Simulateurs',
        title: sim.name,
        subtitle: sim.desc,
        badge: 'Laboratoire',
        action: () => {
          onNavigate('simulators');
          onClose();
        }
      });
    });

    // 4. Flashcards
    FLASHCARDS.slice(0, 10).forEach(fc => {
      items.push({
        id: `fc-${fc.id}`,
        category: 'Flashcards',
        title: fc.front,
        subtitle: fc.back.slice(0, 75) + '...',
        badge: fc.category,
        action: () => {
          onNavigate('flashcards');
          onClose();
        }
      });
    });

    // 5. Final Exam
    items.push({
      id: 'final-exam-item',
      category: 'Évaluation',
      title: 'Examen Blanc Officiel (50 QCM)',
      subtitle: '45 minutes en conditions réelles EFM sur l’ensemble des 5 modules',
      badge: '50 QCM',
      action: () => {
        onNavigate('final-exam');
        onClose();
      }
    });

    return items;
  }, [onNavigate, onClose]);

  // Filter items matching query
  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      // Default recommended quick starts
      return allItems.slice(0, 7);
    }
    const q = query.toLowerCase();
    return allItems
      .filter(it => 
        it.title.toLowerCase().includes(q) || 
        it.subtitle.toLowerCase().includes(q) ||
        it.category.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [allItems, query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = filteredItems[selectedIndex];
      if (item) {
        item.action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  const categoryIcons: Record<string, any> = {
    Modules: BookOpen,
    Notions: BookOpen,
    Simulateurs: FlaskConical,
    Flashcards: CreditCard,
    Évaluation: Award,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 select-none">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0A0A0A]/70 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Palette Container */}
      <div 
        className="relative z-10 w-full max-w-2xl rounded-3xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] shadow-2xl overflow-hidden flex flex-col max-h-[80vh] transition-all"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-black/15 dark:border-white/15">
          <Search className="h-5 w-5 text-[#10B981] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Rechercher un cours, une notion, un simulateur, une question..."
            className="flex-1 bg-transparent text-sm sm:text-base font-medium text-[#0A0A0A] dark:text-white placeholder-[#0A0A0A]/40 dark:placeholder-white/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="h-6 w-6 rounded-md flex items-center justify-center text-[#0A0A0A]/40 dark:text-white/40 hover:text-[#0A0A0A] dark:hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold rounded-lg border border-black/15 dark:border-white/15 text-[#0A0A0A]/60 dark:text-white/60">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-[#0A0A0A]/60 dark:text-white/60">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-40 text-[#10B981]" />
              <p className="text-sm font-semibold text-[#0A0A0A] dark:text-white">Aucun résultat trouvé pour « {query} »</p>
              <p className="text-xs mt-1">Essaie avec "PERT", "Scrum", "Git", "SonarQube" ou "Sprint".</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = categoryIcons[item.category] || BookOpen;

              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between gap-3 p-3 rounded-2xl text-left transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-[#10B981]/10 border border-[#10B981]/40 text-[#0A0A0A] dark:text-white' 
                      : 'border border-transparent text-[#0A0A0A]/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isSelected 
                        ? 'bg-[#10B981] text-white' 
                        : 'bg-black/5 dark:bg-white/10 text-[#0A0A0A] dark:text-white border border-black/10 dark:border-white/10'
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold truncate text-[#0A0A0A] dark:text-white">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="rounded-md px-1.5 py-0.2 text-[10px] font-mono font-bold bg-black/5 dark:bg-white/10 text-[#0A0A0A]/70 dark:text-white/70 border border-black/10 dark:border-white/10 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#0A0A0A]/60 dark:text-white/60 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5">
                    {isSelected ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-[#10B981]">
                        <span>Ouvrir</span>
                        <CornerDownLeft className="h-3.5 w-3.5" />
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#0A0A0A]/40 dark:text-white/40 font-medium">
                        {item.category}
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-2.5 border-t border-black/15 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between text-[11px] text-[#0A0A0A]/50 dark:text-white/50 font-medium">
          <div className="flex items-center gap-3">
            <span>↑↓ pour naviguer</span>
            <span>↵ pour sélectionner</span>
          </div>
          <span>FullStack 2A Search</span>
        </div>
      </div>
    </div>
  );
}

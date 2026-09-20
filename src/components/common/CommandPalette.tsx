import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, 
  X, 
  BookOpen, 
  FlaskConical, 
  CreditCard, 
  Award, 
  CornerDownLeft, 
  Code2, 
  AlertTriangle, 
  Layers, 
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { COURSE_PARTS } from '../../data/course';
import { FLASHCARDS } from '../../data/flashcards';
import { REACT_MODULES } from '../../data/reactCourse';
import { ALL_REACT_LABS } from '../../data/reactLabs';
import { REACT_FLASHCARDS } from '../../data/reactFlashcards';
import { PartId } from '../../types';
import { ActiveView } from '../layout/Sidebar';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ActiveView, partId?: PartId) => void;
  activeView?: ActiveView;
}

type SearchScope = 'all' | 'react' | 'agile';

interface SearchItem {
  id: string;
  scope: 'react' | 'agile';
  category: 'Modules' | 'Notions' | 'Laboratoires' | 'Simulateurs' | 'Flashcards' | 'Évaluation' | 'Anti-Pièges';
  title: string;
  subtitle: string;
  badge?: string;
  scopeBadge: string;
  action: () => void;
}

export function CommandPalette({ isOpen, onClose, onNavigate, activeView }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scope, setScope] = useState<SearchScope>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Synchronize initial scope with the user's current context
  useEffect(() => {
    if (isOpen) {
      if (activeView?.startsWith('react')) {
        setScope('react');
      } else {
        setScope('all');
      }
      setQuery('');
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, activeView]);

  // Build unified searchable index from both React M204 & Agile M202
  const allItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [];

    // ==========================================
    // 1. REACT M204 CONTENT
    // ==========================================

    // React Modules 1 to 8
    REACT_MODULES.forEach(mod => {
      items.push({
        id: `react-mod-${mod.id}`,
        scope: 'react',
        category: 'Modules',
        title: mod.title,
        subtitle: `${mod.subtitle} · ${mod.sections.length} notions théoriques & pratiques`,
        badge: `Module 0${mod.orderNumber}`,
        scopeBadge: 'React.js',
        action: () => {
          onNavigate(`react-module${mod.orderNumber}` as ActiveView);
          onClose();
        }
      });

      // React Sections & Notions
      mod.sections.forEach(sec => {
        items.push({
          id: `react-sec-${sec.id}`,
          scope: 'react',
          category: 'Notions',
          title: sec.title,
          subtitle: `${mod.title} · ${sec.quickSummary || sec.conceptExplanation?.slice(0, 80)}...`,
          badge: `M${mod.orderNumber} · ${sec.order}`,
          scopeBadge: 'React.js',
          action: () => {
            onNavigate(`react-module${mod.orderNumber}` as ActiveView);
            onClose();
            setTimeout(() => {
              const el = document.getElementById(sec.id);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 120);
          }
        });
      });
    });

    // React Laboratories (Ateliers interactifs)
    ALL_REACT_LABS.forEach(lab => {
      items.push({
        id: `react-lab-${lab.id}`,
        scope: 'react',
        category: 'Laboratoires',
        title: lab.title,
        subtitle: `${lab.subtitle} · ${lab.chapterTitle}`,
        badge: lab.moduleLabel,
        scopeBadge: 'React.js',
        action: () => {
          onNavigate('react-laboratory');
          onClose();
        }
      });
    });

    // React Playground
    items.push({
      id: 'react-playground-item',
      scope: 'react',
      category: 'Simulateurs',
      title: 'Playground React Interactif (Mini VS Code)',
      subtitle: 'Bac à sable de code en direct, JSX, composants, hooks et console virtuelle',
      badge: 'Playground',
      scopeBadge: 'React.js',
      action: () => {
        onNavigate('react-playground');
        onClose();
      }
    });

    // React Flashcards (Selected sample)
    REACT_FLASHCARDS.slice(0, 15).forEach(fc => {
      items.push({
        id: `react-fc-${fc.id}`,
        scope: 'react',
        category: 'Flashcards',
        title: fc.front,
        subtitle: fc.back.slice(0, 85) + '...',
        badge: fc.category,
        scopeBadge: 'React.js',
        action: () => {
          onNavigate('react-flashcards');
          onClose();
        }
      });
    });

    // React Anti-Pièges Guide
    items.push({
      id: 'react-errors-item',
      scope: 'react',
      category: 'Anti-Pièges',
      title: 'Guide Anti-Pièges & Erreurs Courantes React',
      subtitle: 'Mutations interdites, boucles infinies useEffect, closures et conventions OFPPT',
      badge: 'Anti-Pièges',
      scopeBadge: 'React.js',
      action: () => {
        onNavigate('react-errors');
        onClose();
      }
    });

    // React Final Exam
    items.push({
      id: 'react-final-exam-item',
      scope: 'react',
      category: 'Évaluation',
      title: 'Examen Blanc Officiel React (50 QCM)',
      subtitle: '45 minutes en conditions réelles EFM sur l’ensemble des 8 modules React & Redux',
      badge: '50 QCM',
      scopeBadge: 'React.js',
      action: () => {
        onNavigate('react-final-exam');
        onClose();
      }
    });

    // ==========================================
    // 2. AGILE CONTENT
    // ==========================================

    // Agile Course Modules
    COURSE_PARTS.forEach(part => {
      items.push({
        id: `agile-module-${part.id}`,
        scope: 'agile',
        category: 'Modules',
        title: part.title,
        subtitle: part.subtitle,
        badge: `Partie 0${part.orderNumber}`,
        scopeBadge: 'Agile',
        action: () => {
          onNavigate(part.id);
          onClose();
        }
      });

      // Agile Sections / Notions
      part.sections.forEach(sec => {
        items.push({
          id: `agile-sec-${sec.id}`,
          scope: 'agile',
          category: 'Notions',
          title: sec.title,
          subtitle: `${part.title} · ${sec.definition.slice(0, 75)}...`,
          badge: sec.order,
          scopeBadge: 'Agile',
          action: () => {
            onNavigate(part.id);
            onClose();
          }
        });
      });
    });

    // Agile Simulators
    const agileSimulators = [
      { id: 'pert', name: 'Simulateur PERT Lab', desc: 'Calcul de dates au plus tôt/tard, marges et chemin critique' },
      { id: 'gantt', name: 'Simulateur Gantt Planning', desc: 'Timeline dynamique, durées des phases et jalons' },
      { id: 'jira', name: 'Simulateur Jira Board', desc: 'Gestion de tickets, sprint backlog et colonnes Scrum' },
      { id: 'git', name: 'Simulateur Git 4 Zones CLI', desc: 'Commandes terminal, staging, commits et branches' },
      { id: 'pipeline', name: 'Simulateur DevOps CI/CD', desc: 'Pipeline GitLab CI, jobs de test, SonarQube et déploiement' }
    ];

    agileSimulators.forEach(sim => {
      items.push({
        id: `agile-sim-${sim.id}`,
        scope: 'agile',
        category: 'Simulateurs',
        title: sim.name,
        subtitle: sim.desc,
        badge: 'Laboratoire',
        scopeBadge: 'Agile',
        action: () => {
          onNavigate('simulators');
          onClose();
        }
      });
    });

    // Agile Flashcards
    FLASHCARDS.slice(0, 10).forEach(fc => {
      items.push({
        id: `agile-fc-${fc.id}`,
        scope: 'agile',
        category: 'Flashcards',
        title: fc.front,
        subtitle: fc.back.slice(0, 75) + '...',
        badge: fc.category,
        scopeBadge: 'Agile',
        action: () => {
          onNavigate('flashcards');
          onClose();
        }
      });
    });

    // Agile Final Exam
    items.push({
      id: 'agile-final-exam-item',
      scope: 'agile',
      category: 'Évaluation',
      title: 'Examen Blanc Officiel Agile (50 QCM)',
      subtitle: '45 minutes en conditions réelles EFM sur l’ensemble des 5 modules de gestion de projet',
      badge: '50 QCM',
      scopeBadge: 'Agile',
      action: () => {
        onNavigate('final-exam');
        onClose();
      }
    });

    return items;
  }, [onNavigate, onClose]);

  // Filter items matching current scope and search query
  const filteredItems = useMemo(() => {
    // 1. Filter by scope first
    let scoped = allItems;
    if (scope !== 'all') {
      scoped = allItems.filter(it => it.scope === scope);
    }

    // 2. Filter by search query
    const q = query.trim().toLowerCase();
    if (!q) {
      // Return curated quick-picks based on active scope
      if (scope === 'react' || activeView?.startsWith('react')) {
        return scoped.filter(it => it.scope === 'react').slice(0, 8);
      }
      return scoped.slice(0, 8);
    }

    return scoped
      .filter(it => 
        it.title.toLowerCase().includes(q) || 
        it.subtitle.toLowerCase().includes(q) ||
        it.category.toLowerCase().includes(q) ||
        it.scopeBadge.toLowerCase().includes(q) ||
        (it.badge && it.badge.toLowerCase().includes(q))
      )
      .slice(0, 15);
  }, [allItems, query, scope, activeView]);

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
    Laboratoires: Code2,
    Simulateurs: FlaskConical,
    Flashcards: CreditCard,
    Évaluation: Award,
    'Anti-Pièges': AlertTriangle
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 select-none">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 dark:bg-[#0A0A0A]/80 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Palette Container */}
      <div 
        className="relative z-10 w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0A0A0A] shadow-2xl overflow-hidden flex flex-col max-h-[82vh] transition-all"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200 dark:border-white/10">
          <Search className="h-5 w-5 text-[#10B981] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={
              scope === 'react'
                ? "Rechercher React : useState, useEffect, JSX, Redux, Ateliers..."
                : scope === 'agile'
                ? "Rechercher Agile : PERT, Gantt, Scrum, Sprint, Git, CI/CD..."
                : "Rechercher un cours, notion, lab React ou simulateur..."
            }
            className="flex-1 bg-transparent text-sm sm:text-base font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 border-none outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 shadow-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="h-6 w-6 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold rounded-lg border border-slate-200 dark:border-white/15 text-slate-500 dark:text-white/60">
            ESC
          </kbd>
        </div>

        {/* Scope Switcher Tabs (Tous / React M204 / Agile M202) */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/10 text-xs font-mono">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-white/40 mr-1">
            Filière :
          </span>

          <button
            onClick={() => {
              setScope('all');
              setSelectedIndex(0);
            }}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              scope === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-[#0A0A0A] shadow-2xs'
                : 'text-slate-600 dark:text-white/60 hover:bg-slate-200/60 dark:hover:bg-white/10'
            }`}
          >
            Tous
          </button>

          <button
            onClick={() => {
              setScope('react');
              setSelectedIndex(0);
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              scope === 'react'
                ? 'bg-[#10B981] text-white shadow-2xs'
                : 'text-[#10B981] hover:bg-[#10B981]/10'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
            <span>React.js</span>
          </button>

          <button
            onClick={() => {
              setScope('agile');
              setSelectedIndex(0);
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              scope === 'agile'
                ? 'bg-[#22C55E] text-white shadow-2xs'
                : 'text-[#22C55E] hover:bg-[#22C55E]/10'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
            <span>Agile</span>
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-white/60">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-40 text-[#10B981]" />
              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                Aucun résultat trouvé pour « {query} »
              </p>
              <p className="text-xs mt-1 text-slate-500 dark:text-white/50">
                Essaie avec "useState", "Redux", "Atelier", "JSX", "PERT" ou "Gantt".
              </p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = categoryIcons[item.category] || BookOpen;
              const isReact = item.scope === 'react';

              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between gap-3 p-3 rounded-2xl text-left transition-all cursor-pointer ${
                    isSelected 
                      ? (isReact
                          ? 'bg-[#10B981]/10 border border-[#10B981]/40 text-slate-900 dark:text-white'
                          : 'bg-[#22C55E]/10 border border-[#22C55E]/40 text-slate-900 dark:text-white')
                      : 'border border-transparent text-slate-800 dark:text-white/80 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isSelected 
                        ? (isReact ? 'bg-[#10B981] text-white' : 'bg-[#22C55E] text-white') 
                        : isReact
                        ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20'
                        : 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20'
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs sm:text-sm font-bold truncate text-slate-900 dark:text-white">
                          {item.title}
                        </span>

                        {/* Scope badge */}
                        <span className={`rounded-md px-1.5 py-0.2 text-[9px] font-mono font-bold shrink-0 ${
                          isReact
                            ? 'bg-[#10B981]/10 text-emerald-800 dark:text-[#10B981] border border-[#10B981]/20'
                            : 'bg-[#22C55E]/10 text-green-800 dark:text-[#22C55E] border border-[#22C55E]/20'
                        }`}>
                          {item.scopeBadge}
                        </span>

                        {item.badge && (
                          <span className="rounded-md px-1.5 py-0.2 text-[9px] font-mono font-bold bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white/70 border border-slate-200 dark:border-white/10 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 dark:text-white/60 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5">
                    {isSelected ? (
                      <span className={`flex items-center gap-1 text-[11px] font-bold ${isReact ? 'text-[#10B981]' : 'text-[#22C55E]'}`}>
                        <span>Ouvrir</span>
                        <CornerDownLeft className="h-3.5 w-3.5" />
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 dark:text-white/40 font-medium">
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
        <div className="px-5 py-2.5 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] flex items-center justify-between text-[11px] text-slate-500 dark:text-white/50 font-medium">
          <div className="flex items-center gap-3">
            <span>↑↓ pour naviguer</span>
            <span>↵ pour sélectionner</span>
          </div>
          <span className="font-mono text-[10px]">OFPPT DÉV DIGITAL</span>
        </div>
      </div>
    </div>
  );
}

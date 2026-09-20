import React from 'react';
import { Menu, Award, AlertTriangle, Layers, Search, Zap, Code2 } from 'lucide-react';
import { ActiveView } from './Sidebar';
import { useProgress } from '../../store/progressStore';
import { useReactProgress } from '../../store/reactProgressStore';
import { useActiveTrack } from '../../store/trackStore';
import { Button } from '../ui/Button';
import { ShareButton } from '../common/ShareButton';
import { InstallButton } from '../common/InstallButton';
import { ThemeToggle } from '../common/ThemeToggle';

interface HeaderProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  onOpenMobileSidebar: () => void;
  onOpenSearch?: () => void;
}

export function Header({
  activeView,
  onNavigate,
  onOpenMobileSidebar,
  onOpenSearch
}: HeaderProps) {
  const [activeTrack] = useActiveTrack();
  const isReact = (activeView === 'profile-settings' || activeView === 'methodology')
    ? (activeTrack === 'react')
    : activeView.startsWith('react');
  const { progress } = useProgress();
  const { progress: reactProgress } = useReactProgress();
  const errorCount = isReact ? reactProgress.wrongQuestionIds.length : progress.wrongQuestionIds.length;

  const getBreadcrumb = () => {
    switch (activeView) {
      case 'curriculum-hub':
        return { title: 'Cursus 2ème Année', subtitle: 'Sélectionnez votre module de révision' };
      case 'dashboard':
        return { title: 'Tableau de bord', subtitle: 'Approche Agile & Gestion de Projet' };
      case 'react-dashboard':
        return { title: 'Tableau de bord React', subtitle: 'React.js & Front-End Moderne' };
      case 'react-module1':
        return { title: 'Module 1 : Architecture Web', subtitle: 'Client-Serveur, DOM, SPA vs MPA' };
      case 'react-module2':
        return { title: 'Module 2 : JavaScript Moderne', subtitle: 'ES6+, Destructuring, Promises & Async' };
      case 'react-module3':
        return { title: 'Module 3 : React & Architecture', subtitle: 'Virtual DOM, JSX, Babel & Tooling' };
      case 'react-module4':
        return { title: 'Module 4 : Composants & State', subtitle: 'Props, useState, Événements & Listes' };
      case 'react-module5':
        return { title: 'Module 5 : Styles & Cycle de Vie', subtitle: 'useEffect, Nettoyage & CSS Modules' };
      case 'react-module6':
        return { title: 'Module 6 : Routage & Tests', subtitle: 'React Router v6 & Testing Library' };
      case 'react-module7':
        return { title: 'Module 7 : Redux Fondamentaux', subtitle: 'Store, Reducers, Actions & Flux' };
      case 'react-module8':
        return { title: 'Module 8 : Redux Toolkit & Thunk', subtitle: 'createSlice, configureStore & Thunk' };
      case 'react-playground':
        return { title: 'Playground Live', subtitle: 'Éditeur de code et aperçu React en temps réel' };
      case 'react-laboratory':
        return { title: 'Laboratoire React', subtitle: '7 Ateliers pratiques & résolution de bugs' };
      case 'react-flashcards':
        return { title: 'Flashcards 3D React', subtitle: 'Mémorisation active des concepts clés' };
      case 'react-errors':
        return { title: 'Mes Erreurs React', subtitle: 'Révision ciblée des questions erronées' };
      case 'react-final-exam':
        return { title: 'Examen Blanc React', subtitle: '40 QCM chronométrés en conditions réelles' };
      case 'methodology':
        return { title: 'Comment Apprendre', subtitle: 'La méthode active en 6 étapes pour réussir' };
      case 'profile-settings':
        return { title: 'Profil & Paramètres', subtitle: 'Préférences d’étude et état de préparation' };
      case 'part1':
        return { title: 'Partie 1', subtitle: 'Fondamentaux de la gestion de projet' };
      case 'part2':
        return { title: 'Partie 2', subtitle: 'Planification de projet · Gantt & PERT' };
      case 'part3':
        return { title: 'Partie 3', subtitle: 'Agile · Scrum & Jira' };
      case 'part4':
        return { title: 'Partie 4', subtitle: 'Git · GitLab & SonarQube' };
      case 'part5':
        return { title: 'Partie 5', subtitle: 'DevOps · CI/CD & GitLab CI' };
      case 'simulators':
        return { title: 'Laboratoire interactif', subtitle: 'Pratique concrète sur 5 simulateurs' };
      case 'flashcards':
        return { title: 'Flashcards 3D', subtitle: 'Mémorisation active et concepts clés' };
      case 'errors':
        return { title: 'Mes Erreurs', subtitle: 'Révision ciblée des notions non acquises' };
      case 'final-exam':
        return { title: 'Examen Blanc Officiel', subtitle: '50 QCM chronométrés en conditions réelles' };
      default:
        return { title: 'Plateforme', subtitle: 'Full Stack 2A · Préparation OFPPT' };
    }
  };

  const breadcrumb = getBreadcrumb();

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-black/15 dark:border-white/15 bg-white/95 dark:bg-[#0A0A0A]/95 px-3 sm:px-6 backdrop-blur-xl transition-colors">
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        {/* Mobile menu button */}
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden h-9 w-9 shrink-0 flex items-center justify-center rounded-xl text-[#0A0A0A] dark:text-white hover:text-[#10B981] dark:hover:text-[#10B981] hover:bg-[#10B981]/10 active:scale-95 transition-colors border border-black/15 dark:border-white/15 cursor-pointer"
          aria-label="Ouvrir le menu de navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Title and subtitle */}
        <div className="min-w-0 flex-1 truncate">
          <div role="heading" aria-level={2} className="text-[13px] sm:text-base font-black text-[#0A0A0A] dark:text-white leading-tight truncate">
            {breadcrumb.title}
          </div>
          <p className="hidden sm:block text-xs text-[#0A0A0A]/70 dark:text-white/70 mt-0.5 truncate">
            {breadcrumb.subtitle}
          </p>
        </div>
      </div>

      {/* Right Header Actions: Search (desktop only), Install App, Share, and Theme Toggle (icon-only on mobile) */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {onOpenSearch && (
          <button
            onClick={onOpenSearch}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-[#0A0A0A] dark:text-white hover:border-[#10B981] hover:text-[#10B981] transition-all cursor-pointer shadow-2xs group"
            title="Rechercher (Ctrl+K)"
            aria-label="Recherche rapide"
          >
            <Search className="h-3.5 w-3.5 text-[#10B981] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Rechercher</span>
            <kbd className="hidden md:inline px-1 py-0.2 text-[9px] font-mono rounded bg-black/10 dark:bg-white/10 text-[#0A0A0A]/70 dark:text-white/70">⌘K</kbd>
          </button>
        )}
        <InstallButton variant="minimal" />
        <ShareButton variant="minimal" />
        <ThemeToggle />
      </div>
    </header>
  );
}

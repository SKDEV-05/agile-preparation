import React from 'react';
import { Menu, Award, AlertTriangle, Flame, RotateCcw } from 'lucide-react';
import { ActiveView } from './Sidebar';
import { useProgress } from '../../store/progressStore';
import { Button } from '../ui/Button';

interface HeaderProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  onOpenMobileSidebar: () => void;
}

export function Header({ activeView, onNavigate, onOpenMobileSidebar }: HeaderProps) {
  const { progress } = useProgress();
  const errorCount = progress.wrongQuestionIds.length;

  const getBreadcrumb = () => {
    switch (activeView) {
      case 'dashboard':
        return { title: 'Tableau de bord', subtitle: 'Préparation au module Approche Agile' };
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
        return { title: 'Examen Final', subtitle: '50 QCM inédits en conditions réelles' };
      default:
        return { title: 'Plateforme', subtitle: 'Approche Agile OFPPT' };
    }
  };

  const breadcrumb = getBreadcrumb();

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 sm:px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none"
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Title and subtitle */}
        <div>
          <h1 className="text-sm font-bold text-slate-900 sm:text-base leading-none">
            {breadcrumb.title}
          </h1>
          <p className="hidden sm:block text-xs text-slate-500 mt-0.5">
            {breadcrumb.subtitle}
          </p>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Errors quick link */}
        {errorCount > 0 && (
          <button
            onClick={() => onNavigate('errors')}
            className="flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-100 transition-colors"
            title={`${errorCount} questions à revoir`}
          >
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
            <span className="hidden sm:inline">Erreurs :</span>
            <span>{errorCount}</span>
          </button>
        )}

        {/* Quick Launch Final Exam */}
        {activeView !== 'final-exam' && (
          <Button
            size="sm"
            variant="primary"
            onClick={() => onNavigate('final-exam')}
            className="gap-1.5 font-bold shadow-sm"
          >
            <Award className="h-4 w-4" />
            <span className="hidden sm:inline">Lancer le</span>
            <span>50 QCM</span>
          </Button>
        )}
      </div>
    </header>
  );
}

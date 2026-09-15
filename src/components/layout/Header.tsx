import React from 'react';
import { Menu, Award, AlertTriangle, Layers } from 'lucide-react';
import { ActiveView } from './Sidebar';
import { useProgress } from '../../store/progressStore';
import { Button } from '../ui/Button';
import { ShareButton } from '../common/ShareButton';

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
      case 'curriculum-hub':
        return { title: 'Cursus 2ème Année', subtitle: 'Sélectionnez votre module de révision' };
      case 'dashboard':
        return { title: 'Tableau de bord', subtitle: 'Module Approche Agile & Gestion de Projet' };
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
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-white/10 bg-[#070B14]/80 px-3 sm:px-6 backdrop-blur-xl">
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        {/* Mobile menu button */}
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden h-10 w-10 shrink-0 flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 active:bg-slate-700 transition-colors border border-white/5"
          aria-label="Ouvrir le menu de navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Title and subtitle */}
        <div className="truncate">
          <h1 className="text-sm font-bold text-white sm:text-base leading-none truncate">
            {breadcrumb.title}
          </h1>
          <p className="hidden sm:block text-xs text-slate-400 mt-1 truncate">
            {breadcrumb.subtitle}
          </p>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Switch back to curriculum modules */}
        {activeView !== 'curriculum-hub' && (
          <button
            onClick={() => onNavigate('curriculum-hub')}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900/90 px-3 py-1.5 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors shadow-xs"
            title="Revenir au choix des matières 2ème Année"
          >
            <Layers className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
            <span>Modules 2A</span>
          </button>
        )}

        {/* Errors quick link */}
        {errorCount > 0 && (
          <button
            onClick={() => onNavigate('errors')}
            className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-2.5 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 active:bg-amber-500/30 transition-colors"
            title={`${errorCount} questions à revoir`}
          >
            <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span className="hidden md:inline">Erreurs :</span>
            <span>{errorCount}</span>
          </button>
        )}

        {/* Share Button (WhatsApp / Copy link) */}
        <ShareButton />

        {/* Quick Launch Final Exam */}
        {activeView !== 'final-exam' && (
          <Button
            size="sm"
            variant="primary"
            onClick={() => onNavigate('final-exam')}
            className="gap-1.5 font-bold shadow-md shadow-indigo-600/30 px-2.5 sm:px-3.5 text-xs"
          >
            <Award className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Lancer</span>
            <span>50 QCM</span>
          </Button>
        )}
      </div>
    </header>
  );
}

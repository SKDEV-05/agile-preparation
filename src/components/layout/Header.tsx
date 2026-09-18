import React from 'react';
import { Menu, Award, AlertTriangle, Layers, Search } from 'lucide-react';
import { ActiveView } from './Sidebar';
import { useProgress } from '../../store/progressStore';
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
  const { progress } = useProgress();
  const errorCount = progress.wrongQuestionIds.length;

  const getBreadcrumb = () => {
    switch (activeView) {
      case 'curriculum-hub':
        return { title: 'Cursus 2ème Année', subtitle: 'Sélectionnez votre module de révision' };
      case 'dashboard':
        return { title: 'Tableau de bord', subtitle: 'Module Approche Agile & Gestion de Projet (M201)' };
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
        <div className="truncate">
          <div role="heading" aria-level={2} className="text-sm font-black text-[#0A0A0A] dark:text-white sm:text-base leading-none truncate">
            {breadcrumb.title}
          </div>
          <p className="hidden sm:block text-xs text-[#0A0A0A]/70 dark:text-white/70 mt-1 truncate">
            {breadcrumb.subtitle}
          </p>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Global Search trigger (Cmd+K) */}
        {onOpenSearch && (
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-xl border border-black/15 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.03] px-2.5 py-1.5 text-xs text-[#0A0A0A]/70 dark:text-white/70 hover:border-[#10B981] hover:text-[#10B981] transition-all cursor-pointer shadow-2xs"
            title="Rechercher (Ctrl+K)"
          >
            <Search className="h-3.5 w-3.5 text-[#10B981]" />
            <span className="hidden md:inline font-medium">Rechercher...</span>
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.2 text-[9px] font-mono font-bold rounded bg-black/5 dark:bg-white/10 text-[#0A0A0A]/50 dark:text-white/50 border border-black/10 dark:border-white/10">
              ⌘K
            </kbd>
          </button>
        )}

        {/* Switch back to curriculum modules */}
        {activeView !== 'curriculum-hub' && (
          <button
            onClick={() => onNavigate('curriculum-hub')}
            aria-label="Revenir au choix des modules 2ème Année"
            className="hidden xl:inline-flex items-center gap-1.5 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] px-2.5 py-1.5 text-xs font-bold text-[#0A0A0A] dark:text-white hover:border-[#10B981] hover:text-[#10B981] transition-colors shadow-2xs cursor-pointer"
            title="Revenir au choix des matières 2ème Année"
          >
            <Layers className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
            <span>Modules 2A</span>
          </button>
        )}

        {/* Errors quick link */}
        {errorCount > 0 && (
          <button
            onClick={() => onNavigate('errors')}
            aria-label={`Voir les ${errorCount} questions à réviser`}
            className="flex items-center gap-1.5 rounded-xl bg-[#22C55E] text-white px-2.5 py-1.5 text-xs font-bold hover:bg-[#10B981] transition-colors cursor-pointer shadow-xs"
            title={`${errorCount} questions à revoir`}
          >
            <AlertTriangle className="h-3.5 w-3.5 text-white shrink-0" />
            <span className="hidden md:inline">Erreurs :</span>
            <span>{errorCount}</span>
          </button>
        )}

        {/* Install Mobile App / PWA */}
        <InstallButton />

        {/* Theme Switcher Toggle */}
        <ThemeToggle />

        {/* Share Button (WhatsApp / Copy link) */}
        <ShareButton />

        {/* Quick Launch Final Exam */}
        {activeView !== 'final-exam' && (
          <Button
            size="sm"
            variant="primary"
            onClick={() => onNavigate('final-exam')}
            className="gap-1.5 font-bold px-2.5 sm:px-3 text-xs"
          >
            <Award className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">Lancer</span>
            <span>50 QCM</span>
          </Button>
        )}
      </div>
    </header>
  );
}

import React from 'react';
import {
  LayoutDashboard,
  Layers,
  CalendarRange,
  Zap,
  GitBranch,
  Rocket,
  FlaskConical,
  CreditCard,
  AlertTriangle,
  Award,
  ChevronRight,
  Sparkles,
  Settings,
  X,
  CheckCircle2,
  Code2,
  Compass,
  Play
} from 'lucide-react';
import { PartId } from '../../types';
import { ReactModuleId } from '../../types/reactTypes';
import { useProgress } from '../../store/progressStore';
import { useReactProgress } from '../../store/reactProgressStore';
import { Progress } from '../ui/Progress';
import { CreatorCard } from './CreatorCard';
import { ThemeToggle } from '../common/ThemeToggle';
import { InstallButton } from '../common/InstallButton';
import { cn } from '../../lib/utils';
import { PlatformLogo } from '../common/PlatformLogo';
import { useActiveTrack } from '../../store/trackStore';
export type ActiveView = 
  | 'curriculum-hub' 
  | 'dashboard' 
  | 'methodology' 
  | 'profile-settings' 
  | 'part1' 
  | 'part2' 
  | 'part3' 
  | 'part4' 
  | 'part5' 
  | 'simulators' 
  | 'flashcards' 
  | 'errors' 
  | 'final-exam'
  | 'react-dashboard'
  | 'react-module1'
  | 'react-module2'
  | 'react-module3'
  | 'react-module4'
  | 'react-module5'
  | 'react-module6'
  | 'react-module7'
  | 'react-module8'
  | 'react-playground'
  | 'react-laboratory'
  | 'react-flashcards'
  | 'react-errors'
  | 'react-final-exam';

interface SidebarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView, partId?: PartId) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ activeView, onNavigate, isOpenMobile, onCloseMobile }: SidebarProps) {
  const [activeTrack, setActiveTrack] = useActiveTrack();

  React.useEffect(() => {
    if (activeView.startsWith('react')) {
      setActiveTrack('react');
    } else if (
      activeView.startsWith('part') || 
      ['dashboard', 'simulators', 'flashcards', 'errors', 'final-exam'].includes(activeView)
    ) {
      setActiveTrack('agile');
    }
  }, [activeView, setActiveTrack]);

  const isReact = activeTrack === 'react';
  const { progress, overallPercentage } = useProgress();
  const { progress: reactProgress, overallPercentage: reactOverallPercentage } = useReactProgress();
  
  const errorCount = isReact ? reactProgress.wrongQuestionIds.length : progress.wrongQuestionIds.length;

  const mainNavItems = isReact
    ? [
        { id: 'react-dashboard', label: 'Accueil · React.js', icon: LayoutDashboard },
        { id: 'methodology', label: 'Comment Apprendre', icon: Sparkles, badge: 'Méthode' },
      ]
    : [
        { id: 'dashboard', label: 'Accueil · Tableau de bord', icon: LayoutDashboard },
        { id: 'methodology', label: 'Comment Apprendre', icon: Sparkles, badge: 'Méthode' },
      ];

  const learnItems = isReact
    ? [
        { id: 'react-module1', order: '01', label: 'Architecture Web & SPA', icon: Layers },
        { id: 'react-module2', order: '02', label: 'JavaScript Moderne ES6+', icon: Code2 },
        { id: 'react-module3', order: '03', label: 'React & Virtual DOM', icon: Zap },
        { id: 'react-module4', order: '04', label: 'Composants, Props & State', icon: Layers },
        { id: 'react-module5', order: '05', label: 'Styles & Cycle de Vie', icon: Sparkles },
        { id: 'react-module6', order: '06', label: 'Routage & Tests RTL/Jest', icon: Compass },
        { id: 'react-module7', order: '07', label: 'Redux Fondamentaux', icon: Layers },
        { id: 'react-module8', order: '08', label: 'Redux Toolkit & Thunk', icon: Rocket },
      ]
    : [
        { id: 'part1', order: '01', label: 'Fondamentaux Gestion de Projet', icon: Layers, partId: 'part1' as PartId },
        { id: 'part2', order: '02', label: 'Planification Gantt & PERT', icon: CalendarRange, partId: 'part2' as PartId },
        { id: 'part3', order: '03', label: 'Agile · Scrum & Jira', icon: Zap, partId: 'part3' as PartId },
        { id: 'part4', order: '04', label: 'Git · GitLab & SonarQube', icon: GitBranch, partId: 'part4' as PartId },
        { id: 'part5', order: '05', label: 'DevOps & CI/CD Pipelines', icon: Rocket, partId: 'part5' as PartId },
      ];

  const practiceItems = isReact
    ? [
        { id: 'react-playground', label: 'Playground Live', icon: Play, badge: 'Code Live' },
        { id: 'react-laboratory', label: 'Laboratoire interactif', icon: FlaskConical, badge: '7 Labs' },
        { id: 'react-flashcards', label: 'Flashcards 3D', icon: CreditCard, badge: 'Flashcards' },
        { 
          id: 'react-errors', 
          label: 'Mes erreurs ciblées', 
          icon: AlertTriangle, 
          badge: errorCount > 0 ? `${errorCount}` : undefined, 
          badgeColor: errorCount > 0 ? 'bg-[#22C55E] text-white border-transparent' : undefined 
        },
      ]
    : [
        { id: 'simulators', label: 'Laboratoire interactif', icon: FlaskConical, badge: '5 Labs' },
        { id: 'flashcards', label: 'Flashcards 3D', icon: CreditCard, badge: '18 cartes' },
        { 
          id: 'errors', 
          label: 'Mes erreurs ciblées', 
          icon: AlertTriangle, 
          badge: errorCount > 0 ? `${errorCount}` : undefined, 
          badgeColor: errorCount > 0 ? 'bg-[#22C55E] text-white border-transparent' : undefined 
        },
      ];

  const handleNav = (view: ActiveView, partId?: PartId) => {
    onNavigate(view, partId);
    if (onCloseMobile) onCloseMobile();
  };

  const content = (
    <div className="flex min-h-full flex-col justify-between p-4 pb-8 sm:pb-10 gap-4 text-[#0A0A0A] dark:text-white select-none">
      {/* Brand Header & Nav */}
      <div>
        {/* Top Logo & App Title */}
        <div className="flex items-center justify-between pb-3.5 border-b border-black/10 dark:border-white/10">
          <button
            onClick={() => handleNav('curriculum-hub')}
            className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
            title="Retour à l'accueil principal (Catalogue 2A)"
          >
            <PlatformLogo size={36} className="transition-transform group-hover:scale-105" />
            <div>
              <div className="font-handwriting flex items-center gap-1.5 font-bold tracking-wide text-[#0A0A0A] dark:text-white text-[28px] leading-none">
                <span>FullStack</span>
                <span className="text-[#10B981]">2A</span>
              </div>
              <p className="text-[10px] font-mono font-bold text-[#0A0A0A]/60 dark:text-white/60 uppercase tracking-wider mt-0.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                <span>OFPPT · Cursus Digital</span>
              </p>
            </div>
          </button>
          {isOpenMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden h-9 w-9 flex items-center justify-center rounded-xl text-[#0A0A0A]/70 dark:text-white/70 hover:text-[#10B981] hover:bg-[#10B981]/10 transition-colors border border-black/15 dark:border-white/15 cursor-pointer"
              aria-label="Fermer le menu"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Dual Module Toggle: Agile vs React */}
        <div className="mt-3 space-y-1.5">
          <div className="p-1 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 flex items-center gap-1">
            <button
              onClick={() => {
                setActiveTrack('agile');
                try { localStorage.setItem('fullstack2a_active_track', 'agile'); } catch (e) {}
                handleNav('dashboard');
              }}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
                !isReact
                  ? "bg-[#10B981] text-white shadow-xs"
                  : "text-[#0A0A0A]/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5"
              )}
            >
              <Zap className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Agile</span>
            </button>
            <button
              onClick={() => {
                setActiveTrack('react');
                try { localStorage.setItem('fullstack2a_active_track', 'react'); } catch (e) {}
                handleNav('react-dashboard');
              }}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
                isReact
                  ? "bg-[#10B981] text-white shadow-xs"
                  : "text-[#0A0A0A]/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5"
              )}
            >
              <Code2 className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">React.js</span>
            </button>
          </div>

          <button
            onClick={() => handleNav('curriculum-hub')}
            className="flex w-full items-center justify-between rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.02] hover:bg-black/5 dark:hover:bg-white/5 px-2.5 py-1 text-[11px] font-medium text-[#0A0A0A]/60 dark:text-white/60 transition-all group cursor-pointer"
          >
            <span className="truncate">Catalogue 2A (4 Modules)</span>
            <ChevronRight className="h-3 w-3 text-[#0A0A0A]/40 dark:text-white/40 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="mt-4 space-y-4">
          {/* Main Navigation Items */}
          <div className="space-y-1">
            {mainNavItems.map(item => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id as ActiveView)}
                  className={cn(
                    "relative flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-xs font-bold transition-all cursor-pointer group",
                    isActive
                      ? "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 shadow-2xs"
                      : "text-[#0A0A0A]/75 dark:text-white/75 hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#0A0A0A] dark:hover:text-white border border-transparent"
                  )}
                >
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#10B981]" />
                  )}
                  <div className="flex items-center gap-2.5">
                    <Icon className={cn("h-4 w-4 transition-colors", isActive ? "text-[#10B981]" : "text-[#0A0A0A]/60 dark:text-white/60 group-hover:text-[#10B981]")} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={cn(
                      "rounded-md px-1.5 py-0.5 text-[9px] font-bold font-mono",
                      isActive ? "bg-[#10B981] text-white" : "bg-[#10B981]/15 text-[#10B981]"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Group: APPRENDRE */}
          <div>
            <div className="flex items-center justify-between px-3 mb-1.5">
              <span className="text-[10px] font-mono font-bold tracking-wider text-[#0A0A0A]/50 dark:text-white/50 uppercase">
                {isReact ? 'Modules React & Redux' : 'Modules de Cours'}
              </span>
              <span className="text-[9px] font-mono text-[#10B981] font-bold">
                {isReact ? '8 Modules' : '5 Parties'}
              </span>
            </div>
            <div className="space-y-1">
              {learnItems.map(item => {
                const isActive = activeView === item.id;
                const partProgress = !isReact && (item as any).partId ? progress.parts[(item as any).partId as PartId] : null;
                const reactModId = isReact ? (item.id.replace('react-', '') as ReactModuleId) : null;
                const reactModProgress = isReact && reactModId ? reactProgress.modules[reactModId] : null;

                const bestScore = isReact ? (reactModProgress?.bestScore || 0) : (partProgress?.bestScore || 0);
                const isCompleted = isReact ? reactModProgress?.quizCompleted : partProgress?.quizCompleted;
                const completedSections = isReact ? (reactModProgress?.completedSections.length || 0) : (partProgress?.completedSections.length || 0);

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id as ActiveView, (item as any).partId)}
                    className={cn(
                      "relative group flex w-full items-center justify-between rounded-2xl px-3 py-2 text-xs font-bold transition-all text-left cursor-pointer",
                      isActive
                        ? "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 shadow-2xs"
                        : "text-[#0A0A0A]/75 dark:text-white/75 hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#0A0A0A] dark:hover:text-white border border-transparent"
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#10B981]" />
                    )}
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={cn(
                        "font-mono text-[10px] w-5 font-bold",
                        isActive ? "text-[#10B981]" : "text-[#0A0A0A]/40 dark:text-white/40 group-hover:text-[#10B981]"
                      )}>
                        {item.order}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981]" />
                      ) : completedSections > 0 ? (
                        <span className="text-[9px] font-mono text-[#10B981] font-bold bg-[#10B981]/15 px-1 rounded">
                          {completedSections}n
                        </span>
                      ) : bestScore > 0 ? (
                        <span className={cn("font-mono text-[10px] font-bold", isActive ? "text-[#10B981]" : "text-[#10B981]")}>{bestScore}%</span>
                      ) : null}
                      <ChevronRight className={cn(
                        "h-3 w-3 transition-transform",
                        isActive ? "text-[#10B981] translate-x-0.5" : "text-[#0A0A0A]/30 dark:text-white/30 group-hover:text-[#10B981]"
                      )} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group: PRATIQUER & OUTILS */}
          <div>
            <span className="px-3 text-[10px] font-mono font-bold tracking-wider text-[#0A0A0A]/50 dark:text-white/50 uppercase block mb-1.5">
              Pratiquer & Outils
            </span>
            <div className="space-y-1">
              {practiceItems.map(item => {
                const Icon = item.icon;
                const isActive = activeView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id as ActiveView)}
                    className={cn(
                      "relative flex w-full items-center justify-between rounded-2xl px-3 py-2 text-xs font-bold transition-all text-left cursor-pointer group",
                      isActive
                        ? "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 shadow-2xs"
                        : "text-[#0A0A0A]/75 dark:text-white/75 hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#0A0A0A] dark:hover:text-white border border-transparent"
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#10B981]" />
                    )}
                    <div className="flex items-center gap-2.5">
                      <Icon className={cn("h-4 w-4 shrink-0 transition-colors", isActive ? "text-[#10B981]" : "text-[#0A0A0A]/60 dark:text-white/60 group-hover:text-[#10B981]")} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold font-mono",
                        isActive ? "bg-[#10B981] text-white" : item.badgeColor || "bg-black/5 dark:bg-white/10 text-[#0A0A0A] dark:text-white border border-black/10 dark:border-white/10"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group: EVALUATION EFM */}
          <div>
            <span className="px-3 text-[10px] font-mono font-bold tracking-wider text-[#0A0A0A]/50 dark:text-white/50 uppercase block mb-1.5">
              Évaluation Finale
            </span>
            <div>
              <button
                onClick={() => handleNav(isReact ? 'react-final-exam' : 'final-exam')}
                className={cn(
                  "relative flex w-full items-center justify-between rounded-2xl px-3.5 py-2.5 text-xs font-bold transition-all border cursor-pointer",
                  (activeView === 'final-exam' || activeView === 'react-final-exam')
                    ? "bg-[#10B981] text-white border-[#10B981] shadow-xs"
                    : "bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-white border-black/15 dark:border-white/15 hover:border-[#10B981] hover:text-[#10B981]"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Award className={cn("h-4 w-4", (activeView === 'final-exam' || activeView === 'react-final-exam') ? "text-white" : "text-[#10B981]")} />
                  <span>{isReact ? 'Examen Blanc React' : 'Examen Blanc EFM'}</span>
                </div>
                <span className={cn(
                  "rounded-lg px-2 py-0.5 text-[10px] font-bold font-mono",
                  (activeView === 'final-exam' || activeView === 'react-final-exam') ? "bg-white/20 text-white" : "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30"
                )}>
                  {isReact ? '40 QCM' : '50 QCM'}
                </span>
              </button>
            </div>
          </div>

          {/* Group: ESPACE PERSONNEL */}
          <div>
            <button
              onClick={() => handleNav('profile-settings')}
              className={cn(
                "relative flex w-full items-center justify-between rounded-2xl px-3 py-2 text-xs font-bold transition-all cursor-pointer group",
                activeView === 'profile-settings'
                  ? "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 shadow-2xs"
                  : "text-[#0A0A0A]/75 dark:text-white/75 hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#0A0A0A] dark:hover:text-white border border-transparent"
              )}
            >
              {activeView === 'profile-settings' && (
                <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#10B981]" />
              )}
              <div className="flex items-center gap-2.5">
                <Settings className={cn("h-4 w-4 transition-colors", activeView === 'profile-settings' ? "text-[#10B981]" : "text-[#0A0A0A]/60 dark:text-white/60 group-hover:text-[#10B981]")} />
                <span>Profil & Paramètres</span>
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Bottom Area: Progress Card + Creator Card + Install Button */}
      <div className="space-y-2.5 pt-3 border-t border-black/10 dark:border-white/10 pb-2">
        {/* Tactile Dark / Light Mode Switch (Mobile Drawer only) */}
        <div className="lg:hidden">
          <ThemeToggle variant="switch" showLabel />
        </div>

        {/* Global Progress Card */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-3 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-[#0A0A0A] dark:text-white">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#10B981]" />
              <span>{isReact ? 'Maîtrise React' : 'Maîtrise Agile'}</span>
            </span>
            <span className="text-[#10B981] font-mono font-bold">
              {isReact ? reactOverallPercentage : overallPercentage}%
            </span>
          </div>
          <div className="mt-2">
            <Progress value={isReact ? reactOverallPercentage : overallPercentage} className="h-1.5" />
          </div>
          <p className="mt-1.5 text-[10px] text-[#0A0A0A]/55 dark:text-white/55 font-mono">
            Progression enregistrée localement
          </p>
        </div>

        {/* Install Mobile App / PWA Button */}
        <div className="pt-0.5">
          <InstallButton variant="sidebar" />
        </div>

        {/* Creator Mini Card */}
        <div className="pt-0.5">
          <CreatorCard variant="compact" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col fixed inset-y-0 left-0 z-30 bg-white dark:bg-[#0A0A0A] border-r border-black/15 dark:border-white/15 h-screen overflow-y-auto pb-6 transition-colors shadow-xs">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-[#0A0A0A]/75 backdrop-blur-xs transition-opacity"
          />
          <div className="relative flex w-[85%] max-w-xs flex-1 flex-col bg-white dark:bg-[#0A0A0A] border-r border-black/15 dark:border-white/15 shadow-2xl h-[100dvh] overflow-y-auto overscroll-contain pb-6 transition-colors">
            {content}
          </div>
        </div>
      )}
    </>
  );
}

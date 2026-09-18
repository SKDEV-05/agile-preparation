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
  CheckCircle2
} from 'lucide-react';
import { PartId } from '../../types';
import { useProgress } from '../../store/progressStore';
import { Progress } from '../ui/Progress';
import { CreatorCard } from './CreatorCard';
import { ThemeToggle } from '../common/ThemeToggle';
import { InstallButton } from '../common/InstallButton';
import { cn } from '../../lib/utils';
import logoImg from '../../assets/logo.webp';

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
  | 'final-exam';

interface SidebarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView, partId?: PartId) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ activeView, onNavigate, isOpenMobile, onCloseMobile }: SidebarProps) {
  const { progress, overallPercentage } = useProgress();
  const errorCount = progress.wrongQuestionIds.length;

  const mainNavItems = [
    { id: 'dashboard', label: 'Accueil · Tableau de bord', icon: LayoutDashboard },
    { id: 'methodology', label: 'Comment Apprendre', icon: Sparkles, badge: 'Méthode' },
  ];

  const learnItems = [
    { id: 'part1', order: '01', label: 'Fondamentaux Gestion de Projet', icon: Layers, partId: 'part1' as PartId },
    { id: 'part2', order: '02', label: 'Planification Gantt & PERT', icon: CalendarRange, partId: 'part2' as PartId },
    { id: 'part3', order: '03', label: 'Agile · Scrum & Jira', icon: Zap, partId: 'part3' as PartId },
    { id: 'part4', order: '04', label: 'Git · GitLab & SonarQube', icon: GitBranch, partId: 'part4' as PartId },
    { id: 'part5', order: '05', label: 'DevOps & CI/CD Pipelines', icon: Rocket, partId: 'part5' as PartId },
  ];

  const practiceItems = [
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
            onClick={() => handleNav('dashboard')}
            className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
          >
            <div className="h-10 w-10 shrink-0 rounded-2xl overflow-hidden shadow-xs border border-black/15 dark:border-white/15 ring-2 ring-[#10B981]/20 transition-transform group-hover:scale-105">
              <img src={logoImg} alt="Logo FullStack 2A" width={40} height={40} decoding="async" className="h-full w-full object-cover" />
            </div>
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

        {/* Quick Hub Switcher button */}
        <div className="mt-3">
          <button
            onClick={() => handleNav('curriculum-hub')}
            className="flex w-full items-center justify-between rounded-2xl border border-[#10B981]/30 bg-[#10B981]/5 hover:bg-[#10B981]/10 px-3.5 py-2 text-xs font-bold text-[#10B981] transition-all group shadow-2xs cursor-pointer"
          >
            <span className="flex items-center gap-2 truncate">
              <span className="h-2 w-2 rounded-full bg-[#10B981]"></span>
              <span className="truncate">Changer de matière (Cursus 2A)</span>
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-[#10B981] group-hover:translate-x-1 transition-transform shrink-0 ml-1" />
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

          {/* Group: APPRENDRE (5 Modules EFM) */}
          <div>
            <div className="flex items-center justify-between px-3 mb-1.5">
              <span className="text-[10px] font-mono font-bold tracking-wider text-[#0A0A0A]/50 dark:text-white/50 uppercase">
                Apprendre (5 Modules)
              </span>
              <span className="text-[9px] font-mono text-[#10B981] font-bold">M201</span>
            </div>
            <div className="space-y-1">
              {learnItems.map(item => {
                const isActive = activeView === item.id;
                const partProgress = progress.parts[item.partId];
                const bestScore = partProgress?.bestScore || 0;
                const isCompleted = partProgress?.quizCompleted;
                const completedSections = partProgress?.completedSections.length || 0;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id as ActiveView, item.partId)}
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
                onClick={() => handleNav('final-exam')}
                className={cn(
                  "relative flex w-full items-center justify-between rounded-2xl px-3.5 py-2.5 text-xs font-bold transition-all border cursor-pointer",
                  activeView === 'final-exam'
                    ? "bg-[#10B981] text-white border-[#10B981] shadow-xs"
                    : "bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-white border-black/15 dark:border-white/15 hover:border-[#10B981] hover:text-[#10B981]"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Award className={cn("h-4 w-4", activeView === 'final-exam' ? "text-white" : "text-[#10B981]")} />
                  <span>Examen Blanc EFM</span>
                </div>
                <span className={cn(
                  "rounded-lg px-2 py-0.5 text-[10px] font-bold font-mono",
                  activeView === 'final-exam' ? "bg-white/20 text-white" : "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30"
                )}>
                  50 QCM
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
              <span>Maîtrise globale</span>
            </span>
            <span className="text-[#10B981] font-mono font-bold">{overallPercentage}%</span>
          </div>
          <div className="mt-2">
            <Progress value={overallPercentage} className="h-1.5" />
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

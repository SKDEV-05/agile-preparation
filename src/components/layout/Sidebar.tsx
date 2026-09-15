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
  X
} from 'lucide-react';
import { PartId } from '../../types';
import { useProgress } from '../../store/progressStore';
import { Progress } from '../ui/Progress';
import { CreatorCard } from './CreatorCard';
import { cn } from '../../lib/utils';
import logoImg from '../../assets/logo.jpg';

export type ActiveView = 'curriculum-hub' | 'dashboard' | 'part1' | 'part2' | 'part3' | 'part4' | 'part5' | 'simulators' | 'flashcards' | 'errors' | 'final-exam';

interface SidebarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView, partId?: PartId) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ activeView, onNavigate, isOpenMobile, onCloseMobile }: SidebarProps) {
  const { progress, overallPercentage } = useProgress();
  const errorCount = progress.wrongQuestionIds.length;

  const learnItems = [
    { id: 'part1', order: '01', label: 'Fondamentaux', icon: Layers, partId: 'part1' as PartId },
    { id: 'part2', order: '02', label: 'Planification Gantt & PERT', icon: CalendarRange, partId: 'part2' as PartId },
    { id: 'part3', order: '03', label: 'Agile · Scrum & Jira', icon: Zap, partId: 'part3' as PartId },
    { id: 'part4', order: '04', label: 'Git · GitLab & Sonar', icon: GitBranch, partId: 'part4' as PartId },
    { id: 'part5', order: '05', label: 'DevOps & CI/CD', icon: Rocket, partId: 'part5' as PartId },
  ];

  const practiceItems = [
    { id: 'simulators', label: 'Laboratoire interactif', icon: FlaskConical, badge: '5 Labs' },
    { id: 'flashcards', label: 'Flashcards 3D', icon: CreditCard, badge: '18 cartes' },
    { id: 'errors', label: 'Mes erreurs', icon: AlertTriangle, badge: errorCount > 0 ? `${errorCount}` : undefined, badgeColor: errorCount > 0 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : undefined },
  ];

  const handleNav = (view: ActiveView, partId?: PartId) => {
    onNavigate(view, partId);
    if (onCloseMobile) onCloseMobile();
  };

  const content = (
    <div className="flex min-h-full flex-col justify-between p-4 sm:p-5 gap-6 text-slate-200">
      {/* Brand Header & Nav */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <button
            onClick={() => handleNav('dashboard')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="h-10 w-10 shrink-0 rounded-xl overflow-hidden shadow-md border border-white/15 transition-transform group-hover:scale-105">
              <img src={logoImg} alt="Logo FullStack 2A" className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1 font-black tracking-tight text-white text-sm sm:text-base">
                <span>FULLSTACK</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">2A</span>
              </div>
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide">2ème Année · Web</p>
            </div>
          </button>
          {isOpenMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden h-9 w-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-white/5"
              aria-label="Fermer le menu"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Module Switcher button to return to 2nd year track hub */}
        <div className="mt-3">
          <button
            onClick={() => handleNav('curriculum-hub')}
            className="flex w-full items-center justify-between rounded-xl border border-indigo-500/30 bg-indigo-950/40 hover:bg-indigo-900/50 px-3 py-2 text-xs font-bold text-indigo-200 transition-all group shadow-sm"
          >
            <span className="flex items-center gap-1.5 truncate">
              <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
              <span className="truncate">Changer de matière (Cursus 2A)</span>
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-indigo-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1" />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="mt-5 space-y-6">
          {/* Dashboard Item */}
          <div>
            <button
              onClick={() => handleNav('dashboard')}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                activeView === 'dashboard'
                  ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Accueil</span>
            </button>
          </div>

          {/* Group: APPRENDRE */}
          <div>
            <span className="px-3 text-[11px] font-mono font-bold tracking-wider text-slate-500 uppercase">
              Apprendre
            </span>
            <div className="mt-2 space-y-1">
              {learnItems.map(item => {
                const isActive = activeView === item.id;
                const partProgress = progress.parts[item.partId];
                const bestScore = partProgress?.bestScore || 0;
                const isCompleted = partProgress?.quizCompleted;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id as ActiveView, item.partId)}
                    className={cn(
                      "group flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all text-left",
                      isActive
                        ? "bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30"
                        : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={cn(
                        "font-mono text-[10px] w-5",
                        isActive ? "text-indigo-400 font-bold" : "text-slate-500 group-hover:text-slate-400"
                      )}>
                        {item.order}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isCompleted ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                      ) : bestScore > 0 ? (
                        <span className="font-mono text-[10px] text-indigo-400 font-bold">{bestScore}%</span>
                      ) : null}
                      <ChevronRight className={cn(
                        "h-3 w-3 transition-transform",
                        isActive ? "text-indigo-400 translate-x-0.5" : "text-slate-600 group-hover:text-slate-400"
                      )} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group: PRATIQUER */}
          <div>
            <span className="px-3 text-[11px] font-mono font-bold tracking-wider text-slate-500 uppercase">
              Pratiquer
            </span>
            <div className="mt-2 space-y-1">
              {practiceItems.map(item => {
                const Icon = item.icon;
                const isActive = activeView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id as ActiveView)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors text-left",
                      isActive
                        ? "bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30"
                        : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold font-mono",
                        item.badgeColor || "bg-slate-800 text-slate-300 border border-white/5"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group: EVALUATION */}
          <div>
            <span className="px-3 text-[11px] font-mono font-bold tracking-wider text-slate-500 uppercase">
              Évaluation
            </span>
            <div className="mt-2">
              <button
                onClick={() => handleNav('final-exam')}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all border",
                  activeView === 'final-exam'
                    ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30"
                    : "bg-slate-900/60 text-slate-200 border-indigo-500/30 hover:bg-indigo-950/40 hover:border-indigo-500/50"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Award className={cn("h-4 w-4", activeView === 'final-exam' ? "text-white" : "text-indigo-400")} />
                  <span>Examen Final</span>
                </div>
                <span className={cn(
                  "rounded-md px-1.5 py-0.5 text-[10px] font-bold font-mono",
                  activeView === 'final-exam' ? "bg-white/20 text-white" : "bg-indigo-500/20 text-indigo-300"
                )}>
                  50 QCM
                </span>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Bottom Area: Progress Card + Creator Card */}
      <div className="space-y-3.5 pt-4 border-t border-white/10">
        {/* Progress Card */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-3.5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>Maîtrise globale</span>
            <span className="text-indigo-400 font-mono font-bold">{overallPercentage}%</span>
          </div>
          <div className="mt-2">
            <Progress value={overallPercentage} className="h-1.5 bg-slate-800" />
          </div>
          <p className="mt-2 text-[11px] text-slate-400 leading-snug">
            Progression enregistrée en temps réel.
          </p>
        </div>

        {/* Creator Mini Card */}
        <CreatorCard variant="compact" />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col fixed inset-y-0 left-0 z-30 bg-[#0A0E1A] border-r border-white/10 h-screen overflow-y-auto">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          />
          <div className="relative flex w-[85%] max-w-xs flex-1 flex-col bg-[#0A0E1A] border-r border-white/10 shadow-2xl h-[100dvh] overflow-y-auto overscroll-contain pb-6">
            {content}
          </div>
        </div>
      )}
    </>
  );
}

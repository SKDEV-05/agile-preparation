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
  BookOpen,
  X
} from 'lucide-react';
import { PartId } from '../../types';
import { useProgress } from '../../store/progressStore';
import { Progress } from '../ui/Progress';
import { cn } from '../../lib/utils';

export type ActiveView = 'dashboard' | 'part1' | 'part2' | 'part3' | 'part4' | 'part5' | 'simulators' | 'flashcards' | 'errors' | 'final-exam';

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
    { id: 'errors', label: 'Mes erreurs', icon: AlertTriangle, badge: errorCount > 0 ? `${errorCount}` : undefined, badgeColor: errorCount > 0 ? 'bg-amber-100 text-amber-800' : undefined },
  ];

  const handleNav = (view: ActiveView, partId?: PartId) => {
    onNavigate(view, partId);
    if (onCloseMobile) onCloseMobile();
  };

  const content = (
    <div className="flex h-full flex-col justify-between p-4 sm:p-5">
      {/* Brand Header */}
      <div>
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <button
            onClick={() => handleNav('dashboard')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm transition-transform group-hover:scale-105">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold tracking-tight text-slate-900 text-base">
                <span>AGILE</span>
                <span className="text-primary">OFPPT</span>
              </div>
              <p className="text-[11px] font-medium text-slate-400">Master Exam · EdTech</p>
            </div>
          </button>
          {isOpenMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation Section */}
        <nav className="mt-5 space-y-6 overflow-y-auto">
          {/* Dashboard Item */}
          <div>
            <button
              onClick={() => handleNav('dashboard')}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                activeView === 'dashboard'
                  ? "bg-primary text-white font-semibold shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Accueil</span>
            </button>
          </div>

          {/* Group: APPRENDRE */}
          <div>
            <span className="px-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
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
                        ? "bg-indigo-50/80 text-primary font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold shrink-0",
                        isActive ? "bg-primary text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                      )}>
                        {item.order}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>

                    {isCompleted ? (
                      <span className="text-[11px] font-semibold text-success">{bestScore}%</span>
                    ) : bestScore > 0 ? (
                      <span className="text-[11px] font-medium text-slate-400">{bestScore}%</span>
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group: PRATIQUER */}
          <div>
            <span className="px-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
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
                      "flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all",
                      isActive
                        ? "bg-indigo-50/80 text-primary font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 shrink-0 text-slate-500" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold",
                        item.badgeColor || "bg-slate-100 text-slate-600"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group: EXAMEN */}
          <div>
            <span className="px-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              Évaluation
            </span>
            <div className="mt-2">
              <button
                onClick={() => handleNav('final-exam')}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all border",
                  activeView === 'final-exam'
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-slate-50 text-slate-800 border-slate-200/80 hover:bg-indigo-50/50 hover:border-indigo-200"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Award className={cn("h-4 w-4", activeView === 'final-exam' ? "text-white" : "text-primary")} />
                  <span>Examen Final</span>
                </div>
                <span className={cn(
                  "rounded-md px-1.5 py-0.5 text-[10px] font-bold",
                  activeView === 'final-exam' ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                )}>
                  50 QCM
                </span>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Progress Footer Card */}
      <div className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          <span>Maîtrise globale</span>
          <span className="text-primary font-bold">{overallPercentage}%</span>
        </div>
        <div className="mt-2">
          <Progress value={overallPercentage} className="h-1.5" />
        </div>
        <p className="mt-2.5 text-[11px] text-slate-400 leading-snug">
          Progression enregistrée automatiquement sur ton navigateur.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col fixed inset-y-0 left-0 z-30 bg-white border-r border-slate-200/80">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
          />
          <div className="relative flex w-4/5 max-w-xs flex-1 flex-col bg-white shadow-2xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
}

import React, { useState } from 'react';
import { PertLab } from '../../components/simulators/PertLab';
import { GanttLab } from '../../components/simulators/GanttLab';
import { JiraBoard } from '../../components/simulators/JiraBoard';
import { GitLabVisualizer } from '../../components/simulators/GitLabVisualizer';
import { DevOpsPipeline } from '../../components/simulators/DevOpsPipeline';
import { FlaskConical, Layers, CalendarRange, Zap, GitBranch, Rocket } from 'lucide-react';

export function LaboratoryPage() {
  const [activeTab, setActiveTab] = useState<'pert' | 'gantt' | 'jira' | 'git' | 'pipeline'>('pert');

  const tabs = [
    { id: 'pert', label: 'PERT Network', icon: Layers, desc: 'Chemin critique & marges' },
    { id: 'gantt', label: 'Gantt Planning', icon: CalendarRange, desc: 'Calendrier & durées' },
    { id: 'jira', label: 'Jira Board', icon: Zap, desc: 'Scrum, tickets & flux' },
    { id: 'git', label: 'Git 4 Zones', icon: GitBranch, desc: 'Workflow & commandes' },
    { id: 'pipeline', label: 'DevOps CI/CD', icon: Rocket, desc: 'Pipeline & GitLab CI' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="reveal-on-scroll rounded-3xl border border-white/10 bg-[#0D1526]/90 backdrop-blur-xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Terminal top bar dots */}
        <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
          <span className="ml-2 font-mono text-[10px] text-slate-400">fullstack2a@laboratory: ~/simulators</span>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 shadow-lg shrink-0">
            <FlaskConical className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Pratique Appliquée & Expérimentation
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
              Laboratoire Interactif · 5 Simulateurs
            </h1>
          </div>
        </div>
        <p className="relative z-10 mt-3 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Ici, tu ne te contentes pas de lire la théorie : tu manipules les outils et concepts exactement comme en entreprise ou lors des épreuves pratiques des examens officiels.
        </p>

        {/* Tab Navigation Pill Bar - Horizontal Swipe on Mobile */}
        <div className="relative z-10 mt-6 flex overflow-x-auto no-scrollbar sm:flex-wrap gap-2 border-t border-white/10 pt-4 pb-1 sm:pb-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`shrink-0 flex items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-lg shadow-cyan-600/30 scale-[1.02] border border-cyan-400/40'
                    : 'bg-[#070B14]/80 text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-white/5'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-cyan-200' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulator Content Area */}
      <div className="relative">
        {activeTab === 'pert' && <PertLab />}
        {activeTab === 'gantt' && <GanttLab />}
        {activeTab === 'jira' && <JiraBoard />}
        {activeTab === 'git' && <GitLabVisualizer />}
        {activeTab === 'pipeline' && <DevOpsPipeline />}
      </div>
    </div>
  );
}

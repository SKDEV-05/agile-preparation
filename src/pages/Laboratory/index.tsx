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
    <div className="space-y-8 pb-12 text-[#0A0A0A] dark:text-white">
      {/* Page Header */}
      <div className="reveal-on-scroll relative rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] backdrop-blur-2xl p-5 sm:p-8 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#22C55E]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Terminal top bar dots */}
        <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-black/10 dark:border-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-black/40 dark:bg-white/40"></div>
          <span className="ml-2 font-mono text-[10px] text-black/50 dark:text-white/50">fullstack2a@laboratory: ~/simulators</span>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] shadow-sm shrink-0">
            <FlaskConical className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#10B981] uppercase tracking-wider font-mono">
              Pratique Appliquée & Expérimentation
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-black dark:text-white tracking-tight mt-0.5">
              Laboratoire Interactif · 5 Simulateurs
            </h1>
          </div>
        </div>
        <p className="relative z-10 mt-3 text-xs sm:text-sm text-black/70 dark:text-white/70 max-w-3xl leading-relaxed">
          Ici, tu ne te contentes pas de lire la théorie : tu manipules les outils et concepts exactement comme en entreprise ou lors des épreuves pratiques des examens officiels.
        </p>

        {/* Tab Navigation Pill Bar */}
        <div className="relative z-10 mt-6 flex overflow-x-auto no-scrollbar sm:flex-wrap gap-2 border-t border-black/10 dark:border-white/10 pt-4 pb-1 sm:pb-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`shrink-0 flex items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#10B981] to-[#22C55E] text-white shadow-md scale-[1.02] border border-[#10B981]'
                    : 'bg-black/5 hover:bg-black/10 text-black/70 hover:text-black dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white border border-black/5 dark:border-white/5'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-black/50 dark:text-white/50'}`} />
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

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
      <div className="reveal-on-scroll rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-card">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 shadow-sm shrink-0">
            <FlaskConical className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              Pratique Appliquée
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
              Laboratoire Interactif · 5 Simulateurs
            </h1>
          </div>
        </div>
        <p className="mt-3 text-xs sm:text-sm text-slate-500 max-w-3xl leading-relaxed">
          Ici, tu ne te contentes pas de lire la théorie : tu manipules les outils et concepts exactement comme en entreprise ou lors des épreuves pratiques des examens officiels.
        </p>

        {/* Tab Navigation Pill Bar - Horizontal Swipe on Mobile */}
        <div className="mt-6 flex overflow-x-auto no-scrollbar sm:flex-wrap gap-2 border-t border-slate-100 pt-4 pb-1 sm:pb-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`shrink-0 flex items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm scale-[1.02]'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-teal-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulator Content Area */}
      <div>
        {activeTab === 'pert' && <PertLab />}
        {activeTab === 'gantt' && <GanttLab />}
        {activeTab === 'jira' && <JiraBoard />}
        {activeTab === 'git' && <GitLabVisualizer />}
        {activeTab === 'pipeline' && <DevOpsPipeline />}
      </div>
    </div>
  );
}

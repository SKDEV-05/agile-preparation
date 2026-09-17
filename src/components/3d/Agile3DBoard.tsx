import React, { useState } from 'react';
import { 
  Zap, 
  Layers, 
  CalendarRange, 
  Clock, 
  CheckCircle2, 
  Users, 
  Repeat, 
  Sparkles
} from 'lucide-react';

export type AgilePillar = 'scrum' | 'kanban' | 'sprint' | 'backlog' | 'daily' | 'retro';

export function Agile3DBoard() {
  const [activePillar, setActivePillar] = useState<AgilePillar>('scrum');

  const pillars = [
    {
      id: 'scrum' as AgilePillar,
      title: 'Scrum Framework',
      short: 'Rôles & Cérémonies',
      icon: Zap,
      color: 'from-indigo-500 to-purple-600',
      textColor: 'text-indigo-400',
      borderColor: 'border-indigo-500/30',
      examPoint: 'Rôles non hiérarchiques : Product Owner (Valeur), Scrum Master (Process), Développeurs (Livraison).'
    },
    {
      id: 'kanban' as AgilePillar,
      title: 'Système Kanban',
      short: 'WIP Limits & Flux',
      icon: Layers,
      color: 'from-cyan-500 to-blue-600',
      textColor: 'text-cyan-400',
      borderColor: 'border-cyan-500/30',
      examPoint: 'WIP (Work In Progress) limite l’engorgement et optimise le Lead Time sans itérations fixes.'
    },
    {
      id: 'sprint' as AgilePillar,
      title: 'Sprint (Itération)',
      short: '1 à 4 semaines',
      icon: CalendarRange,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      examPoint: 'Périmètre verrouillé pendant le sprint : la durée (Timebox) ne change jamais !'
    },
    {
      id: 'backlog' as AgilePillar,
      title: 'Product Backlog',
      short: 'User Stories INVEST',
      icon: Sparkles,
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500/30',
      examPoint: 'INVEST : Indépendante, Négociable, Valeur, Estimable, Suffisamment petite, Testable.'
    },
    {
      id: 'daily' as AgilePillar,
      title: 'Daily Scrum',
      short: '15 min Timeboxée',
      icon: Clock,
      color: 'from-rose-500 to-pink-600',
      textColor: 'text-rose-400',
      borderColor: 'border-rose-500/30',
      examPoint: 'Ce que j’ai fait hier, ce que je fais aujourd’hui, les obstacles bloquants.'
    },
    {
      id: 'retro' as AgilePillar,
      title: 'Rétrospective',
      short: 'Amélioration continue',
      icon: Repeat,
      color: 'from-purple-500 to-indigo-600',
      textColor: 'text-purple-400',
      borderColor: 'border-purple-500/30',
      examPoint: 'Analyse interne de l’équipe pour améliorer les processus au prochain sprint.'
    },
  ];

  const currentPillar = pillars.find(p => p.id === activePillar) || pillars[0];

  return (
    <div className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-gradient-to-b from-white via-slate-50 to-indigo-50/20 dark:from-slate-900/90 dark:via-slate-900/60 dark:to-[#070B14] p-5 sm:p-8 shadow-xl dark:shadow-2xl backdrop-blur-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
            <Zap className="h-3.5 w-3.5" />
            <span>Interactive Visual Architecture</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Les 6 Piliers Fondamentaux de l'Approche Agile
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Survole ou clique sur chaque concept pour visualiser sa dynamique 3D et le piège d'examen associé.
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 px-3 py-1 text-xs text-slate-700 dark:text-slate-300 font-medium self-start sm:self-auto">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Simulation Interactive 3D</span>
        </div>
      </div>

      {/* Pill Selector Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {pillars.map((p) => {
          const Icon = p.icon;
          const isActive = activePillar === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActivePillar(p.id)}
              className={`p-3 rounded-2xl border text-left transition-all duration-200 group ${
                isActive
                  ? `bg-white dark:bg-slate-800/90 ${p.borderColor} shadow-md shadow-indigo-500/10 scale-[1.02]`
                  : 'bg-slate-100/70 dark:bg-slate-900/40 border-slate-200/80 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200/80 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${p.color} text-white shadow-sm`}>
                  <Icon className="h-4 w-4" />
                </div>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-ping" />
                )}
              </div>
              <div className={`text-xs font-bold ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                {p.title}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {p.short}
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic 3D Display Container */}
      <div className="grid lg:grid-cols-12 gap-6 items-center rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-black/40 p-5 sm:p-7 shadow-sm">
        {/* Left Explanation & Exam Checklist */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
            <span className={`px-2 py-0.5 rounded-md bg-white dark:bg-white/5 border ${currentPillar.borderColor} ${currentPillar.textColor} shadow-xs`}>
              CONCEPT D'EXAMEN OFFICIEL
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {currentPillar.title}
          </h3>

          <div className="rounded-xl bg-indigo-50/80 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/20 p-3.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-1.5">
            <div className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Ce que l'examinateur attend de toi :</span>
            </div>
            <p>{currentPillar.examPoint}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/5 space-y-1 shadow-xs">
              <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400">Question Fréquente</div>
              <div className="font-bold text-slate-800 dark:text-slate-200">
                {activePillar === 'scrum' && 'Qui rédige les US ?'}
                {activePillar === 'kanban' && 'Que mesure le Lead Time ?'}
                {activePillar === 'sprint' && 'Peut-on changer le périmètre ?'}
                {activePillar === 'backlog' && 'Que signifie le E d\'INVEST ?'}
                {activePillar === 'daily' && 'Combien de temps dure-t-il ?'}
                {activePillar === 'retro' && 'Quelle différence avec la Review ?'}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/5 space-y-1 shadow-xs">
              <div className="text-[10px] font-mono uppercase text-emerald-600 dark:text-emerald-400 font-bold">Réponse Clé</div>
              <div className="font-bold text-emerald-700 dark:text-emerald-300">
                {activePillar === 'scrum' && 'Product Owner (avec l’équipe)'}
                {activePillar === 'kanban' && 'Du backlog à la livraison'}
                {activePillar === 'sprint' && 'Non ! Fixé pendant le sprint'}
                {activePillar === 'backlog' && 'Estimable'}
                {activePillar === 'daily' && '15 minutes maximum'}
                {activePillar === 'retro' && 'Review = produit, Retro = équipe'}
              </div>
            </div>
          </div>
        </div>

        {/* Right 3D Visual Interactive Simulation Area */}
        <div className="lg:col-span-6 relative flex justify-center items-center min-h-[220px] perspective-1000">
          {activePillar === 'scrum' && (
            <div className="w-full space-y-3 transform-style-preserve-3d animate-float-subtle">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-gradient-to-b dark:from-indigo-900/40 dark:to-slate-900/80 border border-indigo-200 dark:border-indigo-500/30 shadow-xs">
                  <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mx-auto mb-1" />
                  <div className="font-bold text-slate-900 dark:text-white text-xs">Product Owner</div>
                  <div className="text-[9px] text-indigo-700 dark:text-indigo-300">Porte la Vision</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-gradient-to-b dark:from-cyan-900/40 dark:to-slate-900/80 border border-cyan-200 dark:border-cyan-500/30 scale-105 shadow-md dark:shadow-xl shadow-cyan-500/10">
                  <Zap className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mx-auto mb-1" />
                  <div className="font-bold text-slate-900 dark:text-white text-xs">Scrum Master</div>
                  <div className="text-[9px] text-cyan-700 dark:text-cyan-300">Facilitateur</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-gradient-to-b dark:from-purple-900/40 dark:to-slate-900/80 border border-purple-200 dark:border-purple-500/30 shadow-xs">
                  <Layers className="h-5 w-5 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
                  <div className="font-bold text-slate-900 dark:text-white text-xs">Dev Team</div>
                  <div className="text-[9px] text-purple-700 dark:text-purple-300">Auto-organisée</div>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 text-center font-mono text-[10px] text-slate-700 dark:text-slate-300 shadow-xs">
                🔄 Sprint Planning ➔ Daily Scrum ➔ Sprint Review ➔ Rétrospective
              </div>
            </div>
          )}

          {activePillar === 'kanban' && (
            <div className="w-full grid grid-cols-3 gap-2 text-xs transform-style-preserve-3d animate-float-subtle">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 space-y-2 shadow-xs">
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>To Do</span>
                  <span className="text-slate-400 dark:text-slate-500">WIP 4</span>
                </div>
                <div className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 text-[9px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5">US-12 PERT</div>
                <div className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 text-[9px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5">US-14 Gantt</div>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-500/40 space-y-2 shadow-sm">
                <div className="text-[10px] font-bold text-cyan-800 dark:text-cyan-300 flex items-center justify-between">
                  <span>In Progress</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">WIP 2 (MAX)</span>
                </div>
                <div className="p-1.5 rounded bg-cyan-100 dark:bg-cyan-900/60 text-[9px] text-cyan-900 dark:text-white border border-cyan-300 dark:border-cyan-400/40 font-semibold">
                  US-08 Scrum Poker
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/40 space-y-2 shadow-xs">
                <div className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                  <span>Done</span>
                  <span className="text-emerald-600 dark:text-emerald-400">DoD ✓</span>
                </div>
                <div className="p-1.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-[9px] text-emerald-900 dark:text-white border border-emerald-300 dark:border-emerald-400/40 font-semibold">
                  US-02 Manifeste ✓
                </div>
              </div>
            </div>
          )}

          {activePillar === 'sprint' && (
            <div className="w-full space-y-3 transform-style-preserve-3d animate-float-subtle">
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 px-2 font-mono">
                <span>Jour 1 : Planning</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Timebox 2 semaines</span>
                <span>Jour 14 : Demo</span>
              </div>
              <div className="relative h-4 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500 w-3/4 rounded-full"></div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 shadow-xs">
                  🎯 <b className="text-slate-900 dark:text-white">Sprint Goal :</b> Livrer le calcul PERT interactif.
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 shadow-xs">
                  ⚡ <b className="text-slate-900 dark:text-white">Vélocité :</b> 35 Story Points / Sprint.
                </div>
              </div>
            </div>
          )}

          {activePillar === 'backlog' && (
            <div className="w-full space-y-2 transform-style-preserve-3d animate-float-subtle">
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-500/40 text-xs text-indigo-950 dark:text-white flex items-center justify-between shadow-xs">
                <span>En tant que stagiaire, je veux un simulateur PERT...</span>
                <span className="px-2 py-0.5 rounded bg-indigo-600 text-[9px] font-bold text-white">8 pts</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between shadow-xs">
                <span>En tant que formateur, je veux exporter les scores...</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[9px] font-bold text-slate-700 dark:text-slate-300">5 pts</span>
              </div>
              <div className="text-[10px] text-center text-amber-700 dark:text-amber-400 font-mono font-semibold">
                Critères INVEST vérifiés pour toutes les User Stories ✓
              </div>
            </div>
          )}

          {activePillar === 'daily' && (
            <div className="w-full p-4 rounded-2xl bg-gradient-to-br from-rose-50 to-white dark:from-rose-950/40 dark:to-slate-900 border border-rose-200 dark:border-rose-500/30 space-y-3 transform-style-preserve-3d animate-float-subtle shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-rose-800 dark:text-rose-300">
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> 15 Minutes Stand-up</span>
                <span className="text-[9px] bg-rose-100 dark:bg-rose-500/20 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-500/40 text-rose-800 dark:text-rose-300 font-semibold">Debout</span>
              </div>
              <div className="text-[10px] font-mono text-slate-700 dark:text-slate-300 space-y-1.5">
                <div className="flex items-start gap-1.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">1.</span>
                  <span>Ce que j'ai fait hier (ex: codé la classe Task PERT).</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">2.</span>
                  <span>Ce que je fais aujourd'hui (ex: tracé du chemin critique).</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-rose-600 dark:text-rose-400 font-bold">3.</span>
                  <span>Mes blocages (ex: question sur les marges libres).</span>
                </div>
              </div>
            </div>
          )}

          {activePillar === 'retro' && (
            <div className="w-full grid grid-cols-3 gap-2 text-center text-xs transform-style-preserve-3d animate-float-subtle">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 shadow-xs">
                <div className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 mb-1">Ce qui a marché</div>
                <div className="text-[9px] text-slate-600 dark:text-slate-300">Bonne communication sur Git</div>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30 shadow-xs">
                <div className="text-[10px] font-bold text-rose-800 dark:text-rose-300 mb-1">À améliorer</div>
                <div className="text-[9px] text-slate-600 dark:text-slate-300">Conflits de merge trop tardifs</div>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 shadow-xs">
                <div className="text-[10px] font-bold text-indigo-800 dark:text-indigo-300 mb-1">Actions Sprint+1</div>
                <div className="text-[9px] text-slate-600 dark:text-slate-300">Revue de PR quotidienne</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

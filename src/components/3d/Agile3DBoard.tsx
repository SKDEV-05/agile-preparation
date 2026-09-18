import React, { useState } from 'react';
import {
  Zap,
  Repeat,
  Layers,
  CalendarRange,
  Clock,
  Sparkles,
  Users,
  CheckCircle2
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
      color: 'from-[#10B981] to-[#22C55E]',
      textColor: 'text-[#10B981]',
      borderColor: 'border-[#10B981]/40',
      examPoint: 'Rôles non hiérarchiques : Product Owner (Valeur), Scrum Master (Process), Développeurs (Livraison).'
    },
    {
      id: 'kanban' as AgilePillar,
      title: 'Système Kanban',
      short: 'WIP Limits & Flux',
      icon: Layers,
      color: 'from-[#22C55E] to-[#10B981]',
      textColor: 'text-[#22C55E]',
      borderColor: 'border-[#22C55E]/40',
      examPoint: 'WIP (Work In Progress) limite l’engorgement et optimise le Lead Time sans itérations fixes.'
    },
    {
      id: 'sprint' as AgilePillar,
      title: 'Sprint (Itération)',
      short: '1 à 4 semaines',
      icon: CalendarRange,
      color: 'from-[#10B981] to-[#22C55E]',
      textColor: 'text-[#10B981]',
      borderColor: 'border-[#10B981]/40',
      examPoint: 'Périmètre verrouillé pendant le sprint : la durée (Timebox) ne change jamais !'
    },
    {
      id: 'backlog' as AgilePillar,
      title: 'Product Backlog',
      short: 'User Stories INVEST',
      icon: Sparkles,
      color: 'from-[#22C55E] to-[#10B981]',
      textColor: 'text-[#22C55E]',
      borderColor: 'border-[#22C55E]/40',
      examPoint: 'INVEST : Indépendante, Négociable, Valeur, Estimable, Suffisamment petite, Testable.'
    },
    {
      id: 'daily' as AgilePillar,
      title: 'Daily Scrum',
      short: '15 min Timeboxée',
      icon: Clock,
      color: 'from-[#10B981] to-[#22C55E]',
      textColor: 'text-[#10B981]',
      borderColor: 'border-[#10B981]/40',
      examPoint: 'Ce que j’ai fait hier, ce que je fais aujourd’hui, les obstacles bloquants.'
    },
    {
      id: 'retro' as AgilePillar,
      title: 'Rétrospective',
      short: 'Amélioration continue',
      icon: Repeat,
      color: 'from-[#22C55E] to-[#10B981]',
      textColor: 'text-[#22C55E]',
      borderColor: 'border-[#22C55E]/40',
      examPoint: 'Analyse interne de l’équipe pour améliorer les processus au prochain sprint.'
    },
  ];

  const currentPillar = pillars.find(p => p.id === activePillar) || pillars[0];

  return (
    <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-5 sm:p-8 shadow-xl backdrop-blur-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider mb-1">
            <Zap className="h-3.5 w-3.5" />
            <span>Interactive Visual Architecture</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
            Les 6 Piliers Fondamentaux de l'Approche Agile
          </h2>
          <p className="text-xs sm:text-sm text-black/60 dark:text-white/60 mt-0.5">
            Survole ou clique sur chaque concept pour visualiser sa dynamique 3D et le piège d'examen associé.
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-1 text-xs text-black dark:text-white font-medium self-start sm:self-auto">
          <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse"></span>
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
              className={`p-3 rounded-2xl border text-left transition-all duration-200 group cursor-pointer ${
                isActive
                  ? `bg-white dark:bg-[#0A0A0A] ${p.borderColor} shadow-md shadow-[#10B981]/10 scale-[1.02]`
                  : 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${p.color} text-white shadow-sm`}>
                  <Icon className="h-4 w-4" />
                </div>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-ping" />
                )}
              </div>
              <div className={`text-xs font-bold ${isActive ? 'text-black dark:text-white' : 'text-black/80 dark:text-white/80 group-hover:text-black dark:group-hover:text-white'}`}>
                {p.title}
              </div>
              <div className="text-[10px] text-black/50 dark:text-white/50 truncate mt-0.5">
                {p.short}
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic 3D Display Container */}
      <div className="grid lg:grid-cols-12 gap-6 items-center rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-5 sm:p-7 shadow-sm">
        {/* Left Explanation & Exam Checklist */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-black/60 dark:text-white/60">
            <span className={`px-2 py-0.5 rounded-md bg-white dark:bg-[#0A0A0A] border ${currentPillar.borderColor} ${currentPillar.textColor} shadow-xs font-mono`}>
              CONCEPT D'EXAMEN OFFICIEL
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-black dark:text-white">
            {currentPillar.title}
          </h3>

          <div className="rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 p-3.5 text-xs text-black dark:text-white leading-relaxed space-y-1.5">
            <div className="font-bold text-[#10B981] flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981]" />
              <span>Ce que l'examinateur attend de toi :</span>
            </div>
            <p className="text-black/80 dark:text-white/80">{currentPillar.examPoint}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 space-y-1 shadow-xs">
              <div className="text-[10px] font-mono uppercase text-black/50 dark:text-white/50">Question Fréquente</div>
              <div className="font-bold text-black dark:text-white">
                {activePillar === 'scrum' && 'Qui rédige les US ?'}
                {activePillar === 'kanban' && 'Que mesure le Lead Time ?'}
                {activePillar === 'sprint' && 'Peut-on changer le périmètre ?'}
                {activePillar === 'backlog' && 'Que signifie le E d\'INVEST ?'}
                {activePillar === 'daily' && 'Combien de temps dure-t-il ?'}
                {activePillar === 'retro' && 'Quelle différence avec la Review ?'}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 space-y-1 shadow-xs">
              <div className="text-[10px] font-mono uppercase text-[#10B981] font-bold">Réponse Clé</div>
              <div className="font-bold text-[#10B981]">
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
                <div className="p-3 rounded-xl bg-white dark:bg-[#0A0A0A] border border-[#10B981]/40 shadow-xs">
                  <Users className="h-5 w-5 text-[#10B981] mx-auto mb-1" />
                  <div className="font-bold text-black dark:text-white text-xs">Product Owner</div>
                  <div className="text-[9px] text-[#10B981]">Porte la Vision</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#0A0A0A] border border-[#22C55E]/40 scale-105 shadow-md shadow-[#22C55E]/10">
                  <Zap className="h-5 w-5 text-[#22C55E] mx-auto mb-1" />
                  <div className="font-bold text-black dark:text-white text-xs">Scrum Master</div>
                  <div className="text-[9px] text-[#22C55E]">Facilitateur</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-[#0A0A0A] border border-[#10B981]/40 shadow-xs">
                  <Layers className="h-5 w-5 text-[#10B981] mx-auto mb-1" />
                  <div className="font-bold text-black dark:text-white text-xs">Dev Team</div>
                  <div className="text-[9px] text-[#10B981]">Auto-organisée</div>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 text-center font-mono text-[10px] text-black/80 dark:text-white/80 shadow-xs">
                🔄 Sprint Planning ➔ Daily Scrum ➔ Sprint Review ➔ Rétrospective
              </div>
            </div>
          )}

          {activePillar === 'kanban' && (
            <div className="w-full grid grid-cols-3 gap-2 text-xs transform-style-preserve-3d animate-float-subtle">
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 space-y-2 shadow-xs">
                <div className="text-[10px] font-bold text-black/50 dark:text-white/50 flex items-center justify-between">
                  <span>To Do</span>
                  <span className="text-black/40 dark:text-white/40 font-mono">WIP 4</span>
                </div>
                <div className="p-1.5 rounded bg-black/5 dark:bg-white/5 text-[9px] text-black dark:text-white border border-black/5 dark:border-white/5 font-mono">US-12 PERT</div>
                <div className="p-1.5 rounded bg-black/5 dark:bg-white/5 text-[9px] text-black dark:text-white border border-black/5 dark:border-white/5 font-mono">US-14 Gantt</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/40 space-y-2 shadow-sm">
                <div className="text-[10px] font-bold text-[#22C55E] flex items-center justify-between">
                  <span>In Progress</span>
                  <span className="text-[#22C55E] font-bold font-mono">WIP 2 (MAX)</span>
                </div>
                <div className="p-1.5 rounded bg-[#22C55E]/20 text-[9px] text-black dark:text-white border border-[#22C55E]/40 font-semibold font-mono">
                  US-08 Scrum Poker
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#10B981]/10 border border-[#10B981]/40 space-y-2 shadow-xs">
                <div className="text-[10px] font-bold text-[#10B981] flex items-center justify-between">
                  <span>Done</span>
                  <span className="text-[#10B981] font-mono">DoD ✓</span>
                </div>
                <div className="p-1.5 rounded bg-[#10B981]/20 text-[9px] text-black dark:text-white border border-[#10B981]/40 font-semibold font-mono">
                  US-02 Manifeste ✓
                </div>
              </div>
            </div>
          )}

          {activePillar === 'sprint' && (
            <div className="w-full space-y-3 transform-style-preserve-3d animate-float-subtle">
              <div className="flex items-center justify-between text-xs text-black/70 dark:text-white/70 px-2 font-mono">
                <span>Jour 1 : Planning</span>
                <span className="text-[#10B981] font-bold">Timebox 2 semaines</span>
                <span>Jour 14 : Demo</span>
              </div>
              <div className="relative h-4 rounded-full bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#10B981] to-[#22C55E] w-3/4 rounded-full"></div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2 rounded-lg bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 shadow-xs">
                  🎯 <b className="text-black dark:text-white">Sprint Goal :</b> Livrer le calcul PERT interactif.
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 shadow-xs">
                  ⚡ <b className="text-black dark:text-white">Vélocité :</b> 35 Story Points / Sprint.
                </div>
              </div>
            </div>
          )}

          {activePillar === 'backlog' && (
            <div className="w-full space-y-2 transform-style-preserve-3d animate-float-subtle">
              <div className="p-2.5 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-xs text-black dark:text-white flex items-center justify-between shadow-xs">
                <span>En tant que stagiaire, je veux un simulateur PERT...</span>
                <span className="px-2 py-0.5 rounded bg-[#22C55E] text-[9px] font-bold text-white font-mono">8 pts</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 text-xs text-black/80 dark:text-white/80 flex items-center justify-between shadow-xs">
                <span>En tant que formateur, je veux exporter les scores...</span>
                <span className="px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 text-[9px] font-bold text-black dark:text-white font-mono">5 pts</span>
              </div>
              <div className="text-[10px] text-center text-[#10B981] font-mono font-semibold">
                Critères INVEST vérifiés pour toutes les User Stories ✓
              </div>
            </div>
          )}

          {activePillar === 'daily' && (
            <div className="w-full p-4 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-[#10B981]/30 space-y-3 transform-style-preserve-3d animate-float-subtle shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-black dark:text-white">
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-[#10B981]" /> 15 Minutes Stand-up</span>
                <span className="text-[9px] bg-[#10B981]/10 px-2 py-0.5 rounded-full border border-[#10B981]/30 text-[#10B981] font-semibold">Debout</span>
              </div>
              <div className="text-[10px] font-mono text-black/70 dark:text-white/70 space-y-1.5">
                <div className="flex items-start gap-1.5">
                  <span className="text-[#10B981] font-bold">1.</span>
                  <span>Ce que j'ai fait hier (ex: codé la classe Task PERT).</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-[#22C55E] font-bold">2.</span>
                  <span>Ce que je fais aujourd'hui (ex: tracé du chemin critique).</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-black dark:text-white font-bold">3.</span>
                  <span>Mes blocages (ex: question sur les marges libres).</span>
                </div>
              </div>
            </div>
          )}

          {activePillar === 'retro' && (
            <div className="w-full grid grid-cols-3 gap-2 text-center text-xs transform-style-preserve-3d animate-float-subtle">
              <div className="p-2.5 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 shadow-xs">
                <div className="text-[10px] font-bold text-[#10B981] mb-1">Ce qui a marché</div>
                <div className="text-[9px] text-black/70 dark:text-white/70">Bonne communication sur Git</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 shadow-xs">
                <div className="text-[10px] font-bold text-[#22C55E] mb-1">À améliorer</div>
                <div className="text-[9px] text-black/70 dark:text-white/70">Conflits de merge trop tardifs</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 shadow-xs">
                <div className="text-[10px] font-bold text-black dark:text-white mb-1">Actions Sprint+1</div>
                <div className="text-[9px] text-black/70 dark:text-white/70">Revue de PR quotidienne</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

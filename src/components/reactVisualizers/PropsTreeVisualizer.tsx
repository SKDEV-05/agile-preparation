import React, { useState } from 'react';
import { GitFork, ArrowDown, CornerDownLeft, Sparkles } from 'lucide-react';

export function PropsTreeVisualizer() {
  const [userName, setUserName] = useState('Sara El Mansouri');
  const [userRole, setUserRole] = useState('Stagiaire 2A');
  const [lastCallbackMessage, setLastCallbackMessage] = useState<string | null>(null);

  const handleChildAction = (msg: string) => {
    setLastCallbackMessage(msg);
    setTimeout(() => setLastCallbackMessage(null), 3000);
  };

  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-4 sm:p-6 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/10 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider">
            <GitFork className="h-4 w-4" />
            <span>Arbre de Composants & Flux Descendant des Props</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-[#0A0A0A] dark:text-white mt-0.5">
            Communication Parent $\rightarrow$ Enfant & Callbacks
          </h4>
        </div>

        {lastCallbackMessage && (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22C55E]/15 text-[#22C55E] text-xs font-mono font-bold border border-[#22C55E]/30 animate-bounce">
            <CornerDownLeft className="h-3.5 w-3.5" />
            <span>{lastCallbackMessage}</span>
          </span>
        )}
      </div>

      {/* Parent Controller */}
      <div className="rounded-xl border border-[#10B981]/30 bg-[#10B981]/5 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded">
            &lt;AppParent /&gt; (Détenteur du State)
          </span>
          <span className="text-[11px] text-[#0A0A0A]/60 dark:text-white/60 font-mono">
            Source de Vérité
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-[#0A0A0A]/70 dark:text-white/70 mb-1">
              Nom du Stagiaire (State Parent) :
            </label>
            <input
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-white text-xs focus:ring-2 focus:ring-[#10B981] outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#0A0A0A]/70 dark:text-white/70 mb-1">
              Filière / Rôle (State Parent) :
            </label>
            <select
              value={userRole}
              onChange={e => setUserRole(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-white text-xs focus:ring-2 focus:ring-[#10B981] outline-none"
            >
              <option value="Stagiaire 2A">Stagiaire 2A</option>
              <option value="Lauréat Major">Lauréat Major</option>
              <option value="Délégué Filière">Délégué Filière</option>
            </select>
          </div>
        </div>
      </div>

      {/* Downward Props Flow Indicator */}
      <div className="flex justify-center items-center py-1 text-[#10B981]">
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold bg-black/5 dark:bg-white/5 px-3 py-1 rounded-full border border-black/10 dark:border-white/10">
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          <span>Props descendantes : nom="{userName}" role="{userRole}" onAction=&#123;fn&#125;</span>
        </div>
      </div>

      {/* Child Components Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Child 1: Card Display */}
        <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#0A0A0A]/70 dark:text-white/70">
              &lt;ProfilCard /&gt; (Enfant 1)
            </span>
            <span className="text-[10px] font-mono text-[#10B981]">Lecture Seule</span>
          </div>
          <div className="p-3 rounded-lg bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 space-y-1">
            <div className="text-sm font-bold text-[#0A0A0A] dark:text-white">{userName}</div>
            <div className="text-xs text-[#10B981] font-mono">{userRole}</div>
            <p className="text-[11px] text-[#0A0A0A]/60 dark:text-white/60 pt-1">
              Reçoit les props et les affiche sans pouvoir les modifier directement.
            </p>
          </div>
        </div>

        {/* Child 2: Action Button with Callback */}
        <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#0A0A0A]/70 dark:text-white/70">
              &lt;ActionPanel /&gt; (Enfant 2)
            </span>
            <span className="text-[10px] font-mono text-[#22C55E]">Callback Ascendant</span>
          </div>
          <div className="p-3 rounded-lg bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 space-y-2">
            <p className="text-[11px] text-[#0A0A0A]/60 dark:text-white/60">
              L'enfant déclenche le callback transmis par le parent pour notifier un événement :
            </p>
            <button
              onClick={() => handleChildAction(`Validation envoyée pour ${userName} !`)}
              className="w-full py-2 px-3 rounded-lg bg-[#10B981] hover:bg-[#22C55E] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Invoquer props.onAction()</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

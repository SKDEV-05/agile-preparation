import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Check, 
  Sparkles,
  ChevronRight,
  Code2,
  Server,
  Database,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function Hero3DScene() {
  const [activeTab, setActiveTab] = useState<'react' | 'laravel' | 'sgbd' | 'agile'>('react');
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle tabs every 4.5 seconds unless hovered/paused
  useEffect(() => {
    if (isPaused) return;
    const tabs: Array<'react' | 'laravel' | 'sgbd' | 'agile'> = ['react', 'laravel', 'sgbd', 'agile'];
    const timer = setInterval(() => {
      setActiveTab(current => {
        const nextIndex = (tabs.indexOf(current) + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full max-w-lg mx-auto select-none"
    >
      {/* Ambient background glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#10B981]/20 to-[#22C55E]/20 rounded-3xl blur-2xl opacity-75 pointer-events-none" />

      {/* Main Studio Frame Window */}
      <div className="relative rounded-3xl border border-black/15 dark:border-white/15 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-2xl shadow-2xl overflow-hidden text-[#0A0A0A] dark:text-white transition-all">
        {/* Top Window Chrome Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-black/[0.03] dark:bg-white/[0.04] border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#22C55E]/80"></div>
            <div className="h-3 w-3 rounded-full bg-[#10B981]/80"></div>
            <div className="h-3 w-3 rounded-full bg-black/20 dark:bg-white/20"></div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-[#0A0A0A]/70 dark:text-white/70 font-semibold">
            <Terminal className="h-3.5 w-3.5 text-[#10B981]" />
            <span>fullstack-2a.ofppt/studio-live</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#10B981]/15 px-2 py-0.5 rounded-full border border-[#10B981]/30">
            <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="text-[10px] font-mono font-bold text-[#10B981]">2A OFPPT</span>
          </div>
        </div>

        {/* Interactive Navigation Tabs for the 4 Key Curriculum Domains */}
        <div className="flex items-center border-b border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.02] p-1.5 gap-1 overflow-x-auto no-scrollbar text-xs font-bold">
          <button
            onClick={() => setActiveTab('react')}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl transition-all cursor-pointer truncate text-[11px]",
              activeTab === 'react'
                ? "bg-[#10B981] text-white shadow-xs"
                : "text-[#0A0A0A]/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5"
            )}
          >
            <Code2 className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">React.js</span>
          </button>

          <button
            onClick={() => setActiveTab('laravel')}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl transition-all cursor-pointer truncate text-[11px]",
              activeTab === 'laravel'
                ? "bg-[#10B981] text-white shadow-xs"
                : "text-[#0A0A0A]/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5"
            )}
          >
            <Server className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Laravel</span>
          </button>

          <button
            onClick={() => setActiveTab('sgbd')}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl transition-all cursor-pointer truncate text-[11px]",
              activeTab === 'sgbd'
                ? "bg-[#10B981] text-white shadow-xs"
                : "text-[#0A0A0A]/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5"
            )}
          >
            <Database className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">SGBD SQL</span>
          </button>

          <button
            onClick={() => setActiveTab('agile')}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl transition-all cursor-pointer truncate text-[11px]",
              activeTab === 'agile'
                ? "bg-[#10B981] text-white shadow-xs"
                : "text-[#0A0A0A]/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5"
            )}
          >
            <Layers className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Agile & DevOps</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="p-5 sm:p-6 min-h-[310px] flex flex-col justify-between">
          
          {/* TAB 1: FRONTEND REACT.JS */}
          {activeTab === 'react' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Code2 className="h-3.5 w-3.5 text-[#10B981]" />
                  <span className="text-xs font-mono font-bold text-[#10B981] uppercase">Module M202 · React & Hooks</span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-[#10B981]/15 text-[#10B981] px-2 py-0.5 rounded-md border border-[#10B981]/30">
                  Virtual DOM · 60 FPS
                </span>
              </div>

              {/* Code Snippet Box */}
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-3 font-mono text-[11px] space-y-1 text-[#0A0A0A]/85 dark:text-white/85">
                <div><span className="text-[#10B981] font-bold">function</span> <span className="text-[#22C55E]">StagiaireApp</span>() &#123;</div>
                <div className="pl-3"><span className="text-[#10B981] font-bold">const</span> [efm, setEfm] = <span className="text-[#22C55E]">useState</span>(&#123; note: <span className="text-[#22C55E] font-bold">19.5</span>, mention: <span className="text-[#10B981]">'Très Bien'</span> &#125;);</div>
                <div className="pl-3"><span className="text-[#10B981] font-bold">return</span> &lt;<span className="text-[#22C55E]">ExamBadge</span> filiere=<span className="text-[#10B981]">"FullStack 2A"</span> score=&#123;efm.note&#125; /&gt;;</div>
                <div>&#125;</div>
              </div>

              {/* Live Rendered Component Box */}
              <div className="rounded-2xl border border-[#10B981]/40 bg-[#10B981]/10 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-xl bg-[#10B981] text-white flex items-center justify-center font-bold text-xs">
                    FS
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0A0A0A] dark:text-white">Filière FullStack 2A · OFPPT</div>
                    <div className="text-[10px] text-[#0A0A0A]/60 dark:text-white/60 font-mono">React v18 + Redux Toolkit</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-mono font-bold text-[#10B981] bg-white dark:bg-[#0A0A0A] px-2.5 py-1 rounded-lg border border-[#10B981]/30">
                  <Check className="h-3.5 w-3.5" />
                  <span>19.5/20 EFM</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BACKEND LARAVEL */}
          {activeTab === 'laravel' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Server className="h-3.5 w-3.5 text-[#22C55E]" />
                  <span className="text-xs font-mono font-bold text-[#22C55E] uppercase">Module M203 · Laravel API REST</span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-[#22C55E]/15 text-[#22C55E] px-2 py-0.5 rounded-md border border-[#22C55E]/30">
                  HTTP 200 OK · 18ms
                </span>
              </div>

              {/* Code Snippet Box */}
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-3 font-mono text-[11px] space-y-1 text-[#0A0A0A]/85 dark:text-white/85">
                <div><span className="text-[#22C55E] font-bold">Route::</span>get(<span className="text-[#10B981]">'/api/v1/efm-stagiaires'</span>, <span className="text-[#10B981] font-bold">function</span> () &#123;</div>
                <div className="pl-3"><span className="text-[#10B981] font-bold">return</span> <span className="text-[#22C55E]">Stagiaire::</span>with(<span className="text-[#10B981]">'notes'</span>)-&gt;where(<span className="text-[#10B981]">'annee'</span>, 2)-&gt;get();</div>
                <div>&#125;);</div>
              </div>

              {/* JSON Response Live Preview */}
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-3 font-mono text-[10px] space-y-0.5">
                <div className="text-[#0A0A0A]/50 dark:text-white/50">// Réponse JSON normalisée API REST</div>
                <div className="text-[#10B981]">&#123; "status": 200, "filiere": "Développement Digital 2A", "efm_ready": true &#125;</div>
              </div>
            </div>
          )}

          {/* TAB 3: SGBD & SQL AVANCÉ */}
          {activeTab === 'sgbd' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Database className="h-3.5 w-3.5 text-[#10B981]" />
                  <span className="text-xs font-mono font-bold text-[#10B981] uppercase">Module M204 · SGBD & SQL</span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-[#10B981]/15 text-[#10B981] px-2 py-0.5 rounded-md border border-[#10B981]/30">
                  Transactions ACID · 0.4ms
                </span>
              </div>

              {/* SQL Query Snippet */}
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-3 font-mono text-[11px] space-y-1 text-[#0A0A0A]/85 dark:text-white/85">
                <div><span className="text-[#10B981] font-bold">SELECT</span> m.code, AVG(e.note) <span className="text-[#10B981] font-bold">AS</span> moyenne</div>
                <div><span className="text-[#10B981] font-bold">FROM</span> examens e <span className="text-[#22C55E] font-bold">JOIN</span> modules m <span className="text-[#10B981] font-bold">ON</span> e.mod_id = m.id</div>
                <div><span className="text-[#10B981] font-bold">GROUP BY</span> m.code <span className="text-[#22C55E] font-bold">HAVING</span> moyenne &gt;= 16;</div>
              </div>

              {/* Data Table Result Preview */}
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-2.5 font-mono text-[10px]">
                <div className="grid grid-cols-3 text-[#0A0A0A]/50 dark:text-white/50 pb-1 border-b border-black/10 dark:border-white/10 font-bold">
                  <span>MODULE</span>
                  <span>STATUT</span>
                  <span className="text-right">RÉSULTAT</span>
                </div>
                <div className="grid grid-cols-3 pt-1 text-[#10B981] font-semibold">
                  <span>M201 Agile</span>
                  <span>Validé</span>
                  <span className="text-right">18.5/20</span>
                </div>
                <div className="grid grid-cols-3 pt-0.5 text-[#22C55E] font-semibold">
                  <span>M202 React</span>
                  <span>Validé</span>
                  <span className="text-right">17.0/20</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AGILE & DEVOPS */}
          {activeTab === 'agile' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Layers className="h-3.5 w-3.5 text-[#10B981]" />
                  <span className="text-xs font-mono font-bold text-[#10B981] uppercase">Module M201 · Approche Agile & CI/CD</span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-[#10B981]/15 text-[#10B981] px-2 py-0.5 rounded-md border border-[#10B981]/30">
                  Sprint 04 · Done
                </span>
              </div>

              {/* 3 Columns Mini Kanban */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-2 space-y-1">
                  <div className="text-[9px] font-mono font-bold text-[#0A0A0A]/50 dark:text-white/50 uppercase">To Do</div>
                  <div className="rounded-lg bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 p-1.5 text-[9px] font-medium">
                    Calcul PERT
                  </div>
                </div>
                <div className="rounded-xl border border-[#10B981]/30 bg-[#10B981]/5 p-2 space-y-1">
                  <div className="text-[9px] font-mono font-bold text-[#10B981] uppercase">In Dev</div>
                  <div className="rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#10B981]/30 p-1.5 text-[9px] font-bold text-[#10B981]">
                    Sprint Scrum
                  </div>
                </div>
                <div className="rounded-xl border border-[#22C55E]/30 bg-[#22C55E]/5 p-2 space-y-1">
                  <div className="text-[9px] font-mono font-bold text-[#22C55E] uppercase">Done</div>
                  <div className="rounded-lg bg-white dark:bg-[#0A0A0A] border border-[#22C55E]/30 p-1.5 text-[9px] font-bold text-[#22C55E]">
                    GitLab CI/CD ✓
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-2.5 text-[11px] flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-[9px] font-mono text-[#0A0A0A]/50 dark:text-white/50 uppercase font-bold">Formule EFM</div>
                  <div className="font-mono text-[#0A0A0A] dark:text-white font-bold">Chemin Critique = 20j (Marge = 0)</div>
                </div>
                <div className="flex items-center gap-1 text-[#10B981] font-bold font-mono text-[10px]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Prêt EFM</span>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Interactive Status Bar */}
          <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-[#0A0A0A]/60 dark:text-white/60 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#10B981]" />
              <span>Studio interactif FullStack 2A</span>
            </span>
            <span className="text-[#10B981] font-bold flex items-center gap-1 hover:underline cursor-pointer">
              <span>Programme complet</span>
              <ChevronRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

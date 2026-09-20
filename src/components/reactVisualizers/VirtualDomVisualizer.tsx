import React, { useState } from 'react';
import { Layers, Sparkles, RefreshCw, Zap, CheckCircle2 } from 'lucide-react';

interface NodeItem {
  id: string;
  tag: string;
  text: string;
  isModified: boolean;
}

export function VirtualDomVisualizer() {
  const [activeItem, setActiveItem] = useState<'A' | 'B' | 'C'>('B');
  const [reconciling, setReconciling] = useState(false);
  const [fps, setFps] = useState(60);

  const prevVdom: NodeItem[] = [
    { id: '1', tag: 'div#root', text: '<App />', isModified: false },
    { id: '2', tag: 'header', text: 'Titre de l\'Application', isModified: false },
    { id: '3', tag: 'button', text: 'Sélection actuelle : B', isModified: false },
    { id: '4', tag: 'footer', text: 'OFPPT Cursus 2026', isModified: false },
  ];

  const currentVdom: NodeItem[] = [
    { id: '1', tag: 'div#root', text: '<App />', isModified: false },
    { id: '2', tag: 'header', text: 'Titre de l\'Application', isModified: false },
    { id: '3', tag: 'button', text: `Sélection actuelle : ${activeItem}`, isModified: activeItem !== 'B' },
    { id: '4', tag: 'footer', text: 'OFPPT Cursus 2026', isModified: false },
  ];

  const handleSelect = (val: 'A' | 'B' | 'C') => {
    setActiveItem(val);
    setReconciling(true);
    setFps(59);
    setTimeout(() => {
      setReconciling(false);
      setFps(60);
    }, 450);
  };

  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-4 sm:p-6 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/10 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider">
            <Layers className="h-4 w-4" />
            <span>Simulateur Interactif · Virtual DOM & Réconciliation</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-[#0A0A0A] dark:text-white mt-0.5">
            Comment React met à jour le DOM sans gaspillage
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] text-xs font-mono font-bold border border-[#10B981]/30">
            <Zap className="h-3.5 w-3.5" />
            <span>{fps} FPS Fluide</span>
          </span>
          {reconciling && (
            <span className="flex items-center gap-1 text-[11px] font-mono text-[#22C55E] animate-pulse">
              <RefreshCw className="h-3 w-3 animate-spin" />
              <span>Diffing O(n)...</span>
            </span>
          )}
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-[#0A0A0A]/70 dark:text-white/70">Modifier l'état local :</span>
        {(['A', 'B', 'C'] as const).map(option => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={`px-3 py-1.5 rounded-xl font-mono font-bold transition-all cursor-pointer ${
              activeItem === option
                ? 'bg-[#10B981] text-white shadow-xs'
                : 'bg-black/5 dark:bg-white/5 text-[#0A0A0A]/80 dark:text-white/80 hover:bg-[#10B981]/10 hover:text-[#10B981]'
            }`}
          >
            Valeur {option}
          </button>
        ))}
      </div>

      {/* Side by side tree comparison */}
      <div className="grid md:grid-cols-2 gap-4 pt-1">
        {/* Previous Virtual DOM */}
        <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[#0A0A0A]/60 dark:text-white/60">
            <span>Virtual DOM Précédent (RAM)</span>
            <span className="text-[10px]">Arbre initial</span>
          </div>
          <div className="space-y-1.5 font-mono text-xs">
            {prevVdom.map(node => (
              <div
                key={node.id}
                className="p-2 rounded-lg bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 flex items-center justify-between"
              >
                <span className="text-[#0A0A0A]/70 dark:text-white/70">&lt;{node.tag}&gt;</span>
                <span className="text-black/50 dark:text-white/50 text-[11px] truncate max-w-[160px]">{node.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Virtual DOM & Diffing */}
        <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[#10B981]">
            <span>Nouveau Virtual DOM & Patch Réel</span>
            <span className="text-[10px] bg-[#10B981]/15 px-1.5 py-0.5 rounded text-[#10B981]">
              1 Nœud Muté
            </span>
          </div>
          <div className="space-y-1.5 font-mono text-xs">
            {currentVdom.map(node => (
              <div
                key={node.id}
                className={`p-2 rounded-lg border transition-all duration-300 flex items-center justify-between ${
                  node.isModified
                    ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981] font-bold shadow-xs scale-[1.02]'
                    : 'bg-white dark:bg-[#0A0A0A] border-black/10 dark:border-white/10 text-[#0A0A0A]/70 dark:text-white/70 opacity-60'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {node.isModified && <Sparkles className="h-3 w-3 text-[#10B981] shrink-0" />}
                  <span>&lt;{node.tag}&gt;</span>
                </span>
                <span className="text-[11px] truncate max-w-[160px]">{node.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explanatory badge */}
      <div className="rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 p-3 text-xs text-[#0A0A0A]/85 dark:text-white/85 flex items-start gap-2.5">
        <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Résultat de réconciliation :</strong> Sur les 4 nœuds de l'arbre, seul le bouton a été modifié en mémoire vive. React applique une <strong>mutation chirurgicale unique</strong> dans le DOM du navigateur, évitant tout reflow des éléments header, footer et racine.
        </p>
      </div>
    </div>
  );
}

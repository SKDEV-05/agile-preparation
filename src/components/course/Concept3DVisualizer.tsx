import React, { useState } from 'react';
import { Model3DType } from '../../types';
import { Badge } from '../ui/Badge';
import { Rotate3d, RefreshCw } from 'lucide-react';

interface Concept3DVisualizerProps {
  type: Model3DType;
}

export function Concept3DVisualizer({ type }: Concept3DVisualizerProps) {
  const [rotation, setRotation] = useState({ x: 15, y: -20 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Triple Constraint Interactive State (Périmètre, Coût, Délais)
  const [scope, setScope] = useState(80);
  const [cost, setCost] = useState(70);
  const [time, setTime] = useState(60);

  // Mouse / Touch rotation handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setRotation(prev => ({
      x: Math.max(-45, Math.min(45, prev.x - deltaY * 0.4)),
      y: Math.max(-60, Math.min(60, prev.y + deltaX * 0.4)),
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleResetRotation = () => {
    setRotation({ x: 15, y: -20 });
  };

  // 1. Triple Constraint 3D Pyramid & Dynamic Morphing Core
  const renderTriangle3D = () => {
    // Metrics calculation
    const avg = Math.round((scope + cost + time) / 3);
    const imbalance = Math.max(
      Math.abs(scope - cost),
      Math.abs(cost - time),
      Math.abs(scope - time)
    );

    // Health state: balanced (optimal), warning (imbalanced), danger (critical)
    const isCritical = imbalance > 30 || avg < 45;
    const isWarning = imbalance > 16 && !isCritical;
    const isOptimal = !isCritical && !isWarning;

    const squareWidth = Math.round(110 + (cost - 20) * 1.5);
    const squareHeight = Math.round(110 + (scope - 20) * 1.5);
    const squareScale = (0.75 + (avg / 100) * 0.5).toFixed(2);
    const tiltAngle = ((cost - time) * 0.45).toFixed(1);

    // Dynamic vertex positions
    const topY = Math.round(5 - (scope - 50) * 0.7);
    const leftX = Math.round(5 - (cost - 50) * 0.7);
    const rightX = Math.round(5 - (time - 50) * 0.7);

    return (
      <div className="flex flex-col items-center py-4">
        {/* Real-time Status Alert Header */}
        <div className="w-full max-w-lg mb-4 flex flex-wrap items-center justify-between gap-2 px-4 py-3 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] text-xs shadow-md">
          <div className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-full ${
              isOptimal
                ? 'bg-[#10B981] shadow-[0_0_12px_#10B981]'
                : isWarning
                ? 'bg-[#22C55E] shadow-[0_0_12px_#22C55E]'
                : 'bg-[#22C55E] shadow-[0_0_12px_#22C55E] animate-pulse'
            }`} />
            <span className="font-bold text-black dark:text-white text-xs sm:text-sm">
              {isOptimal ? 'Équilibre Optimal (Projet Sain)' : isWarning ? 'Tension Détectée (Risque de Dérive)' : 'Déséquilibre Critique (Échec Imminent)'}
            </span>
          </div>
          <div className="text-black/80 dark:text-white/80 font-mono text-[11px] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-2.5 py-1 rounded-xl">
            Charge Globale : <b className={isOptimal ? 'text-[#10B981]' : 'text-[#22C55E]'}>{avg}%</b>
          </div>
        </div>

        <div
          className="relative w-80 h-80 select-none cursor-grab active:cursor-grabbing perspective-1000"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="w-full h-full duration-150 transform-style-preserve-3d transition-transform flex items-center justify-center relative"
            style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
          >
            {/* Dynamic Connecting SVG Polygon in 3D Space */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'translateZ(-15px)' }}>
              <polygon
                points={`160,${40 + topY} ${40 + leftX},260 ${280 - rightX},260`}
                fill={isOptimal ? "rgba(16,185,129,0.1)" : "rgba(34,197,94,0.12)"}
                stroke={isOptimal ? "rgba(16,185,129,0.6)" : "rgba(34,197,94,0.7)"}
                strokeWidth="2"
                strokeDasharray="4 4"
                className="transition-all duration-200"
              />
            </svg>

            {/* Base 3D Central Square */}
            <div
              className={`absolute rounded-3xl border-2 backdrop-blur-xl flex items-center justify-center transition-all duration-200 shadow-xl ${
                isOptimal
                  ? 'border-[#10B981] bg-white dark:bg-[#0A0A0A] shadow-[0_0_35px_rgba(16,185,129,0.2)]'
                  : 'border-[#22C55E] bg-white dark:bg-[#0A0A0A] shadow-[0_0_35px_rgba(34,197,94,0.25)]'
              }`}
              style={{
                width: `${squareWidth}px`,
                height: `${squareHeight}px`,
                transform: `translateZ(-30px) scale(${squareScale}) rotateZ(${tiltAngle}deg)`,
              }}
            >
              <div className="text-center p-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#22C55E]">
                  QUALITÉ CENTRALE
                </span>
                <div className="text-base font-black text-black dark:text-white mt-0.5">
                  Équilibre Projet
                </div>
                <div className="text-[11px] font-semibold mt-1 transition-colors text-black/70 dark:text-white/70">
                  {isOptimal ? '✓ Projet sous contrôle' : isWarning ? '⚠️ Risque d’écart' : 'Dérive majeure'}
                </div>
                <div className="mt-1 font-mono text-[9px] text-black/40 dark:text-white/40">
                  Dim: {squareWidth}x{squareHeight}px · Tilt: {tiltAngle}°
                </div>
              </div>
            </div>

            {/* Top Vertex: Scope (Périmètre) */}
            <div
              className="absolute rounded-xl border border-[#10B981]/60 bg-white dark:bg-[#0A0A0A] px-3 py-1.5 shadow-lg font-bold text-xs text-[#10B981] flex items-center gap-1.5 transition-all duration-200"
              style={{
                top: `${topY}px`,
                transform: `translateZ(40px) scale(${1 + (scope - 50) * 0.003})`,
              }}
            >
              <span>🎯 Périmètre</span>
              <span className="rounded-md bg-[#10B981]/15 border border-[#10B981]/40 px-1.5 py-0.5 text-[10px] text-[#10B981] font-mono">
                {scope}%
              </span>
            </div>

            {/* Left Vertex: Cost (Coût) */}
            <div
              className="absolute bottom-6 rounded-xl border border-[#22C55E]/60 bg-white dark:bg-[#0A0A0A] px-3 py-1.5 shadow-lg font-bold text-xs text-[#22C55E] flex items-center gap-1.5 transition-all duration-200"
              style={{
                left: `${leftX}px`,
                transform: `translateZ(30px) scale(${1 + (cost - 50) * 0.003})`,
              }}
            >
              <span>💰 Coût</span>
              <span className="rounded-md bg-[#22C55E]/15 border border-[#22C55E]/40 px-1.5 py-0.5 text-[10px] text-[#22C55E] font-mono">
                {cost}%
              </span>
            </div>

            {/* Right Vertex: Time (Délais) */}
            <div
              className="absolute bottom-6 rounded-xl border border-[#10B981]/60 bg-white dark:bg-[#0A0A0A] px-3 py-1.5 shadow-lg font-bold text-xs text-[#10B981] flex items-center gap-1.5 transition-all duration-200"
              style={{
                right: `${rightX}px`,
                transform: `translateZ(30px) scale(${1 + (time - 50) * 0.003})`,
              }}
            >
              <span>⏱️ Délais</span>
              <span className="rounded-md bg-[#10B981]/15 border border-[#10B981]/40 px-1.5 py-0.5 text-[10px] text-[#10B981] font-mono">
                {time}%
              </span>
            </div>
          </div>
        </div>

        {/* Fast Exam Scenario Presets */}
        <div className="w-full max-w-lg mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[11px] font-bold text-black/50 dark:text-white/50 mr-1">Scénarios d'Examen :</span>
          <button
            onClick={() => { setScope(70); setCost(70); setTime(70); }}
            className={`rounded-xl border px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
              scope === 70 && cost === 70 && time === 70
                ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]'
                : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 hover:bg-black/10'
            }`}
          >
            🎯 Équilibré (70/70/70)
          </button>
          <button
            onClick={() => { setScope(90); setCost(50); setTime(30); }}
            className={`rounded-xl border px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
              scope === 90 && cost === 50 && time === 30
                ? 'bg-[#22C55E]/20 border-[#22C55E] text-[#22C55E]'
                : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 hover:bg-black/10'
            }`}
          >
            ⚡ Rush Deadline (90/50/30)
          </button>
          <button
            onClick={() => { setScope(95); setCost(95); setTime(80); }}
            className={`rounded-xl border px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
              scope === 95 && cost === 95 && time === 80
                ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]'
                : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 hover:bg-black/10'
            }`}
          >
            💰 Budget Illimité (95/95/80)
          </button>
          <button
            onClick={() => { setScope(80); setCost(30); setTime(40); }}
            className={`rounded-xl border px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
              scope === 80 && cost === 30 && time === 40
                ? 'bg-[#22C55E]/20 border-[#22C55E] text-[#22C55E]'
                : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 hover:bg-black/10'
            }`}
          >
            📉 Coupe Budgétaire (80/30/40)
          </button>
        </div>

        {/* Interactive Sliders */}
        <div className="w-full max-w-lg mt-4 grid grid-cols-3 gap-3.5 border-t border-black/10 dark:border-white/10 pt-4 text-center">
          <div className="rounded-2xl border border-[#10B981]/30 bg-black/5 dark:bg-white/5 p-3 shadow-xs">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#10B981] mb-1">
              <span>🎯 Périmètre</span>
              <span className="font-mono text-[#10B981] bg-[#10B981]/15 px-1.5 py-0.5 rounded border border-[#10B981]/30">{scope}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={scope}
              onChange={(e) => setScope(Number(e.target.value))}
              className="w-full accent-[#10B981] h-1.5 cursor-pointer bg-black/10 dark:bg-white/10 rounded-lg"
            />
            <span className="text-[9px] text-[#10B981] block mt-1 font-mono">Hauteur : {squareHeight}px</span>
          </div>

          <div className="rounded-2xl border border-[#22C55E]/30 bg-black/5 dark:bg-white/5 p-3 shadow-xs">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#22C55E] mb-1">
              <span>💰 Coût / Budget</span>
              <span className="font-mono text-[#22C55E] bg-[#22C55E]/15 px-1.5 py-0.5 rounded border border-[#22C55E]/30">{cost}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              className="w-full accent-[#22C55E] h-1.5 cursor-pointer bg-black/10 dark:bg-white/10 rounded-lg"
            />
            <span className="text-[9px] text-[#22C55E] block mt-1 font-mono">Largeur : {squareWidth}px</span>
          </div>

          <div className="rounded-2xl border border-[#10B981]/30 bg-black/5 dark:bg-white/5 p-3 shadow-xs">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#10B981] mb-1">
              <span>⏱️ Délais / Temps</span>
              <span className="font-mono text-[#10B981] bg-[#10B981]/15 px-1.5 py-0.5 rounded border border-[#10B981]/30">{time}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              className="w-full accent-[#10B981] h-1.5 cursor-pointer bg-black/10 dark:bg-white/10 rounded-lg"
            />
            <span className="text-[9px] text-[#10B981] block mt-1 font-mono">Tension : {tiltAngle}°</span>
          </div>
        </div>

        <p className="text-xs text-black/80 dark:text-white/80 text-center mt-3 max-w-lg leading-relaxed bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-2.5">
          💡 <b>Principe OFPPT :</b> Le carré central symbolise la <b>Qualité du livrable</b>. Si tu augmentes le Périmètre sans augmenter le Coût ou le Temps, le carré se déforme et la Qualité s'effondre.
        </p>
      </div>
    );
  };

  // 2. PERT 3D Network Model
  const renderPert3D = () => {
    const pertNodes = [
      { id: '1', title: 'Début', es: 0, lf: 0, critical: true, z: 20 },
      { id: '2', title: 'Tâche A', es: 3, lf: 3, critical: true, z: 40 },
      { id: '3', title: 'Tâche B (Marge +2)', es: 2, lf: 5, critical: false, z: -10 },
      { id: '4', title: 'Tâche C', es: 7, lf: 7, critical: true, z: 30 },
      { id: '5', title: 'Fin', es: 9, lf: 9, critical: true, z: 20 },
    ];

    return (
      <div className="flex flex-col items-center py-4">
        <div
          className="relative w-full max-w-lg h-72 select-none cursor-grab active:cursor-grabbing perspective-1000 flex items-center justify-center"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="w-full h-full duration-150 transform-style-preserve-3d transition-transform flex items-center justify-center gap-3 sm:gap-6 px-4"
            style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
          >
            {pertNodes.map((node) => (
              <div
                key={node.id}
                className={`flex flex-col items-center justify-center rounded-2xl p-3 border transition-all shadow-md ${
                  node.critical
                    ? 'border-[#10B981] bg-[#10B981]/15 text-black dark:text-white ring-2 ring-[#10B981]/40'
                    : 'border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] text-black/70 dark:text-white/70'
                }`}
                style={{
                  transform: `translateZ(${node.z}px)`,
                  minWidth: '70px',
                }}
              >
                <span className="text-[10px] font-bold">{node.title}</span>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] font-mono border-t border-black/10 dark:border-white/10 pt-1">
                  <span>{node.es}</span>
                  <span className="text-black/40 dark:text-white/40">/</span>
                  <span className={node.critical ? 'text-[#10B981] font-bold' : ''}>{node.lf}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-black/60 dark:text-white/60 text-center mt-2">
          <b className="text-[#10B981]">Chemin Critique en relief :</b> Les nœuds alignés sur l'axe ont une marge nulle (ES = LF).
        </p>
      </div>
    );
  };

  // 3. Scrum 3D Revolving Sprint Ring
  const renderScrum3D = () => {
    const scrumStages = [
      { name: 'Product Backlog', role: 'Product Owner', desc: 'Priorisation des User Stories par valeur métier' },
      { name: 'Sprint Planning', role: 'Équipe & Scrum Master', desc: 'Sélection des items du Sprint et engagement (Sprint Goal)' },
      { name: 'Sprint Execution (1-4 sem)', role: 'Développeurs', desc: 'Développement, tests continus et Daily Scrum 15 min' },
      { name: 'Sprint Review & Demo', role: 'Client & Équipe', desc: 'Démonstration du Product Increment prêt à être livré' },
      { name: 'Rétrospective', role: 'Équipe complète', desc: 'Amélioration continue : ce qui a fonctionné et ce qu’on améliore' },
    ];

    return (
      <div className="flex flex-col items-center py-4">
        {/* Stage Selector Pills */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-4">
          {scrumStages.map((stg, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStageIndex(idx)}
              className={`rounded-xl px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                activeStageIndex === idx
                  ? 'bg-[#10B981] text-white shadow-md shadow-[#10B981]/30 scale-105 border border-[#10B981]'
                  : 'bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
              }`}
            >
              {idx + 1}. {stg.name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* 3D Stage Card */}
        <div
          className="relative w-full max-w-md h-52 select-none cursor-grab active:cursor-grabbing perspective-1000 flex items-center justify-center"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="w-full h-full duration-200 transform-style-preserve-3d transition-transform flex items-center justify-center"
            style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
          >
            <div
              className="w-full max-w-sm rounded-3xl border border-[#10B981]/40 bg-white dark:bg-[#0A0A0A] backdrop-blur-xl p-6 shadow-xl"
              style={{ transform: 'translateZ(30px)' }}
            >
              <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#10B981]">
                  Étape {activeStageIndex + 1} / 5
                </span>
                <span className="rounded-md bg-[#10B981]/15 border border-[#10B981]/30 px-2 py-0.5 text-[10px] font-bold text-[#10B981]">
                  {scrumStages[activeStageIndex].role}
                </span>
              </div>

              <h4 className="text-lg font-black text-black dark:text-white mt-2">
                {scrumStages[activeStageIndex].name}
              </h4>
              <p className="text-xs text-black/70 dark:text-white/70 leading-relaxed mt-2">
                {scrumStages[activeStageIndex].desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 4. Git 3D Branch Stack
  const renderGit3D = () => {
    const branches = [
      { name: 'main (production)', color: 'border-[#10B981] bg-[#10B981]/15 text-black dark:text-white', z: 60, tag: 'v1.0.0 Release' },
      { name: 'release/v1.0', color: 'border-[#22C55E] bg-[#22C55E]/15 text-black dark:text-white', z: 30, tag: 'Stabilisation' },
      { name: 'develop', color: 'border-[#10B981]/50 bg-[#10B981]/10 text-black dark:text-white', z: 0, tag: 'Intégration quotidienne' },
      { name: 'feature/auth-sprint1', color: 'border-[#22C55E]/50 bg-[#22C55E]/10 text-black dark:text-white', z: -30, tag: 'Travail isolé' },
    ];

    return (
      <div className="flex flex-col items-center py-4">
        <div
          className="relative w-full max-w-md h-64 select-none cursor-grab active:cursor-grabbing perspective-1000 flex items-center justify-center"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="w-full h-full duration-150 transform-style-preserve-3d transition-transform flex flex-col items-center justify-center gap-2"
            style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
          >
            {branches.map((b, i) => (
              <div
                key={i}
                className={`w-4/5 rounded-2xl border p-3 shadow-md flex items-center justify-between font-mono text-xs font-bold transition-all ${b.color}`}
                style={{ transform: `translateZ(${b.z}px)` }}
              >
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-current" />
                  {b.name}
                </span>
                <span className="text-[10px] opacity-75 font-sans font-semibold">{b.tag}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-black/60 dark:text-white/60 text-center mt-2">
          Vue en couches 3D : L'isolation par branche permet aux développeurs de livrer sans impacter la branche <code className="font-mono text-[#10B981]">main</code>.
        </p>
      </div>
    );
  };

  // 5. DevOps 3D Loop
  const renderDevOps3D = () => {
    const stages = ['PLAN', 'CODE', 'BUILD', 'TEST', 'RELEASE', 'DEPLOY', 'OPERATE', 'MONITOR'];
    return (
      <div className="flex flex-col items-center py-4">
        <div
          className="relative w-full max-w-lg h-60 select-none cursor-grab active:cursor-grabbing perspective-1000 flex items-center justify-center"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="w-full h-full duration-150 transform-style-preserve-3d transition-transform flex flex-wrap items-center justify-center gap-2.5 p-4"
            style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
          >
            {stages.map((stg, idx) => (
              <div
                key={stg}
                className="rounded-xl border border-[#10B981]/40 bg-white dark:bg-[#0A0A0A] backdrop-blur-sm px-3.5 py-2 text-xs font-black text-black dark:text-white shadow-md flex items-center gap-2 transition-transform hover:scale-110 font-mono"
                style={{ transform: `translateZ(${Math.sin((idx / stages.length) * Math.PI * 2) * 40}px)` }}
              >
                <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-ping" />
                <span>{stg}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-black/60 dark:text-white/60 text-center mt-2">
          Boucle infinie DevOps en relief : Feedback continu entre le Développement (Dev) et l’Exploitation (Ops).
        </p>
      </div>
    );
  };

  const titles: Record<Model3DType, string> = {
    triangle_3d: 'Modèle 3D Interactif · Le Triangle de Fer (Périmètre, Coût, Délais, Qualité)',
    pert_3d: 'Réseau 3D PERT · Nœuds et Marges en Relief',
    scrum_3d: 'Cycle de Vie 3D Scrum · Rôles, Artefacts et Cérémonies',
    git_3d: 'Architecture 3D des Branches Git (Main, Develop, Feature)',
    devops_3d: 'Boucle 3D Infinie DevOps & CI/CD',
  };

  return (
    <div className="my-8 rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A] backdrop-blur-xl p-5 sm:p-7 shadow-xl relative overflow-hidden text-black dark:text-white">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-2">
          <Badge variant="primary" size="sm" className="gap-1 font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
            <Rotate3d className="h-3.5 w-3.5" />
            Visualisation 3D Interactive
          </Badge>
          <span className="text-[11px] text-black/50 dark:text-white/50 font-medium hidden sm:inline">
            Clique et glisse pour faire pivoter à 360°
          </span>
        </div>

        <button
          onClick={handleResetRotation}
          className="flex items-center gap-1 text-[11px] font-semibold text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          title="Réinitialiser l'angle de vue"
        >
          <RefreshCw className="h-3 w-3" />
          <span>Recentrer l'angle</span>
        </button>
      </div>

      <h4 className="relative z-10 text-sm sm:text-base font-bold text-black dark:text-white mt-4">
        {titles[type]}
      </h4>

      {/* 3D Visual Body */}
      <div className="relative z-10">
        {type === 'triangle_3d' && renderTriangle3D()}
        {type === 'pert_3d' && renderPert3D()}
        {type === 'scrum_3d' && renderScrum3D()}
        {type === 'git_3d' && renderGit3D()}
        {type === 'devops_3d' && renderDevOps3D()}
      </div>
    </div>
  );
}

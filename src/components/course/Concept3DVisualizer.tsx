import React, { useState, useRef } from 'react';
import { Model3DType } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Eye, Rotate3d, Sparkles, Layers, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';

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

    // Dynamic central square dimensions and transformation
    // Highly visible morphing:
    // - Scope controls height (90px to 230px)
    // - Cost controls width (90px to 230px)
    // - Time / Cost disparity controls 3D tilt & skew
    const squareWidth = Math.round(110 + (cost - 20) * 1.5);
    const squareHeight = Math.round(110 + (scope - 20) * 1.5);
    const squareScale = (0.75 + (avg / 100) * 0.5).toFixed(2);
    const tiltAngle = ((cost - time) * 0.45).toFixed(1);

    // Dynamic vertex positions
    const topY = Math.round(5 - (scope - 50) * 0.7); // moves up when scope increases
    const leftX = Math.round(5 - (cost - 50) * 0.7); // moves left when cost increases
    const rightX = Math.round(5 - (time - 50) * 0.7); // moves right when time increases

    return (
      <div className="flex flex-col items-center py-4">
        {/* Real-time Status Alert Header */}
        <div className="w-full max-w-lg mb-4 flex flex-wrap items-center justify-between gap-2 px-4 py-3 rounded-2xl border border-white/10 bg-[#070B14]/90 text-xs shadow-xl">
          <div className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-full ${
              isOptimal
                ? 'bg-emerald-400 shadow-[0_0_12px_#10B981]'
                : isWarning
                ? 'bg-amber-400 shadow-[0_0_12px_#F59E0B]'
                : 'bg-rose-500 shadow-[0_0_12px_#F43F5E] animate-pulse'
            }`} />
            <span className="font-bold text-white text-xs sm:text-sm">
              {isOptimal ? 'Équilibre Optimal (Projet Sain)' : isWarning ? 'Tension Détectée (Risque de Dérive)' : 'Déséquilibre Critique (Échec Imminent)'}
            </span>
          </div>
          <div className="text-slate-300 font-mono text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-xl">
            Charge Globale : <b className={isOptimal ? 'text-emerald-400' : isWarning ? 'text-amber-400' : 'text-rose-400'}>{avg}%</b>
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
                fill={isOptimal ? "rgba(16,185,129,0.08)" : isWarning ? "rgba(245,158,11,0.08)" : "rgba(239,68,68,0.12)"}
                stroke={isOptimal ? "rgba(99,102,241,0.5)" : isWarning ? "rgba(245,158,11,0.5)" : "rgba(239,68,68,0.6)"}
                strokeWidth="2"
                strokeDasharray="4 4"
                className="transition-all duration-200"
              />
            </svg>

            {/* Base 3D Central Square (Dynamically Resizes, Tilts and Glows with Sliders) */}
            <div
              className={`absolute rounded-3xl border-2 backdrop-blur-xl flex items-center justify-center transition-all duration-200 shadow-2xl ${
                isOptimal
                  ? 'border-indigo-500/50 bg-[#0D1526]/90 shadow-[0_0_35px_rgba(99,102,241,0.25)]'
                  : isWarning
                  ? 'border-amber-500/60 bg-[#0D1526]/90 shadow-[0_0_35px_rgba(245,158,11,0.25)]'
                  : 'border-red-500/70 bg-[#0D1526]/90 shadow-[0_0_40px_rgba(239,68,68,0.35)]'
              }`}
              style={{
                width: `${squareWidth}px`,
                height: `${squareHeight}px`,
                transform: `translateZ(-30px) scale(${squareScale}) rotateZ(${tiltAngle}deg)`,
              }}
            >
              <div className="text-center p-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                  QUALITÉ CENTRALE
                </span>
                <div className="text-base font-black text-white mt-0.5">
                  Équilibre Projet
                </div>
                <div className="text-[11px] font-semibold mt-1 transition-colors text-slate-300">
                  {isOptimal ? '✓ Projet sous contrôle' : isWarning ? '⚠️ Risque d’écart' : '🚨 Dérive majeure'}
                </div>
                <div className="mt-1 font-mono text-[9px] text-slate-400">
                  Dim: {squareWidth}x{squareHeight}px · Tilt: {tiltAngle}°
                </div>
              </div>
            </div>

            {/* Top Vertex: Scope (Périmètre) */}
            <div
              className="absolute rounded-xl border border-indigo-500/60 bg-[#070B14]/95 px-3 py-1.5 shadow-lg shadow-indigo-600/30 font-bold text-xs text-indigo-300 flex items-center gap-1.5 transition-all duration-200"
              style={{
                top: `${topY}px`,
                transform: `translateZ(40px) scale(${1 + (scope - 50) * 0.003})`,
              }}
            >
              <span>🎯 Périmètre</span>
              <span className="rounded-md bg-indigo-600/30 border border-indigo-500/40 px-1.5 py-0.5 text-[10px] text-indigo-200 font-mono">
                {scope}%
              </span>
            </div>

            {/* Left Vertex: Cost (Coût) */}
            <div
              className="absolute bottom-6 rounded-xl border border-cyan-500/60 bg-[#070B14]/95 px-3 py-1.5 shadow-lg shadow-cyan-600/30 font-bold text-xs text-cyan-300 flex items-center gap-1.5 transition-all duration-200"
              style={{
                left: `${leftX}px`,
                transform: `translateZ(30px) scale(${1 + (cost - 50) * 0.003})`,
              }}
            >
              <span>💰 Coût</span>
              <span className="rounded-md bg-cyan-600/30 border border-cyan-500/40 px-1.5 py-0.5 text-[10px] text-cyan-200 font-mono">
                {cost}%
              </span>
            </div>

            {/* Right Vertex: Time (Délais) */}
            <div
              className="absolute bottom-6 rounded-xl border border-amber-500/60 bg-[#070B14]/95 px-3 py-1.5 shadow-lg shadow-amber-600/30 font-bold text-xs text-amber-300 flex items-center gap-1.5 transition-all duration-200"
              style={{
                right: `${rightX}px`,
                transform: `translateZ(30px) scale(${1 + (time - 50) * 0.003})`,
              }}
            >
              <span>⏱️ Délais</span>
              <span className="rounded-md bg-amber-600/30 border border-amber-500/40 px-1.5 py-0.5 text-[10px] text-amber-200 font-mono">
                {time}%
              </span>
            </div>
          </div>
        </div>

        {/* Fast Exam Scenario Presets */}
        <div className="w-full max-w-lg mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 mr-1">Scénarios d'Examen :</span>
          <button
            onClick={() => { setScope(70); setCost(70); setTime(70); }}
            className={`rounded-xl border px-2.5 py-1 text-[11px] font-semibold transition-all ${
              scope === 70 && cost === 70 && time === 70
                ? 'bg-emerald-600/30 border-emerald-500/50 text-emerald-300'
                : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            🎯 Équilibré (70/70/70)
          </button>
          <button
            onClick={() => { setScope(90); setCost(50); setTime(30); }}
            className={`rounded-xl border px-2.5 py-1 text-[11px] font-semibold transition-all ${
              scope === 90 && cost === 50 && time === 30
                ? 'bg-rose-600/30 border-rose-500/50 text-rose-300'
                : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            ⚡ Rush Deadline (90/50/30)
          </button>
          <button
            onClick={() => { setScope(95); setCost(95); setTime(80); }}
            className={`rounded-xl border px-2.5 py-1 text-[11px] font-semibold transition-all ${
              scope === 95 && cost === 95 && time === 80
                ? 'bg-indigo-600/30 border-indigo-500/50 text-indigo-300'
                : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            💰 Budget Illimité (95/95/80)
          </button>
          <button
            onClick={() => { setScope(80); setCost(30); setTime(40); }}
            className={`rounded-xl border px-2.5 py-1 text-[11px] font-semibold transition-all ${
              scope === 80 && cost === 30 && time === 40
                ? 'bg-amber-600/30 border-amber-500/50 text-amber-300'
                : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            📉 Coupe Budgétaire (80/30/40)
          </button>
        </div>

        {/* Interactive Sliders (With live values & instant morphing) */}
        <div className="w-full max-w-lg mt-4 grid grid-cols-3 gap-3.5 border-t border-white/10 pt-4 text-center">
          <div className="rounded-2xl border border-indigo-500/30 bg-[#070B14]/90 p-3 shadow-md">
            <div className="flex items-center justify-between text-[11px] font-bold text-indigo-300 mb-1">
              <span>🎯 Périmètre</span>
              <span className="font-mono text-white bg-indigo-600/30 px-1.5 py-0.5 rounded border border-indigo-500/30">{scope}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={scope}
              onChange={(e) => setScope(Number(e.target.value))}
              className="w-full accent-indigo-500 h-1.5 cursor-pointer bg-slate-800 rounded-lg"
            />
            <span className="text-[9px] text-indigo-400 block mt-1 font-mono">Hauteur : {squareHeight}px</span>
          </div>

          <div className="rounded-2xl border border-cyan-500/30 bg-[#070B14]/90 p-3 shadow-md">
            <div className="flex items-center justify-between text-[11px] font-bold text-cyan-300 mb-1">
              <span>💰 Coût / Budget</span>
              <span className="font-mono text-white bg-cyan-600/30 px-1.5 py-0.5 rounded border border-cyan-500/30">{cost}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              className="w-full accent-cyan-500 h-1.5 cursor-pointer bg-slate-800 rounded-lg"
            />
            <span className="text-[9px] text-cyan-400 block mt-1 font-mono">Largeur : {squareWidth}px</span>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-[#070B14]/90 p-3 shadow-md">
            <div className="flex items-center justify-between text-[11px] font-bold text-amber-300 mb-1">
              <span>⏱️ Délais / Temps</span>
              <span className="font-mono text-white bg-amber-600/30 px-1.5 py-0.5 rounded border border-amber-500/30">{time}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              className="w-full accent-amber-500 h-1.5 cursor-pointer bg-slate-800 rounded-lg"
            />
            <span className="text-[9px] text-amber-400 block mt-1 font-mono">Tension : {tiltAngle}°</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 text-center mt-3 max-w-lg leading-relaxed bg-white/5 border border-white/10 rounded-xl p-2.5">
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
                className={`flex flex-col items-center justify-center rounded-2xl p-3 border transition-all shadow-xl ${
                  node.critical
                    ? 'border-red-500/80 bg-red-950/50 text-red-200 ring-2 ring-red-500/30 shadow-red-900/30'
                    : 'border-white/10 bg-[#070B14] text-slate-300'
                }`}
                style={{
                  transform: `translateZ(${node.z}px)`,
                  minWidth: '70px',
                }}
              >
                <span className="text-[10px] font-bold">{node.title}</span>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] font-mono border-t border-white/10 pt-1">
                  <span>{node.es}</span>
                  <span className="text-slate-500">/</span>
                  <span className={node.critical ? 'text-red-400 font-bold' : ''}>{node.lf}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-400 text-center mt-2">
          🔴 <b className="text-red-400">Chemin Critique en relief :</b> Les nœuds alignés sur l'axe ont une marge nulle (ES = LF).
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
              className={`rounded-xl px-2.5 py-1 text-xs font-bold transition-all ${
                activeStageIndex === idx
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105 border border-indigo-500/50'
                  : 'bg-[#070B14] border border-white/10 text-slate-400 hover:text-white'
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
              className="w-full max-w-sm rounded-3xl border border-indigo-500/40 bg-[#0D1526]/95 backdrop-blur-xl p-6 shadow-2xl"
              style={{ transform: 'translateZ(30px)' }}
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                  Étape {activeStageIndex + 1} / 5
                </span>
                <span className="rounded-md bg-indigo-600/20 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-bold text-indigo-300">
                  {scrumStages[activeStageIndex].role}
                </span>
              </div>

              <h4 className="text-lg font-black text-white mt-2">
                {scrumStages[activeStageIndex].name}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
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
      { name: 'main (production)', color: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-200', z: 60, tag: 'v1.0.0 Release' },
      { name: 'release/v1.0', color: 'border-indigo-500/50 bg-indigo-950/40 text-indigo-200', z: 30, tag: 'Stabilisation' },
      { name: 'develop', color: 'border-cyan-500/50 bg-cyan-950/40 text-cyan-200', z: 0, tag: 'Intégration quotidienne' },
      { name: 'feature/auth-sprint1', color: 'border-amber-500/50 bg-amber-950/40 text-amber-200', z: -30, tag: 'Travail isolé' },
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
                className={`w-4/5 rounded-2xl border p-3 shadow-xl flex items-center justify-between font-mono text-xs font-bold transition-all ${b.color}`}
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
        <p className="text-xs text-slate-400 text-center mt-2">
          Vue en couches 3D : L'isolation par branche permet aux développeurs de livrer sans impacter la branche <code>main</code>.
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
                className="rounded-xl border border-indigo-500/40 bg-[#0D1526]/90 backdrop-blur-sm px-3.5 py-2 text-xs font-black text-white shadow-xl flex items-center gap-2 transition-transform hover:scale-110"
                style={{ transform: `translateZ(${Math.sin((idx / stages.length) * Math.PI * 2) * 40}px)` }}
              >
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                <span>{stg}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-400 text-center mt-2">
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
    <div className="my-8 rounded-3xl border border-white/10 bg-[#0D1526]/90 backdrop-blur-xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Badge variant="primary" size="sm" className="gap-1 font-bold bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
            <Rotate3d className="h-3.5 w-3.5" />
            Visualisation 3D Interactive
          </Badge>
          <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
            Clique et glisse pour faire pivoter à 360°
          </span>
        </div>

        <button
          onClick={handleResetRotation}
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white transition-colors"
          title="Réinitialiser l'angle de vue"
        >
          <RefreshCw className="h-3 w-3" />
          <span>Recentrer l'angle</span>
        </button>
      </div>

      <h4 className="relative z-10 text-sm sm:text-base font-bold text-white mt-4">
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

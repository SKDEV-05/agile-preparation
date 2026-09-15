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

  // Triple Constraint Interactive State (top-level hook)
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

  // 1. Triple Constraint 3D Pyramid
  const renderTriangle3D = () => {
    return (
      <div className="flex flex-col items-center py-4">
        <div
          className="relative w-72 h-72 sm:w-80 sm:h-80 select-none cursor-grab active:cursor-grabbing perspective-1000"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="w-full h-full duration-150 transform-style-preserve-3d transition-transform flex items-center justify-center"
            style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
          >
            {/* Base 3D Plane */}
            <div
              className="absolute w-48 h-48 rounded-2xl border-2 border-indigo-300 bg-indigo-50/60 shadow-xl flex items-center justify-center transition-all"
              style={{ transform: 'translateZ(-30px)' }}
            >
              <div className="text-center p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Qualité Centrale</span>
                <div className="text-base font-black text-slate-900 mt-1">
                  Équilibre Projet
                </div>
                <div className="text-[11px] text-slate-500 font-semibold mt-0.5">
                  {(scope + cost + time) / 3 > 70 ? 'Projet sous contrôle' : 'Risque de dérive'}
                </div>
              </div>
            </div>

            {/* Top Vertex: Scope (Périmètre) */}
            <div
              className="absolute -top-4 rounded-xl border border-indigo-400 bg-white px-3 py-1.5 shadow-md font-bold text-xs text-primary flex items-center gap-1.5 transition-transform hover:scale-110"
              style={{ transform: 'translateZ(40px)' }}
            >
              <span>🎯 Périmètre</span>
              <span className="rounded bg-indigo-100 px-1 py-0.5 text-[10px]">{scope}%</span>
            </div>

            {/* Left Vertex: Cost (Coût) */}
            <div
              className="absolute bottom-4 -left-4 rounded-xl border border-teal-400 bg-white px-3 py-1.5 shadow-md font-bold text-xs text-teal-800 flex items-center gap-1.5 transition-transform hover:scale-110"
              style={{ transform: 'translateZ(30px)' }}
            >
              <span>💰 Coût</span>
              <span className="rounded bg-teal-100 px-1 py-0.5 text-[10px]">{cost}%</span>
            </div>

            {/* Right Vertex: Time (Délais) */}
            <div
              className="absolute bottom-4 -right-4 rounded-xl border border-amber-400 bg-white px-3 py-1.5 shadow-md font-bold text-xs text-amber-900 flex items-center gap-1.5 transition-transform hover:scale-110"
              style={{ transform: 'translateZ(30px)' }}
            >
              <span>⏱️ Délais</span>
              <span className="rounded bg-amber-100 px-1 py-0.5 text-[10px]">{time}%</span>
            </div>
          </div>
        </div>

        {/* Sliders for Interactive Trade-offs */}
        <div className="w-full max-w-md mt-4 grid grid-cols-3 gap-3 border-t border-slate-100 pt-3 text-center">
          <div>
            <label className="text-[11px] font-bold text-slate-600 block">Périmètre</label>
            <input
              type="range"
              min="20"
              max="100"
              value={scope}
              onChange={(e) => setScope(Number(e.target.value))}
              className="w-full accent-primary h-1.5 mt-1"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-600 block">Coût / Budget</label>
            <input
              type="range"
              min="20"
              max="100"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              className="w-full accent-teal-600 h-1.5 mt-1"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-600 block">Délais / Temps</label>
            <input
              type="range"
              min="20"
              max="100"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              className="w-full accent-amber-500 h-1.5 mt-1"
            />
          </div>
        </div>
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
            {pertNodes.map((node, i) => (
              <div
                key={node.id}
                className={`flex flex-col items-center justify-center rounded-2xl p-3 border-2 transition-all shadow-md ${
                  node.critical
                    ? 'border-red-400 bg-red-50 text-red-950 ring-2 ring-red-400/30'
                    : 'border-slate-300 bg-white text-slate-700'
                }`}
                style={{
                  transform: `translateZ(${node.z}px)`,
                  minWidth: '70px',
                }}
              >
                <span className="text-[10px] font-bold">{node.title}</span>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] font-mono border-t border-slate-200/80 pt-1">
                  <span>{node.es}</span>
                  <span className="text-slate-400">/</span>
                  <span className={node.critical ? 'text-red-600 font-bold' : ''}>{node.lf}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-500 text-center mt-2">
          🔴 <b className="text-red-700">Chemin Critique en relief :</b> Les nœuds alignés sur l'axe ont une marge nulle (ES = LF).
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
                  ? 'bg-primary text-white shadow-sm scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
              className="w-full max-w-sm rounded-3xl border-2 border-indigo-300 bg-gradient-to-br from-indigo-50/80 via-white to-teal-50/50 p-6 shadow-xl"
              style={{ transform: 'translateZ(30px)' }}
            >
              <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  Étape {activeStageIndex + 1} / 5
                </span>
                <span className="rounded-md bg-indigo-100/80 px-2 py-0.5 text-[10px] font-bold text-primary">
                  {scrumStages[activeStageIndex].role}
                </span>
              </div>

              <h4 className="text-lg font-black text-slate-900 mt-2">
                {scrumStages[activeStageIndex].name}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
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
      { name: 'main (production)', color: 'border-emerald-400 bg-emerald-50 text-emerald-950', z: 60, tag: 'v1.0.0 Release' },
      { name: 'release/v1.0', color: 'border-indigo-400 bg-indigo-50 text-indigo-950', z: 30, tag: 'Stabilisation' },
      { name: 'develop', color: 'border-purple-400 bg-purple-50 text-purple-950', z: 0, tag: 'Intégration quotidienne' },
      { name: 'feature/auth-sprint1', color: 'border-amber-400 bg-amber-50 text-amber-950', z: -30, tag: 'Travail isolé' },
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
                className={`w-4/5 rounded-2xl border-2 p-3 shadow-md flex items-center justify-between font-mono text-xs font-bold transition-all ${b.color}`}
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
        <p className="text-xs text-slate-500 text-center mt-2">
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
                className="rounded-xl border border-indigo-300 bg-white/90 backdrop-blur-sm px-3.5 py-2 text-xs font-black text-slate-800 shadow-md flex items-center gap-2 transition-transform hover:scale-110"
                style={{ transform: `translateZ(${Math.sin((idx / stages.length) * Math.PI * 2) * 40}px)` }}
              >
                <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                <span>{stg}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-500 text-center mt-2">
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
    <div className="my-8 rounded-3xl border-2 border-indigo-100 bg-gradient-to-b from-indigo-50/30 via-white to-slate-50/40 p-5 sm:p-6 shadow-sm">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-indigo-100/80">
        <div className="flex items-center gap-2">
          <Badge variant="primary" size="sm" className="gap-1 font-bold">
            <Rotate3d className="h-3.5 w-3.5" />
            Visualisation 3D Interactive
          </Badge>
          <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
            Clique et glisse pour faire pivoter
          </span>
        </div>

        <button
          onClick={handleResetRotation}
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-primary transition-colors"
          title="Réinitialiser l'angle de vue"
        >
          <RefreshCw className="h-3 w-3" />
          <span>Recentrer l'angle</span>
        </button>
      </div>

      <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-3">
        {titles[type]}
      </h4>

      {/* 3D Visual Body */}
      {type === 'triangle_3d' && renderTriangle3D()}
      {type === 'pert_3d' && renderPert3D()}
      {type === 'scrum_3d' && renderScrum3D()}
      {type === 'git_3d' && renderGit3D()}
      {type === 'devops_3d' && renderDevOps3D()}
    </div>
  );
}

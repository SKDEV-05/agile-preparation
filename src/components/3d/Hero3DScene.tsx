import React, { useState, useEffect, useRef } from 'react';
import { 
  Code2, 
  Database, 
  Zap, 
  CheckCircle2, 
  GraduationCap, 
  Server, 
  Terminal, 
  Layers, 
  Sparkles 
} from 'lucide-react';

export function Hero3DScene() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTouch = window.innerWidth < 1024 || window.matchMedia('(hover: none)').matches;
      if (isTouch) return;
    }

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate offset relative to center of component (-1 to 1)
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / (window.innerWidth / 2);
      const y = (e.clientY - centerY) / (window.innerHeight / 2);

      // Clamp between -1 and 1
      const clampedX = Math.max(-1, Math.min(1, x));
      const clampedY = Math.max(-1, Math.min(1, y));

      setMousePos({ x: clampedX, y: clampedY });
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  // Subtle 2 to 4 degree tilt
  const laptopRotateX = -mousePos.y * 3.5;
  const laptopRotateY = mousePos.x * 4.5;

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[420px] sm:h-[480px] flex items-center justify-center perspective-1200 select-none overflow-visible"
    >
      {/* Dynamic Ambient Backlight that follows cursor */}
      <div 
        className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-600/30 via-cyan-500/20 to-purple-600/25 blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 35}px, ${mousePos.y * 35}px, -100px)`,
        }}
      />

      {/* Floating 3D Main Laptop Unit */}
      <div 
        className="relative z-10 w-[310px] sm:w-[390px] transition-transform duration-200 ease-out transform-style-preserve-3d"
        style={{
          transform: `rotateX(${laptopRotateX}deg) rotateY(${laptopRotateY}deg) translateZ(10px)`,
        }}
      >
        {/* Laptop Screen Bezel */}
        <div className="relative rounded-2xl bg-gradient-to-b from-slate-800 to-slate-950 p-2.5 shadow-2xl border border-white/15 ring-1 ring-black/80">
          {/* Top Camera Notch */}
          <div className="flex justify-center mb-1.5 items-center gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-slate-700"></div>
            <div className="h-1 w-1 rounded-full bg-emerald-500/80"></div>
          </div>

          {/* Screen Content: FullStack 2A Live Mini Dashboard */}
          <div className="rounded-xl bg-[#0B0F19] overflow-hidden border border-white/10 shadow-inner font-sans text-xs">
            {/* Window title bar */}
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/90 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-rose-500/80"></div>
                <div className="h-2 w-2 rounded-full bg-amber-500/80"></div>
                <div className="h-2 w-2 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="text-[10px] font-mono text-slate-400 font-semibold flex items-center gap-1">
                <Terminal className="h-2.5 w-2.5 text-cyan-400" />
                <span>fullstack-2a.ofppt/workspace</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[9px] text-emerald-400 font-bold">LIVE</span>
              </div>
            </div>

            {/* Inner Dashboard View */}
            <div className="p-3.5 space-y-3 bg-gradient-to-b from-slate-900/80 to-[#070B14]">
              {/* Mini Stats Bar */}
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-slate-800/60 p-2 border border-white/5">
                  <div className="text-[9px] text-slate-400 uppercase font-bold">Progression</div>
                  <div className="text-sm font-black text-indigo-400">100% EFM</div>
                </div>
                <div className="rounded-lg bg-slate-800/60 p-2 border border-white/5">
                  <div className="text-[9px] text-slate-400 uppercase font-bold">QCM Corrigés</div>
                  <div className="text-sm font-black text-cyan-400">200 / 200</div>
                </div>
                <div className="rounded-lg bg-slate-800/60 p-2 border border-white/5">
                  <div className="text-[9px] text-slate-400 uppercase font-bold">Labs Simus</div>
                  <div className="text-sm font-black text-emerald-400">5 Actifs</div>
                </div>
              </div>

              {/* Code / Agile Sprint Mini Board */}
              <div className="rounded-lg bg-black/50 p-2.5 border border-indigo-500/20 font-mono text-[10px] text-slate-300 space-y-1">
                <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-white/5">
                  <span className="text-indigo-400 font-bold flex items-center gap-1">
                    <Zap className="h-3 w-3 text-amber-400" /> Sprint M201 : Approche Agile
                  </span>
                  <span className="text-emerald-400 text-[9px]">4/4 Notions</span>
                </div>
                <div className="pt-1 text-[9px] text-slate-400 flex items-center justify-between">
                  <span>Calcul Réseau PERT & Marges</span>
                  <span className="text-indigo-400 font-bold">Chemin Critique ✓</span>
                </div>
                <div className="text-[9px] text-slate-400 flex items-center justify-between">
                  <span>Framework Scrum & Cérémonies</span>
                  <span className="text-cyan-400 font-bold">PO / SM / Dev ✓</span>
                </div>
                <div className="text-[9px] text-slate-400 flex items-center justify-between">
                  <span>DevOps Git & GitLab CI Pipelines</span>
                  <span className="text-emerald-400 font-bold">Passed ✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Laptop Bottom Base / Keyboard lip */}
        <div className="h-3.5 w-full bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-b-xl shadow-lg border-t border-white/10 flex justify-center items-center">
          <div className="w-16 h-1 rounded-full bg-slate-800"></div>
        </div>
      </div>

      {/* SATELLITE 1: Floating Code Snippet Card (Top Left) */}
      <div 
        className="absolute top-2 -left-2 sm:-left-8 z-20 transition-transform duration-300 ease-out transform-style-preserve-3d"
        style={{
          transform: `translate3d(${mousePos.x * -22}px, ${mousePos.y * -20}px, 60px)`,
        }}
      >
        <div className="animate-float-subtle rounded-xl bg-slate-900/90 backdrop-blur-md p-3 border border-cyan-500/30 shadow-xl shadow-cyan-500/10">
          <div className="flex items-center gap-2 mb-1.5">
            <Code2 className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-[10px] font-mono font-bold text-cyan-300">.gitlab-ci.yml</span>
          </div>
          <div className="font-mono text-[9px] text-slate-400 space-y-0.5">
            <div><span className="text-purple-400">stages:</span> [test, deploy]</div>
            <div><span className="text-emerald-400">script:</span> npm run test:agile</div>
            <div className="text-cyan-400 font-bold">status: 200 OK ✓</div>
          </div>
        </div>
      </div>

      {/* SATELLITE 2: 3D Database Cylinder / SQL Card (Bottom Left) */}
      <div 
        className="absolute bottom-4 -left-3 sm:-left-6 z-20 transition-transform duration-300 ease-out transform-style-preserve-3d"
        style={{
          transform: `translate3d(${mousePos.x * -26}px, ${mousePos.y * -24}px, 50px)`,
        }}
      >
        <div className="animate-float-reverse rounded-xl bg-slate-900/90 backdrop-blur-md p-3 border border-emerald-500/30 shadow-xl shadow-emerald-500/10 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Database className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-200">Base SGBD / SQL</div>
            <div className="text-[9px] font-mono text-emerald-400">MCD ➔ Relations 1:N</div>
          </div>
        </div>
      </div>

      {/* SATELLITE 3: Agile Sprint Card (Top Right) */}
      <div 
        className="absolute -top-3 -right-2 sm:-right-8 z-20 transition-transform duration-300 ease-out transform-style-preserve-3d"
        style={{
          transform: `translate3d(${mousePos.x * 24}px, ${mousePos.y * 22}px, 70px)`,
        }}
      >
        <div className="animate-float-subtle rounded-xl bg-slate-900/90 backdrop-blur-md p-3 border border-indigo-500/30 shadow-xl shadow-indigo-500/10">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
            <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wide">Scrum Board 2A</span>
          </div>
          <div className="text-[11px] font-bold text-white">Sprint 04 : In Progress</div>
          <div className="text-[9px] text-slate-400 mt-0.5">Velocity: 42 Story Points</div>
        </div>
      </div>

      {/* SATELLITE 4: QCM 100% Score & Graduation Cap (Bottom Right) */}
      <div 
        className="absolute bottom-2 -right-3 sm:-right-6 z-20 transition-transform duration-300 ease-out transform-style-preserve-3d"
        style={{
          transform: `translate3d(${mousePos.x * 28}px, ${mousePos.y * 26}px, 55px)`,
        }}
      >
        <div className="animate-float-reverse rounded-xl bg-slate-900/90 backdrop-blur-md p-2.5 sm:p-3 border border-amber-500/30 shadow-xl shadow-amber-500/10 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <GraduationCap className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-200">Examen Blanc</div>
            <div className="text-[9px] font-bold text-amber-400 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Score 50/50 QCM
            </div>
          </div>
        </div>
      </div>

      {/* Floating subtle ambient particles */}
      <div 
        className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-cyan-400/60 blur-[1px] animate-ping pointer-events-none"
        style={{ animationDuration: '3s' }}
      />
      <div 
        className="absolute bottom-1/4 right-1/3 h-1.5 w-1.5 rounded-full bg-indigo-400/60 blur-[1px] animate-ping pointer-events-none"
        style={{ animationDuration: '4s' }}
      />
    </div>
  );
}

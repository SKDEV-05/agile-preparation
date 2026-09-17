import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import logoImg from '../../assets/logo.webp';

const Hero3DScene = React.lazy(() => import('../../components/3d/Hero3DScene').then(m => ({ default: m.Hero3DScene })));
const CourseMarketplace = React.lazy(() => import('./CourseMarketplace').then(m => ({ default: m.CourseMarketplace })));

function SparklesIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
    </svg>
  );
}

function LaptopIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/>
    </svg>
  );
}

function ShieldCheckIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}

function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  );
}

function CompassIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  );
}

interface CurriculumHubProps {
  onSelectAgile: () => void;
}

export function CurriculumHub({ onSelectAgile }: CurriculumHubProps) {
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 1024);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScrollToCourses = () => {
    const el = document.getElementById('courses-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-100 py-6 sm:py-10 px-4 sm:px-6 lg:px-8 space-y-16">
      {/* 1. MAJOR UX HERO SECTION */}
      <section className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-8 sm:pt-12 min-h-[520px] rounded-3xl overflow-hidden p-6 sm:p-10 border border-white/10 bg-[#0D1526]/60 backdrop-blur-xl shadow-2xl lcp-hero-card">
        {/* Left Side: Pitch & Official Branding */}
        <div className="lg:col-span-7 space-y-6 text-left relative z-10 pointer-events-auto">
          <div className="inline-flex items-center gap-2.5 rounded-full bg-slate-900/80 border border-indigo-500/30 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 shadow-inner backdrop-blur-md">
            <img 
              src={logoImg} 
              alt="Logo FullStack 2A" 
              width={20}
              height={20}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="h-5 w-5 rounded-md object-cover ring-1 ring-indigo-400/50" 
            />
            <span>Cursus Développement Digital · 2ème Année</span>
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-ping"></span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              FULLSTACK <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400">2A</span>
            </h1>
            <p className="text-base sm:text-xl font-bold text-slate-300 tracking-tight">
              Plateforme de préparation — 2ème année Full Stack OFPPT
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl font-normal">
            L’environnement d’excellence conçu spécifiquement pour réussir tes examens de 2ème année : 
            cours synthétisés, <span className="text-slate-200 font-semibold">5 simulateurs interactifs (PERT, Gantt, Jira, Git, CI/CD)</span>, 
            explications 3D et plus de 200 QCM corrigés en conditions réelles.
          </p>

          {/* Value Badges */}
          <div className="flex flex-wrap gap-2.5 pt-1 text-xs">
            <span className="flex items-center gap-1.5 rounded-lg bg-slate-800/80 border border-white/10 px-3 py-1 text-slate-300">
              <SparklesIcon className="h-3.5 w-3.5 text-amber-400" />
              <span>Simulateurs Pratiques</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-slate-800/80 border border-white/10 px-3 py-1 text-slate-300">
              <LaptopIcon className="h-3.5 w-3.5 text-cyan-400" />
              <span>Visualisations 3D</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-slate-800/80 border border-white/10 px-3 py-1 text-slate-300">
              <ShieldCheckIcon className="h-3.5 w-3.5 text-emerald-400" />
              <span>200 QCM Conformes EFM</span>
            </span>
          </div>

          {/* Primary & Secondary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={onSelectAgile}
              className="gap-2.5 font-bold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>Commencer à apprendre</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleScrollToCourses}
              className="gap-2 border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white transition-all"
            >
              <CompassIcon className="h-4 w-4 text-cyan-400" />
              <span>Explorer les cours</span>
            </Button>
          </div>
        </div>

        {/* Right Side: Interactive 3D Educational Scene (Desktop only) */}
        <div className="hidden lg:block lg:col-span-5 relative z-10 pointer-events-auto">
          {isDesktop && (
            <React.Suspense fallback={<div className="h-[420px] w-full" />}>
              <Hero3DScene />
            </React.Suspense>
          )}
        </div>
      </section>

      {/* 2. COURSE SELECTION MARKETPLACE (Lazy-Loaded below-the-fold) */}
      <React.Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-slate-500 font-mono text-xs">Chargement des modules...</div>}>
        <CourseMarketplace onSelectAgile={onSelectAgile} />
      </React.Suspense>
    </div>
  );
}

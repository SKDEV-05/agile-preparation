import React, { useState } from 'react';
import { ActiveView } from './Sidebar';
import { PartId } from '../../types';
import { ShareButton } from '../common/ShareButton';

const Sidebar = React.lazy(() => import('./Sidebar').then(m => ({ default: m.Sidebar })));
const Header = React.lazy(() => import('./Header').then(m => ({ default: m.Header })));
const Footer = React.lazy(() => import('./Footer').then(m => ({ default: m.Footer })));

interface LayoutProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView, partId?: PartId) => void;
  children: React.ReactNode;
}

export function Layout({ activeView, onNavigate, children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isCurriculumHub = activeView === 'curriculum-hub';

  // 1. Full-width Portal Layout when choosing a module (no premature Agile sidebar)
  if (isCurriculumHub) {
    return (
      <div className="min-h-screen bg-transparent text-slate-100 flex flex-col">
        {/* Minimal sleek dark glass header for Hub */}
        <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-white/10 bg-[#070B14]/80 px-4 sm:px-8 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl overflow-hidden border border-white/15 shadow-md">
              <img src="/logo.webp" alt="FullStack Master Logo" width={36} height={36} fetchPriority="high" loading="eager" decoding="async" className="h-full w-full object-cover" />
            </div>
            <div>
              <span className="font-black text-white text-sm sm:text-base tracking-tight">
                FULLSTACK <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">2A</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-mono font-bold text-slate-400">· 2ème Année OFPPT</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ShareButton variant="full" />
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="hidden sm:inline">1 Module Actif</span>
              <span className="sm:hidden">Agile</span>
            </span>
          </div>
        </header>

        {/* Hub Content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
          <React.Suspense fallback={null}>
            <Footer onNavigate={onNavigate} />
          </React.Suspense>
        </main>
      </div>
    );
  }

  // 2. Regular Workspace Layout (Sidebar + Header + Lessons/Simulators/Exams)
  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex">
      {/* Sidebar with Agile course parts */}
      <React.Suspense fallback={<div className="hidden lg:block w-72 h-screen border-r border-white/10 bg-[#0B1120]" />}>
        <Sidebar
          activeView={activeView}
          onNavigate={onNavigate}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />
      </React.Suspense>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:pl-72 min-w-0">
        <React.Suspense fallback={<div className="h-16 border-b border-white/10 bg-[#070B14]/80" />}>
          <Header
            activeView={activeView}
            onNavigate={onNavigate}
            onOpenMobileSidebar={() => setIsMobileMenuOpen(true)}
          />
        </React.Suspense>
        <main className="flex-1 px-3 py-5 sm:px-6 sm:py-8 lg:px-8 max-w-7xl w-full mx-auto">
          {children}
          <React.Suspense fallback={null}>
            <Footer onNavigate={onNavigate} />
          </React.Suspense>
        </main>
      </div>
    </div>
  );
}


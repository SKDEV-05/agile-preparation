import React, { useState } from 'react';
import { ActiveView } from './Sidebar';
import { Footer } from './Footer';
import { PartId } from '../../types';
import { ShareButton } from '../common/ShareButton';
import { ThemeToggle } from '../common/ThemeToggle';
import { MobileNavigation } from './MobileNavigation';

const Sidebar = React.lazy(() => import('./Sidebar').then(m => ({ default: m.Sidebar })));
const Header = React.lazy(() => import('./Header').then(m => ({ default: m.Header })));

interface LayoutProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView, partId?: PartId) => void;
  onOpenSearch?: () => void;
  children: React.ReactNode;
}

export function Layout({
  activeView,
  onNavigate,
  onOpenSearch,
  children
}: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isCurriculumHub = activeView === 'curriculum-hub';

  // 1. Full-width Portal Layout when choosing a module (Curriculum Hub)
  if (isCurriculumHub) {
    return (
      <div className="min-h-screen bg-transparent text-[#0A0A0A] dark:text-white flex flex-col transition-colors">
        {/* Minimal sleek header for Hub */}
        <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-black/15 dark:border-white/15 bg-white/95 dark:bg-[#0A0A0A]/95 px-4 sm:px-8 backdrop-blur-xl transition-colors select-none">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl overflow-hidden border border-black/15 dark:border-white/15 shadow-2xs">
              <img src="/logo.webp" alt="FullStack Master Logo" width={36} height={36} fetchPriority="high" loading="eager" decoding="async" className="h-full w-full object-cover" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-handwriting text-2xl sm:text-3xl font-black text-[#0A0A0A] dark:text-white tracking-wide leading-none">
                FullStack <span className="text-[#10B981]">2A</span>
              </span>
              <span className="hidden sm:inline-block text-xs font-mono font-bold text-[#0A0A0A]/60 dark:text-white/60">· 2ème Année OFPPT</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="flex items-center gap-1.5 rounded-xl border border-black/15 dark:border-white/15 px-2.5 py-1.5 text-xs text-[#0A0A0A]/70 dark:text-white/70 hover:border-[#10B981] hover:text-[#10B981] transition-all cursor-pointer shadow-2xs"
                title="Rechercher (Ctrl+K)"
              >
                <span className="font-medium hidden sm:inline">Rechercher</span>
                <kbd className="px-1 py-0.2 text-[9px] font-mono rounded bg-black/5 dark:bg-white/10">⌘K</kbd>
              </button>
            )}
            <ThemeToggle />
            <ShareButton variant="full" />
            <span className="rounded-full bg-[#10B981] px-3 py-1 text-xs font-bold text-white flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
              <span className="hidden sm:inline">1 Module Actif</span>
              <span className="sm:hidden">Agile</span>
            </span>
          </div>
        </header>

        {/* Hub Content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 lg:pb-6">
          {children}
          <Footer onNavigate={onNavigate} />
        </main>

        {/* Mobile Navigation bar */}
        <MobileNavigation
          activeView={activeView}
          onNavigate={onNavigate}
          onOpenDrawer={() => setIsMobileMenuOpen(true)}
        />
      </div>
    );
  }

  // 2. Regular Workspace Layout (Sidebar + Header + Lessons/Simulators/Exams)
  return (
    <div className="min-h-screen bg-transparent text-[#0A0A0A] dark:text-white flex transition-colors">
      {/* Sidebar with Agile course parts */}
      <React.Suspense fallback={<div className="hidden lg:block w-72 h-screen border-r border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A]" />}>
        <Sidebar
          activeView={activeView}
          onNavigate={onNavigate}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />
      </React.Suspense>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:pl-72 min-w-0">
        <React.Suspense fallback={<div className="h-16 border-b border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A]" />}>
          <Header
            activeView={activeView}
            onNavigate={onNavigate}
            onOpenMobileSidebar={() => setIsMobileMenuOpen(true)}
            onOpenSearch={onOpenSearch}
          />
        </React.Suspense>
        
        <main className="flex-1 px-3 py-5 sm:px-6 sm:py-8 lg:px-8 max-w-7xl w-full mx-auto pb-20 lg:pb-8">
          {children}
          <Footer onNavigate={onNavigate} />
        </main>

        {/* Mobile Navigation bar at screen bottom */}
        <MobileNavigation
          activeView={activeView}
          onNavigate={onNavigate}
          onOpenDrawer={() => setIsMobileMenuOpen(true)}
        />
      </div>
    </div>
  );
}

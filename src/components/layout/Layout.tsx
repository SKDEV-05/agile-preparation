import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { ActiveView } from './Sidebar';
import { Footer } from './Footer';
import { PartId } from '../../types';
import { ShareButton } from '../common/ShareButton';
import { InstallButton } from '../common/InstallButton';
import { ThemeToggle } from '../common/ThemeToggle';
import { MobileNavigation } from './MobileNavigation';
import { PlatformLogo } from '../common/PlatformLogo';

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
  const isPortalLayout = activeView === 'curriculum-hub' || activeView === 'methodology';

  // 1. Full-width Portal Layout (Curriculum Hub & Standalone Methodology Guide)
  if (isPortalLayout) {
    return (
      <div className="min-h-screen bg-transparent text-[#0A0A0A] dark:text-white flex flex-col transition-colors">
        {/* Minimal sleek header */}
        <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-black/15 dark:border-white/15 bg-white/95 dark:bg-[#0A0A0A]/95 px-3 sm:px-6 lg:px-8 backdrop-blur-xl transition-colors select-none">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('curriculum-hub')}
              className="flex items-center gap-2.5 sm:gap-3 hover:opacity-85 transition-opacity cursor-pointer text-left"
              title="Retour aux modules 2A"
            >
              <PlatformLogo size={32} />
              <div className="flex items-baseline gap-2">
                <span className="font-handwriting text-2xl sm:text-3xl font-black text-[#0A0A0A] dark:text-white tracking-wide leading-none">
                  FullStack <span className="text-[#10B981]">2A</span>
                </span>
                <span className="hidden sm:inline-block text-xs font-mono font-bold text-[#0A0A0A]/60 dark:text-white/60">· 2ème Année OFPPT</span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3">
            {activeView === 'methodology' && (
              <button
                onClick={() => onNavigate('curriculum-hub')}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0A0A0A] text-xs font-bold text-[#0A0A0A] dark:text-white hover:border-[#10B981] hover:text-[#10B981] transition-all cursor-pointer shadow-2xs"
                title="Revenir à l'accueil"
              >
                <ArrowLeft className="h-3.5 w-3.5 text-[#10B981]" />
                <span className="hidden xs:inline">Retour aux modules</span>
                <span className="xs:hidden">Retour</span>
              </button>
            )}

            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="hidden sm:flex items-center gap-1.5 rounded-xl border border-black/15 dark:border-white/15 px-2.5 py-1.5 text-xs text-[#0A0A0A]/70 dark:text-white/70 hover:border-[#10B981] hover:text-[#10B981] transition-all cursor-pointer shadow-2xs"
                title="Rechercher (Ctrl+K)"
              >
                <span className="font-medium">Rechercher</span>
                <kbd className="px-1 py-0.2 text-[9px] font-mono rounded bg-black/5 dark:bg-white/10">⌘K</kbd>
              </button>
            )}
            <InstallButton variant="minimal" />
            <ThemeToggle />
            <ShareButton variant="minimal" />
            <span className="rounded-full bg-[#10B981] px-2 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-bold text-white flex items-center gap-1.5 shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
              <span className="hidden sm:inline">2 Formations Ouvertes</span>
              <span className="sm:hidden">2 Ouvertes</span>
            </span>
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-20 lg:pb-6 overflow-x-hidden">
          {children}
          <Footer onNavigate={onNavigate} />
        </main>

        {/* Floating Search Action Button (Mobile Chatbot Style FAB at Bottom-Right) */}
        {onOpenSearch && (
          <button
            onClick={onOpenSearch}
            className="lg:hidden fixed bottom-20 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-tr from-[#10B981] via-emerald-500 to-teal-400 text-white shadow-xl shadow-[#10B981]/30 border border-white/30 active:scale-90 hover:scale-105 transition-all duration-200 cursor-pointer group"
            aria-label="Recherche rapide"
            title="Recherche rapide (cours, QCM, notions)"
          >
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <Search className="h-5 w-5 text-white transition-transform group-hover:rotate-12" />
          </button>
        )}

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

        {/* Floating Search Action Button (Mobile Chatbot Style FAB at Bottom-Right) */}
        {onOpenSearch && (
          <button
            onClick={onOpenSearch}
            className="lg:hidden fixed bottom-20 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-tr from-[#10B981] via-emerald-500 to-teal-400 text-white shadow-xl shadow-[#10B981]/30 border border-white/30 active:scale-90 hover:scale-105 transition-all duration-200 cursor-pointer group"
            aria-label="Recherche rapide"
            title="Recherche rapide (cours, QCM, notions)"
          >
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <Search className="h-5 w-5 text-white transition-transform group-hover:rotate-12" />
          </button>
        )}

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

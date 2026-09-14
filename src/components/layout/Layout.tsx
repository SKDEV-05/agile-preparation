import React, { useState } from 'react';
import { Sidebar, ActiveView } from './Sidebar';
import { Header } from './Header';
import { PartId } from '../../types';

interface LayoutProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView, partId?: PartId) => void;
  children: React.ReactNode;
}

export function Layout({ activeView, onNavigate, children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-slate-900 flex">
      {/* Sidebar */}
      <Sidebar
        activeView={activeView}
        onNavigate={onNavigate}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:pl-72 min-w-0">
        <Header
          activeView={activeView}
          onNavigate={onNavigate}
          onOpenMobileSidebar={() => setIsMobileMenuOpen(true)}
        />
        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

import React from 'react';
import { LayoutDashboard, BookOpen, FlaskConical, Award, Menu } from 'lucide-react';
import { ActiveView } from './Sidebar';
import { PartId } from '../../types';

interface MobileNavigationProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView, partId?: PartId) => void;
  onOpenDrawer: () => void;
}

export function MobileNavigation({
  activeView,
  onNavigate,
  onOpenDrawer
}: MobileNavigationProps) {
  const isCourseActive = activeView.startsWith('part');

  const items = [
    {
      id: 'dashboard',
      label: 'Accueil',
      icon: LayoutDashboard,
      isActive: activeView === 'curriculum-hub' || activeView === 'dashboard',
      action: () => {
        if (activeView === 'curriculum-hub') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          onNavigate('curriculum-hub');
        }
      }
    },
    {
      id: 'courses',
      label: 'Cours',
      icon: BookOpen,
      isActive: isCourseActive,
      action: () => {
        const el = document.getElementById('courses-catalogue-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          onNavigate('curriculum-hub');
          setTimeout(() => {
            document.getElementById('courses-catalogue-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 150);
        }
      }
    },
    {
      id: 'simulators',
      label: 'Pratique',
      icon: FlaskConical,
      isActive: activeView === 'simulators',
      action: () => onNavigate('simulators')
    },
    {
      id: 'final-exam',
      label: 'Examen',
      icon: Award,
      isActive: activeView === 'final-exam',
      action: () => onNavigate('final-exam')
    },
    {
      id: 'menu',
      label: 'Menu',
      icon: Menu,
      isActive: false,
      action: onOpenDrawer
    }
  ];

  return (
    <nav 
      aria-label="Navigation mobile principale"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md border-t border-black/15 dark:border-white/15 px-2 py-1.5 transition-colors select-none"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-xl transition-all cursor-pointer ${
                item.isActive
                  ? 'text-[#10B981]'
                  : 'text-[#0A0A0A]/60 dark:text-white/60 hover:text-[#0A0A0A] dark:hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${item.isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {item.isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[#10B981]" />
                )}
              </div>
              <span className={`text-[10px] mt-1 font-bold ${item.isActive ? 'text-[#10B981]' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

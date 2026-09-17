import { useState } from 'react';
import { Smartphone, Download } from 'lucide-react';
import { InstallModal } from './InstallModal';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface InstallButtonProps {
  variant?: 'minimal' | 'full' | 'sidebar';
  className?: string;
}

export function InstallButton({ variant = 'minimal', className = '' }: InstallButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isInstalled } = usePWAInstall();

  if (isInstalled && variant !== 'sidebar') {
    return null; // Don't show header install button if already in standalone app mode
  }

  if (variant === 'sidebar') {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-2xl border border-indigo-200/80 dark:border-indigo-500/20 bg-indigo-50/70 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 font-bold text-xs transition-all shadow-xs group ${className}`}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs group-hover:scale-105 transition-transform shrink-0">
            <Smartphone className="h-4 w-4" />
          </div>
          <div className="text-left flex-1">
            <div className="leading-tight font-black text-slate-900 dark:text-white">Installer l'App</div>
            <div className="text-[10px] text-indigo-600/80 dark:text-indigo-400 font-medium">Sur téléphone & APK</div>
          </div>
          <Download className="h-3.5 w-3.5 text-indigo-500 group-hover:translate-y-0.5 transition-transform" />
        </button>
        <InstallModal open={isOpen} onOpenChange={setIsOpen} />
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/90 dark:bg-indigo-950/40 px-3 py-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all shadow-xs group ${className}`}
        title="Installer l'application sur votre téléphone (PWA / APK)"
      >
        <Smartphone className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
        {variant === 'full' ? (
          <span>Installer l'application</span>
        ) : (
          <span className="hidden sm:inline">Installer l'App</span>
        )}
      </button>
      <InstallModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}

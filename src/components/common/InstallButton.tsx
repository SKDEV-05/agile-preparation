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
          className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-2xl border border-[#10B981]/30 bg-[#10B981]/10 text-black dark:text-white hover:bg-[#10B981]/20 font-bold text-xs transition-all shadow-xs group ${className}`}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#10B981] text-white shadow-xs group-hover:scale-105 transition-transform shrink-0">
            <Smartphone className="h-4 w-4" />
          </div>
          <div className="text-left flex-1">
            <div className="leading-tight font-black text-black dark:text-white">Installer l'App</div>
            <div className="text-[10px] text-[#10B981] font-medium">Sur téléphone & APK</div>
          </div>
          <Download className="h-3.5 w-3.5 text-[#10B981] group-hover:translate-y-0.5 transition-transform" />
        </button>
        <InstallModal open={isOpen} onOpenChange={setIsOpen} />
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-1.5 rounded-xl border border-[#10B981]/30 bg-[#10B981]/10 h-9 w-9 sm:h-auto sm:w-auto p-0 sm:px-3 sm:py-1.5 justify-center text-xs font-bold text-black dark:text-white hover:bg-[#10B981]/20 transition-all shadow-xs group cursor-pointer ${className}`}
        title="Installer l'application sur votre téléphone (PWA / APK)"
        aria-label="Installer l'application"
      >
        <Smartphone className="h-4 w-4 sm:h-3.5 sm:w-3.5 text-[#10B981] group-hover:scale-110 transition-transform" />
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

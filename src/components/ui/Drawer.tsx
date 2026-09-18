import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'bottom';
  className?: string;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  className = ''
}: DrawerProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const positionClasses = {
    right: 'inset-y-0 right-0 max-w-md w-full border-l',
    left: 'inset-y-0 left-0 max-w-md w-full border-r',
    bottom: 'inset-x-0 bottom-0 max-h-[85vh] w-full border-t rounded-t-3xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0A0A0A]/70 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Drawer Surface */}
      <div
        className={`relative z-10 flex flex-col bg-white dark:bg-[#0A0A0A] border-black/15 dark:border-white/15 shadow-2xl overflow-hidden transition-transform duration-300 ${positionClasses[position]} ${className}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/15 dark:border-white/15">
          {title ? (
            <h3 className="text-base font-black text-[#0A0A0A] dark:text-white tracking-tight">
              {title}
            </h3>
          ) : <div />}

          <button
            onClick={onClose}
            className="h-8 w-8 rounded-xl flex items-center justify-center text-[#0A0A0A]/60 dark:text-white/60 hover:text-[#10B981] hover:bg-[#10B981]/10 border border-black/10 dark:border-white/10 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {children}
        </div>
      </div>
    </div>
  );
}

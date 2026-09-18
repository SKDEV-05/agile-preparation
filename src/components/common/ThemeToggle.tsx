import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'button' | 'switch' | 'segmented';
  showLabel?: boolean;
}

export function ThemeToggle({ className, variant = 'button', showLabel = false }: ThemeToggleProps) {
  const { isDark, toggleTheme, setTheme } = useTheme();

  // 1. Tactile 1-Click Toggle Switch (Ideal for Sidebar, settings, and compact spaces)
  if (variant === 'switch') {
    const switchControl = (
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        onClick={toggleTheme}
        aria-label={isDark ? "Désactiver le mode sombre" : "Activer le mode sombre"}
        title={isDark ? "Passer en mode clair (1 clic)" : "Passer en mode sombre (1 clic)"}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2",
          isDark
            ? "bg-[#10B981] border border-[#10B981] shadow-xs"
            : "bg-black/20 dark:bg-white/20 border border-black/10 shadow-xs",
          !showLabel && className
        )}
      >
        {/* Track icons */}
        <span className="absolute inset-0 flex items-center justify-between px-1 pointer-events-none select-none">
          <Sun className={cn("h-2.5 w-2.5 transition-opacity duration-200", isDark ? "opacity-60 text-white" : "opacity-0")} />
          <Moon className={cn("h-2.5 w-2.5 transition-opacity duration-200", isDark ? "opacity-0" : "opacity-60 text-black")} />
        </span>

        {/* Sliding Thumb */}
        <span
          className={cn(
            "pointer-events-none relative flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out transform",
            isDark ? "translate-x-5 text-[#0A0A0A]" : "translate-x-0 text-[#10B981]"
          )}
        >
          {isDark ? (
            <Moon className="h-3 w-3 fill-[#0A0A0A] text-[#0A0A0A] transition-transform duration-300 -rotate-12" />
          ) : (
            <Sun className="h-3 w-3 fill-[#10B981]/30 text-[#10B981] transition-transform duration-300 rotate-45" />
          )}
        </span>
      </button>
    );

    if (showLabel) {
      return (
        <div
          onClick={toggleTheme}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleTheme();
            }
          }}
          aria-label={isDark ? "Désactiver le mode sombre" : "Activer le mode sombre"}
          className={cn(
            "group flex items-center justify-between px-2.5 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#10B981]/50 dark:hover:border-[#10B981]/50 transition-all duration-200 cursor-pointer select-none",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-lg transition-colors duration-200",
                isDark
                  ? "bg-[#10B981]/20 text-[#10B981]"
                  : "bg-black/10 text-black"
              )}
            >
              {isDark ? (
                <Moon className="h-3.5 w-3.5 fill-[#10B981]/20" />
              ) : (
                <Sun className="h-3.5 w-3.5 fill-black/20" />
              )}
            </div>
            <span className="text-xs font-semibold text-black/80 dark:text-white/80 group-hover:text-[#10B981] dark:group-hover:text-[#10B981] transition-colors">
              Mode sombre
            </span>
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            {switchControl}
          </div>
        </div>
      );
    }

    return switchControl;
  }

  // 2. 2-State Segmented Pill: [ ☀️ Clair | 🌙 Sombre ]
  if (variant === 'segmented') {
    return (
      <div
        className={cn(
          "inline-flex items-center p-0.5 rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 gap-0.5 select-none",
          className
        )}
      >
        <button
          type="button"
          onClick={() => setTheme('light')}
          aria-label="Mode Clair"
          className={cn(
            "flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all",
            !isDark
              ? "bg-white text-black shadow-xs ring-1 ring-black/10"
              : "text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
          )}
        >
          <Sun className="h-3.5 w-3.5 text-[#10B981]" />
          <span className="text-[11px]">Clair</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('dark')}
          aria-label="Mode Sombre"
          className={cn(
            "flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all",
            isDark
              ? "bg-[#10B981] text-white shadow-sm shadow-[#10B981]/30"
              : "text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
          )}
        >
          <Moon className="h-3.5 w-3.5 text-white" />
          <span className="text-[11px]">Sombre</span>
        </button>
      </div>
    );
  }

  // 3. One-Click Direct Toggle Button (Header / Topbar)
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      title={isDark ? "Passer en mode clair (1 clic)" : "Passer en mode sombre (1 clic)"}
      className={cn(
        "group relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border transition-all duration-300 shadow-xs overflow-hidden",
        isDark
          ? "border-white/10 bg-[#0A0A0A] text-white hover:text-[#10B981] hover:border-[#10B981]/50 hover:bg-white/5"
          : "border-black/10 bg-white text-black hover:border-[#10B981]/50 hover:text-[#10B981] shadow-xs",
        className
      )}
    >
      <div className="relative flex items-center justify-center h-full w-full">
        {isDark ? (
          <Moon className="h-4.5 w-4.5 text-white group-hover:text-[#10B981] transition-all duration-300 group-hover:scale-110 -rotate-12 fill-white/10" />
        ) : (
          <Sun className="h-4.5 w-4.5 text-black group-hover:text-[#10B981] transition-all duration-300 group-hover:scale-110 group-hover:rotate-45 fill-black/10" />
        )}
      </div>

      {showLabel && (
        <span className="ml-2 text-xs font-bold text-black/80 dark:text-white/80">
          {isDark ? 'Mode sombre' : 'Mode clair'}
        </span>
      )}
    </button>
  );
}

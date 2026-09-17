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
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
          isDark
            ? "bg-indigo-600 border border-indigo-500/90 shadow-xs"
            : "bg-slate-300 dark:bg-slate-700 border border-slate-300/80 shadow-xs",
          !showLabel && className
        )}
      >
        {/* Track icons */}
        <span className="absolute inset-0 flex items-center justify-between px-1 pointer-events-none select-none">
          <Sun className={cn("h-2.5 w-2.5 transition-opacity duration-200", isDark ? "opacity-60 text-indigo-200" : "opacity-0")} />
          <Moon className={cn("h-2.5 w-2.5 transition-opacity duration-200", isDark ? "opacity-0" : "opacity-60 text-slate-500")} />
        </span>

        {/* Sliding Thumb */}
        <span
          className={cn(
            "pointer-events-none relative flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out transform",
            isDark ? "translate-x-5 text-indigo-600" : "translate-x-0 text-amber-500"
          )}
        >
          {isDark ? (
            <Moon className="h-3 w-3 fill-indigo-600/20 text-indigo-600 transition-transform duration-300 -rotate-12" />
          ) : (
            <Sun className="h-3 w-3 fill-amber-400 text-amber-500 transition-transform duration-300 rotate-45" />
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
            "group flex items-center justify-between px-2.5 py-2 rounded-xl bg-slate-100/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 hover:border-indigo-400/40 dark:hover:border-indigo-500/40 transition-all duration-200 cursor-pointer select-none",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-lg transition-colors duration-200",
                isDark
                  ? "bg-indigo-500/20 text-indigo-300"
                  : "bg-amber-500/20 text-amber-600"
              )}
            >
              {isDark ? (
                <Moon className="h-3.5 w-3.5 fill-indigo-400/20" />
              ) : (
                <Sun className="h-3.5 w-3.5 fill-amber-400/30" />
              )}
            </div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
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

  // 2. 2-State Segmented Pill: [ ☀️ Clair | 🌙 Sombre ] (No 'Système' to avoid overflow)
  if (variant === 'segmented') {
    return (
      <div
        className={cn(
          "inline-flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 gap-0.5 select-none",
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
              ? "bg-white text-amber-600 shadow-xs ring-1 ring-slate-200/80"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          )}
        >
          <Sun className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-[11px]">Clair</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('dark')}
          aria-label="Mode Sombre"
          className={cn(
            "flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all",
            isDark
              ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          )}
        >
          <Moon className="h-3.5 w-3.5 text-indigo-200" />
          <span className="text-[11px]">Sombre</span>
        </button>
      </div>
    );
  }

  // 3. One-Click Direct Toggle Button (Header / Topbar) - NO dropdown needed!
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      title={isDark ? "Passer en mode clair (1 clic)" : "Passer en mode sombre (1 clic)"}
      className={cn(
        "group relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border transition-all duration-300 shadow-xs overflow-hidden",
        isDark
          ? "border-white/10 bg-slate-900/90 text-indigo-300 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800"
          : "border-slate-300/80 bg-white text-amber-600 hover:bg-amber-50/60 hover:border-amber-400/60 shadow-xs",
        className
      )}
    >
      {/* Dynamic Animated Sun / Moon Icons with Smooth 360 Spin */}
      <div className="relative flex items-center justify-center h-full w-full">
        {isDark ? (
          <Moon className="h-4.5 w-4.5 text-indigo-300 group-hover:text-indigo-200 transition-all duration-300 group-hover:scale-110 -rotate-12 fill-indigo-400/20" />
        ) : (
          <Sun className="h-4.5 w-4.5 text-amber-500 group-hover:text-amber-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-45 fill-amber-400/30" />
        )}
      </div>

      {showLabel && (
        <span className="ml-2 text-xs font-bold text-slate-700 dark:text-slate-300">
          {isDark ? 'Mode sombre' : 'Mode clair'}
        </span>
      )}
    </button>
  );
}

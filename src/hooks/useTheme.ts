import { useCallback, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'fullstack2a_theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  try {
    const val = localStorage.getItem(THEME_STORAGE_KEY);
    if (val === 'light' || val === 'dark') {
      return val;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch {
    // LocalStorage unavailable
  }
  return 'dark';
}

function syncDOM(theme: Theme) {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.remove('dark');
    root.style.colorScheme = 'light';
  }

  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme === 'dark' ? '#0A0A0A' : '#10B981');
  }
}

// Global Singleton Store for instantaneous synchronization
let currentTheme: Theme = getInitialTheme();

// Immediate DOM sync on load
if (typeof window !== 'undefined') {
  syncDOM(currentTheme);
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Theme {
  return currentTheme;
}

function getServerSnapshot(): Theme {
  return 'dark';
}

function setGlobalTheme(newTheme: Theme) {
  currentTheme = newTheme;
  syncDOM(newTheme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  } catch {
    // Ignore quota errors
  }
  listeners.forEach(listener => listener());
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === THEME_STORAGE_KEY && (e.newValue === 'light' || e.newValue === 'dark')) {
      setGlobalTheme(e.newValue);
    }
  });
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((newTheme: Theme) => {
    setGlobalTheme(newTheme);
  }, []);

  const isDark = theme === 'dark';

  const toggleTheme = useCallback(() => {
    setGlobalTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }, []);

  return {
    theme,
    resolvedTheme: theme,
    setTheme,
    toggleTheme,
    isDark,
  };
}

import { useEffect } from 'react';

/**
 * Hook to automatically observe and reveal elements with the class `reveal-on-scroll`
 * or cards/sections as they scroll into view.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    document.querySelectorAll('.reveal-on-scroll, [data-scroll-reveal]').forEach((el) => {
      el.classList.add('is-revealed');
    });
  }, []);
}

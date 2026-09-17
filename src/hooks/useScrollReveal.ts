import { useEffect } from 'react';

/**
 * Hook to automatically observe and reveal elements with the class `reveal-on-scroll`
 * or cards/sections as they scroll into view.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const revealAll = () => {
      document.querySelectorAll('.reveal-on-scroll, [data-scroll-reveal]').forEach((el) => {
        el.classList.add('is-revealed');
      });
    };

    revealAll();

    const observer = new MutationObserver(() => {
      revealAll();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);
}

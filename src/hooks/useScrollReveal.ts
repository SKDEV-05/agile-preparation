import { useEffect } from 'react';

/**
 * Hook to automatically observe and reveal elements with the class `reveal-on-scroll`
 * or cards/sections as they scroll into view.
 */
export function useScrollReveal() {
  useEffect(() => {
    // Check if IntersectionObserver is supported
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Unobserve after revealing once for performance
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px', // triggers slightly before scrolling fully into view
        threshold: 0.1,
      }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll, [data-scroll-reveal]');
    elements.forEach((el) => observer.observe(el));

    // Also observe newly rendered dynamic elements via MutationObserver
    const mutationObserver = new MutationObserver(() => {
      const newElements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed), [data-scroll-reveal]:not(.is-revealed)');
      newElements.forEach((el) => observer.observe(el));
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}

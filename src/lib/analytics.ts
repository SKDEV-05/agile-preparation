/**
 * Google Analytics 4 (GA4) Helper
 * 
 * Permet d'envoyer des métriques précises à Google Analytics :
 * - Pages vues
 * - Sélection de modules
 * - Démarrage / complétion de QCM
 * - Lancement de simulateurs
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_TRACKING_ID = 'G-E229H2TMY7';

/**
 * Envoie un événement personnalisé à Google Analytics
 */
export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
}

/**
 * Envoie une page vue virtuelle lors des changements de vue SPA
 */
export function trackPageView(pagePath: string, pageTitle?: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle || document.title,
    });
  }
}

/**
 * Suivi spécifique des actions clés de la plateforme EdTech
 */
export const analytics = {
  selectModule: (moduleId: string, moduleTitle: string) => {
    trackEvent('select_content', {
      content_type: 'curriculum_module',
      item_id: moduleId,
      item_name: moduleTitle,
    });
  },

  viewCoursePart: (partId: string, partTitle: string) => {
    trackEvent('view_item', {
      content_type: 'course_chapter',
      item_id: partId,
      item_name: partTitle,
    });
  },

  startQuiz: (partId: string, questionCount: number) => {
    trackEvent('quiz_start', {
      part_id: partId,
      questions_count: questionCount,
    });
  },

  completeQuiz: (partId: string, score: number, total: number) => {
    trackEvent('quiz_complete', {
      part_id: partId,
      score: score,
      total_questions: total,
      score_percentage: Math.round((score / total) * 100),
    });
  },

  openSimulator: (simulatorId: string) => {
    trackEvent('use_simulator', {
      simulator_name: simulatorId,
    });
  },

  completeFinalExam: (score: number, total: number, timeSpentSec: number) => {
    trackEvent('exam_complete', {
      score: score,
      total_questions: total,
      score_percentage: Math.round((score / total) * 100),
      duration_seconds: timeSpentSec,
    });
  },
};

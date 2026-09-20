import { useState, useEffect } from 'react';
import { ReactModuleId, UserReactProgressState, ReactExamAttempt } from '../types/reactTypes';

const REACT_STORAGE_KEY = 'react_ofppt_progress_v1';

const initialModulesState: Record<ReactModuleId, { completedSections: string[]; quizCompleted: boolean; bestScore: number; attempts: number }> = {
  module1: { completedSections: [], quizCompleted: false, bestScore: 0, attempts: 0 },
  module2: { completedSections: [], quizCompleted: false, bestScore: 0, attempts: 0 },
  module3: { completedSections: [], quizCompleted: false, bestScore: 0, attempts: 0 },
  module4: { completedSections: [], quizCompleted: false, bestScore: 0, attempts: 0 },
  module5: { completedSections: [], quizCompleted: false, bestScore: 0, attempts: 0 },
  module6: { completedSections: [], quizCompleted: false, bestScore: 0, attempts: 0 },
  module7: { completedSections: [], quizCompleted: false, bestScore: 0, attempts: 0 },
  module8: { completedSections: [], quizCompleted: false, bestScore: 0, attempts: 0 },
};

const defaultReactState: UserReactProgressState = {
  modules: initialModulesState,
  examAttempts: [],
  wrongQuestionIds: [],
  masteredFlashcards: [],
  solvedLabIds: [],
  lastActiveDate: new Date().toISOString().split('T')[0],
};

export function getStoredReactProgress(): UserReactProgressState {
  try {
    const raw = localStorage.getItem(REACT_STORAGE_KEY);
    if (!raw) return defaultReactState;
    const parsed = JSON.parse(raw);
    return {
      ...defaultReactState,
      ...parsed,
      modules: {
        ...initialModulesState,
        ...(parsed.modules || {}),
      },
      wrongQuestionIds: parsed.wrongQuestionIds || [],
      masteredFlashcards: parsed.masteredFlashcards || [],
      solvedLabIds: parsed.solvedLabIds || [],
      examAttempts: parsed.examAttempts || [],
    };
  } catch {
    return defaultReactState;
  }
}

export function saveReactProgress(state: UserReactProgressState) {
  try {
    localStorage.setItem(REACT_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to persist React progress to localStorage', e);
  }
}

export function useReactProgress() {
  const [progress, setProgressState] = useState<UserReactProgressState>(getStoredReactProgress);

  useEffect(() => {
    const handler = () => setProgressState(getStoredReactProgress());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const update = (fn: (prev: UserReactProgressState) => UserReactProgressState) => {
    setProgressState(prev => {
      const next = fn(prev);
      saveReactProgress(next);
      return next;
    });
  };

  const markSectionCompleted = (moduleId: ReactModuleId, sectionId: string) => {
    update(prev => {
      const current = prev.modules[moduleId]?.completedSections || [];
      if (current.includes(sectionId)) return prev;
      return {
        ...prev,
        modules: {
          ...prev.modules,
          [moduleId]: {
            ...prev.modules[moduleId],
            completedSections: [...current, sectionId],
          }
        }
      };
    });
  };

  const recordQuizResult = (moduleId: ReactModuleId, score: number, total: number, wrongIds: string[]) => {
    const pct = Math.round((score / total) * 100);
    update(prev => {
      const currentModule = prev.modules[moduleId];
      const newAttempts = currentModule.attempts + 1;
      const newBest = Math.max(currentModule.bestScore, pct);
      const isCompleted = pct >= 60 || currentModule.quizCompleted;

      const newWrong = new Set(prev.wrongQuestionIds);
      wrongIds.forEach(id => newWrong.add(id));

      return {
        ...prev,
        modules: {
          ...prev.modules,
          [moduleId]: {
            ...currentModule,
            attempts: newAttempts,
            bestScore: newBest,
            quizCompleted: isCompleted,
            lastAttemptAt: new Date().toISOString(),
          }
        },
        wrongQuestionIds: Array.from(newWrong),
      };
    });
  };

  const recordExamResult = (
    score: number,
    total: number,
    timeSpentSeconds: number,
    moduleScores: Record<ReactModuleId, { correct: number; total: number }>,
    wrongIds: string[]
  ) => {
    const newAttempt: ReactExamAttempt = {
      id: `react-exam-${Date.now()}`,
      date: new Date().toISOString(),
      score,
      total,
      timeSpentSeconds,
      moduleScores,
    };

    update(prev => {
      const newWrong = new Set(prev.wrongQuestionIds);
      wrongIds.forEach(id => newWrong.add(id));

      return {
        ...prev,
        examAttempts: [newAttempt, ...prev.examAttempts],
        wrongQuestionIds: Array.from(newWrong),
      };
    });
  };

  const clearResolvedError = (questionId: string) => {
    update(prev => ({
      ...prev,
      wrongQuestionIds: prev.wrongQuestionIds.filter(id => id !== questionId),
    }));
  };

  const toggleFlashcardMastered = (cardId: string) => {
    update(prev => {
      const isMastered = prev.masteredFlashcards.includes(cardId);
      const next = isMastered
        ? prev.masteredFlashcards.filter(id => id !== cardId)
        : [...prev.masteredFlashcards, cardId];
      return {
        ...prev,
        masteredFlashcards: next,
      };
    });
  };

  const markLabSolved = (labId: string) => {
    update(prev => {
      if (prev.solvedLabIds.includes(labId)) return prev;
      return {
        ...prev,
        solvedLabIds: [...prev.solvedLabIds, labId],
      };
    });
  };

  const resetAllReactProgress = () => {
    localStorage.removeItem(REACT_STORAGE_KEY);
    setProgressState(defaultReactState);
  };

  const moduleIds: ReactModuleId[] = [
    'module1', 'module2', 'module3', 'module4', 
    'module5', 'module6', 'module7', 'module8'
  ];

  const overallPercentage = Math.round(
    moduleIds.reduce((sum, id) => {
      const m = progress.modules[id];
      const quizContrib = m.bestScore * 0.5;
      const courseContrib = (Math.min(m.completedSections.length, 3) / 3) * 50;
      return sum + (quizContrib + courseContrib);
    }, 0) / moduleIds.length
  );

  return {
    progress,
    markSectionCompleted,
    recordQuizResult,
    recordExamResult,
    clearResolvedError,
    toggleFlashcardMastered,
    markLabSolved,
    resetAllReactProgress,
    overallPercentage,
  };
}

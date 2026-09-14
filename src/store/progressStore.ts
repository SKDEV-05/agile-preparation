import { useState, useEffect } from 'react';
import { PartId, UserProgressState, ExamAttempt } from '../types';

const STORAGE_KEY = 'agile_ofppt_progress_v2';

const initialPartsState = {
  part1: { completedSections: [], quizCompleted: false, bestScore: 0, attempts: 0 },
  part2: { completedSections: [], quizCompleted: false, bestScore: 0, attempts: 0 },
  part3: { completedSections: [], quizCompleted: false, bestScore: 0, attempts: 0 },
  part4: { completedSections: [], quizCompleted: false, bestScore: 0, attempts: 0 },
  part5: { completedSections: [], quizCompleted: false, bestScore: 0, attempts: 0 },
};

const defaultState: UserProgressState = {
  parts: initialPartsState,
  examAttempts: [],
  wrongQuestionIds: [],
  masteredFlashcards: [],
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  unlockedBadges: [],
};

export function getStoredProgress(): UserProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return {
      ...defaultState,
      ...parsed,
      parts: {
        ...initialPartsState,
        ...(parsed.parts || {}),
      }
    };
  } catch {
    return defaultState;
  }
}

export function saveProgress(state: UserProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to persist progress to localStorage', e);
  }
}

// React custom hook for synchronized state across views
export function useProgress() {
  const [progress, setProgressState] = useState<UserProgressState>(getStoredProgress);

  useEffect(() => {
    const handler = () => setProgressState(getStoredProgress());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const update = (fn: (prev: UserProgressState) => UserProgressState) => {
    setProgressState(prev => {
      const next = fn(prev);
      saveProgress(next);
      return next;
    });
  };

  const markSectionCompleted = (partId: PartId, sectionId: string) => {
    update(prev => {
      const current = prev.parts[partId]?.completedSections || [];
      if (current.includes(sectionId)) return prev;
      const updatedSections = [...current, sectionId];
      
      // Check badges
      const badges = [...prev.unlockedBadges];
      if (!badges.includes('first_step')) badges.push('first_step');

      return {
        ...prev,
        parts: {
          ...prev.parts,
          [partId]: {
            ...prev.parts[partId],
            completedSections: updatedSections,
          }
        },
        unlockedBadges: badges,
      };
    });
  };

  const recordQuizResult = (partId: PartId, score: number, total: number, wrongIds: string[]) => {
    const pct = Math.round((score / total) * 100);
    update(prev => {
      const currentPart = prev.parts[partId];
      const newAttempts = currentPart.attempts + 1;
      const newBest = Math.max(currentPart.bestScore, pct);
      const isCompleted = pct >= 60 || currentPart.quizCompleted;

      // Update wrong questions set
      const newWrong = new Set(prev.wrongQuestionIds);
      wrongIds.forEach(id => newWrong.add(id));

      // Badges
      const badges = [...prev.unlockedBadges];
      if (pct === 100 && !badges.includes('perfect_score')) badges.push('perfect_score');
      if (isCompleted && !badges.includes(`${partId}_mastered`)) badges.push(`${partId}_mastered`);

      return {
        ...prev,
        parts: {
          ...prev.parts,
          [partId]: {
            ...currentPart,
            attempts: newAttempts,
            bestScore: newBest,
            quizCompleted: isCompleted,
            lastAttemptAt: new Date().toISOString(),
          }
        },
        wrongQuestionIds: Array.from(newWrong),
        unlockedBadges: badges,
      };
    });
  };

  const recordExamResult = (
    score: number,
    total: number,
    timeSpentSeconds: number,
    partScores: Record<PartId, { correct: number; total: number }>,
    wrongIds: string[]
  ) => {
    const newAttempt: ExamAttempt = {
      id: `exam-${Date.now()}`,
      date: new Date().toISOString(),
      score,
      total,
      timeSpentSeconds,
      partScores,
    };

    update(prev => {
      const newWrong = new Set(prev.wrongQuestionIds);
      wrongIds.forEach(id => newWrong.add(id));

      const badges = [...prev.unlockedBadges];
      if (!badges.includes('exam_attempted')) badges.push('exam_attempted');
      if (score / total >= 0.8 && !badges.includes('exam_excellence')) badges.push('exam_excellence');

      return {
        ...prev,
        examAttempts: [newAttempt, ...prev.examAttempts],
        wrongQuestionIds: Array.from(newWrong),
        unlockedBadges: badges,
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

  const resetAllProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProgressState(defaultState);
  };

  // Overall completion score (0 - 100%)
  const partIds: PartId[] = ['part1', 'part2', 'part3', 'part4', 'part5'];
  const overallPercentage = Math.round(
    partIds.reduce((sum, id) => {
      const p = progress.parts[id];
      const quizContrib = p.bestScore * 0.7;
      const courseContrib = (Math.min(p.completedSections.length, 4) / 4) * 30;
      return sum + (quizContrib + courseContrib);
    }, 0) / 5
  );

  return {
    progress,
    markSectionCompleted,
    recordQuizResult,
    recordExamResult,
    clearResolvedError,
    toggleFlashcardMastered,
    resetAllProgress,
    overallPercentage,
  };
}

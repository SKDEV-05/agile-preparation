import { PartId, Question } from '../../types';
import { questionsPart1 } from './part1';
import { questionsPart2 } from './part2';
import { questionsPart3 } from './part3';
import { questionsPart4 } from './part4';
import { questionsPart5 } from './part5';
import { finalExamQuestions } from './finalExam';

export const QUESTIONS_BY_PART: Record<PartId, Question[]> = {
  part1: questionsPart1,
  part2: questionsPart2,
  part3: questionsPart3,
  part4: questionsPart4,
  part5: questionsPart5,
};

export const FINAL_EXAM_QUESTIONS: Question[] = finalExamQuestions;

export const ALL_QUESTIONS: Question[] = [
  ...questionsPart1,
  ...questionsPart2,
  ...questionsPart3,
  ...questionsPart4,
  ...questionsPart5,
  ...finalExamQuestions,
];

export function getQuestionsForPart(partId: PartId): Question[] {
  return QUESTIONS_BY_PART[partId] || [];
}

export function getQuestionById(id: string): Question | undefined {
  return ALL_QUESTIONS.find(q => q.id === id);
}

export function validateQuestionsIntegrity(): { isValid: boolean; duplicates: string[]; issues: string[] } {
  const seenTexts = new Map<string, string>();
  const duplicates: string[] = [];
  const issues: string[] = [];

  ALL_QUESTIONS.forEach(q => {
    // Check text uniqueness
    const normalized = q.question.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
    if (seenTexts.has(normalized)) {
      duplicates.push(`Duplicate question text found between ${q.id} and ${seenTexts.get(normalized)}`);
    } else {
      seenTexts.set(normalized, q.id);
    }

    // Check options count
    if (q.options.length !== 4) {
      issues.push(`Question ${q.id} must have exactly 4 options (found ${q.options.length})`);
    }

    // Check correctIndex range
    if (q.correctIndex < 0 || q.correctIndex >= q.options.length) {
      issues.push(`Question ${q.id} has invalid correctIndex: ${q.correctIndex}`);
    }

    // Check explanation
    if (!q.explanation || q.explanation.length < 10) {
      issues.push(`Question ${q.id} is missing a detailed pedagogic explanation`);
    }
  });

  return {
    isValid: duplicates.length === 0 && issues.length === 0,
    duplicates,
    issues
  };
}

export type PartId = 'part1' | 'part2' | 'part3' | 'part4' | 'part5';

export interface MiniQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CourseSection {
  id: string;
  order: string;
  title: string;
  definition: string;
  explanation: string;
  examples: string[];
  keyPoints: string[];
  traps: string[];
  examContext: string;
  diagramType?: 'lifecycle' | 'gantt_preview' | 'pert_preview' | 'scrum_workflow' | 'git_flow' | 'devops_cycle' | 'raci_matrix';
  miniQuestion?: MiniQuestion;
}

export interface CoursePart {
  id: PartId;
  orderNumber: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  colorTheme: string;
  sections: CourseSection[];
  practicalCase: {
    title: string;
    scenario: string;
    challenge: string;
    solutionPoints: string[];
  };
  keyTakeaways: string[];
  commonTraps: string[];
}

export type QuestionDifficulty = 'comprehension' | 'application' | 'scenario' | 'situation' | 'calculation' | 'trap' | 'advanced';

export interface Question {
  id: string;
  partId: PartId;
  difficulty: QuestionDifficulty;
  tag: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Flashcard {
  id: string;
  partId: PartId;
  category: string;
  front: string;
  back: string;
  keyPoints: string[];
}

export interface PartProgress {
  completedSections: string[];
  quizCompleted: boolean;
  bestScore: number;
  attempts: number;
  lastAttemptAt?: string;
}

export interface ExamAttempt {
  id: string;
  date: string;
  score: number;
  total: number;
  timeSpentSeconds: number;
  partScores: Record<PartId, { correct: number; total: number }>;
}

export interface UserProgressState {
  parts: Record<PartId, PartProgress>;
  examAttempts: ExamAttempt[];
  wrongQuestionIds: string[];
  masteredFlashcards: string[];
  streakDays: number;
  lastActiveDate: string;
  unlockedBadges: string[];
}

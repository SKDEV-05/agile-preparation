export type PartId = 'part1' | 'part2' | 'part3' | 'part4' | 'part5';

export interface MiniQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SectionVideo {
  youtubeId: string;
  title: string;
  channel: string;
  duration: string;
  language: 'fr' | 'en';
  summary: string;
  keyPoints: string[];
}

export interface RealWorldCase {
  company: string;
  sector: string;
  problem: string;
  agileSolution: string;
  concreteResult: string;
}

export type Model3DType = 'triangle_3d' | 'pert_3d' | 'scrum_3d' | 'git_3d' | 'devops_3d';

export interface CourseSection {
  id: string;
  order: string;
  title: string;
  definition: string;
  explanation: string;
  deepExplanation?: string;
  examples: string[];
  realWorldCase?: RealWorldCase;
  keyPoints: string[];
  traps: string[];
  examContext: string;
  diagramType?: 'lifecycle' | 'gantt_preview' | 'pert_preview' | 'scrum_workflow' | 'git_flow' | 'devops_cycle' | 'raci_matrix';
  model3D?: Model3DType;
  videos?: {
    fr: SectionVideo;
    en: SectionVideo;
  };
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

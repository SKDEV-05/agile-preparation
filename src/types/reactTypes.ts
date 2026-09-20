export type ReactModuleId = 
  | 'module1' 
  | 'module2' 
  | 'module3' 
  | 'module4' 
  | 'module5' 
  | 'module6' 
  | 'module7' 
  | 'module8';

export interface ReactMiniQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ReactCodeExample {
  title: string;
  description: string;
  code: string;
  outputPreview?: string;
  isPlaygroundTemplate?: boolean;
}

export type ReactDiagramType = 
  | 'spa_vs_mpa' 
  | 'stack_vs_heap' 
  | 'virtual_dom_diff' 
  | 'props_tree' 
  | 'state_render_cycle' 
  | 'use_effect_lifecycle' 
  | 'router_flow' 
  | 'redux_unidirectional' 
  | 'rtk_thunk_flow';

export interface ReactCourseSection {
  id: string;
  order: string;
  title: string;
  quickSummary: string;
  conceptExplanation: string;
  deepExplanation?: string;
  keyPoints: string[];
  examTraps: string[];
  diagramType?: ReactDiagramType;
  codeExamples: ReactCodeExample[];
  miniQuestion?: ReactMiniQuestion;
  officialDocReference?: string;
}

export interface ReactCourseModule {
  id: ReactModuleId;
  orderNumber: number;
  pdfReference: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  gradient: string;
  sections: ReactCourseSection[];
  practicalChallenge: {
    title: string;
    description: string;
    starterCode: string;
    expectedOutcome: string;
    solutionCode: string;
    explanation: string;
  };
  keyTakeaways: string[];
  commonTraps: string[];
}

export type ReactQuestionDifficulty = 'fondamentaux' | 'syntaxe' | 'piege' | 'application' | 'scenario';

export interface ReactQuestion {
  id: string;
  moduleId: ReactModuleId;
  difficulty: ReactQuestionDifficulty;
  tag: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ReactFlashcardItem {
  id: string;
  moduleId: ReactModuleId;
  category: string;
  front: string;
  back: string;
  codeExample?: string;
  keyPoints: string[];
}

export interface ReactModuleProgress {
  completedSections: string[];
  quizCompleted: boolean;
  bestScore: number;
  attempts: number;
  lastAttemptAt?: string;
}

export interface ReactExamAttempt {
  id: string;
  date: string;
  score: number;
  total: number;
  timeSpentSeconds: number;
  moduleScores: Record<ReactModuleId, { correct: number; total: number }>;
}

export interface UserReactProgressState {
  modules: Record<ReactModuleId, ReactModuleProgress>;
  examAttempts: ReactExamAttempt[];
  wrongQuestionIds: string[];
  masteredFlashcards: string[];
  solvedLabIds: string[];
  lastActiveDate: string;
}

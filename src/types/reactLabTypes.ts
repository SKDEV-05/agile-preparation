import { ReactModuleId } from './reactTypes';

export interface LabFile {
  name: string;
  path: string;
  content: string;
  readOnly?: boolean;
}

export interface LabTest {
  id: string;
  title: string;
  description: string;
  check: (code: string, activeFile: string, allFiles: LabFile[]) => boolean;
}

export interface LabHint {
  level: number;
  title: string;
  content: string;
}

export interface LabMicroQCM {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LabConceptReminder {
  title: string;
  explanation: string;
  diagramText?: string;
  keyRule?: string;
}

export interface LabBreakItChallenge {
  title: string;
  brokenFiles: { path: string; content: string }[];
  bugDescription: string;
  fixHint: string;
}

export interface LabResourceItem {
  id: string;
  title: string;
  type: 'array' | 'object' | 'api' | 'contract';
  description?: string;
  content: string;
}

export interface LabExercise {
  id: string;
  moduleId: ReactModuleId;
  moduleLabel: string;
  chapterTitle: string;
  title: string;
  subtitle: string;
  difficulty: 'intro' | 'practice' | 'challenge';
  concepts: string[];
  taskInstructions: string[];
  conceptReminder: LabConceptReminder;
  files: LabFile[];
  entryFile: string;
  tests: LabTest[];
  hints: LabHint[];
  solution: {
    explanation: string;
    files: { path: string; content: string }[];
  };
  breakItChallenge?: LabBreakItChallenge;
  microQcm?: LabMicroQCM;
  resources?: LabResourceItem[];
}

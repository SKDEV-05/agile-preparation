import { ReactModuleId, ReactQuestion } from '../../types/reactTypes';
import { MODULE_1_QUESTIONS } from './module1_qcm';
import { MODULE_2_QUESTIONS } from './module2_qcm';
import { MODULE_3_QUESTIONS } from './module3_qcm';
import { MODULE_4_QUESTIONS } from './module4_qcm';
import { MODULE_5_QUESTIONS } from './module5_qcm';
import { MODULE_6_QUESTIONS } from './module6_qcm';
import { MODULE_7_QUESTIONS } from './module7_qcm';
import { MODULE_8_QUESTIONS } from './module8_qcm';
import { FINAL_EXAM_REACT_QUESTIONS } from './finalExamReact';

export const REACT_QUESTIONS_BY_MODULE: Record<ReactModuleId, ReactQuestion[]> = {
  module1: MODULE_1_QUESTIONS,
  module2: MODULE_2_QUESTIONS,
  module3: MODULE_3_QUESTIONS,
  module4: MODULE_4_QUESTIONS,
  module5: MODULE_5_QUESTIONS,
  module6: MODULE_6_QUESTIONS,
  module7: MODULE_7_QUESTIONS,
  module8: MODULE_8_QUESTIONS,
};

export const ALL_REACT_QUESTIONS: ReactQuestion[] = [
  ...MODULE_1_QUESTIONS,
  ...MODULE_2_QUESTIONS,
  ...MODULE_3_QUESTIONS,
  ...MODULE_4_QUESTIONS,
  ...MODULE_5_QUESTIONS,
  ...MODULE_6_QUESTIONS,
  ...MODULE_7_QUESTIONS,
  ...MODULE_8_QUESTIONS,
  ...FINAL_EXAM_REACT_QUESTIONS,
];

export const REACT_QUESTIONS_MAP: Record<string, ReactQuestion> = ALL_REACT_QUESTIONS.reduce((acc, q) => {
  acc[q.id] = q;
  return acc;
}, {} as Record<string, ReactQuestion>);

export { FINAL_EXAM_REACT_QUESTIONS };

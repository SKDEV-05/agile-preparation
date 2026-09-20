import { LabExercise } from '../../types/reactLabTypes';
import { LAB_1_JSX } from './lab1_jsx';
import { LAB_2_PROPS } from './lab2_props';
import { LAB_3_STATE } from './lab3_state';
import { LAB_4_FORMS } from './lab4_forms';
import { LAB_5_EFFECTS } from './lab5_effects';
import { LAB_6_ROUTING } from './lab6_routing';
import { LAB_7_REDUX } from './lab7_redux';
import { LAB_DEBUG_CHALLENGE } from './lab_debug_challenges';

export const ALL_REACT_LABS: LabExercise[] = [
  LAB_1_JSX,
  LAB_2_PROPS,
  LAB_3_STATE,
  LAB_4_FORMS,
  LAB_5_EFFECTS,
  LAB_6_ROUTING,
  LAB_7_REDUX,
  LAB_DEBUG_CHALLENGE
];

export function getLabById(id: string): LabExercise | undefined {
  return ALL_REACT_LABS.find(lab => lab.id === id);
}

export function getLabsByModule(moduleId: string): LabExercise[] {
  return ALL_REACT_LABS.filter(lab => lab.moduleId === moduleId);
}

import { ReactCourseModule, ReactModuleId } from '../../types/reactTypes';
import { MODULE_1 } from './module1_fundamentals';
import { MODULE_2 } from './module2_es6';
import { MODULE_3 } from './module3_react_arch';
import { MODULE_4 } from './module4_components_state';
import { MODULE_5 } from './module5_styles_effects';
import { MODULE_6 } from './module6_routing_tests';
import { MODULE_7 } from './module7_redux_core';
import { MODULE_8 } from './module8_rtk_thunk';

export const REACT_MODULES: ReactCourseModule[] = [
  MODULE_1,
  MODULE_2,
  MODULE_3,
  MODULE_4,
  MODULE_5,
  MODULE_6,
  MODULE_7,
  MODULE_8
];

export const REACT_MODULES_MAP: Record<ReactModuleId, ReactCourseModule> = {
  module1: MODULE_1,
  module2: MODULE_2,
  module3: MODULE_3,
  module4: MODULE_4,
  module5: MODULE_5,
  module6: MODULE_6,
  module7: MODULE_7,
  module8: MODULE_8
};

export { CLASSIC_OFPPT_ERRORS, FRONTEND_GLOSSARY } from './architecture_best_practices';

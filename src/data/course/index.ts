import { CoursePart, PartId } from '../../types';
import { coursePart1 } from './part1';
import { coursePart2 } from './part2';
import { coursePart3 } from './part3';
import { coursePart4 } from './part4';
import { coursePart5 } from './part5';

export const COURSE_PARTS: CoursePart[] = [
  coursePart1,
  coursePart2,
  coursePart3,
  coursePart4,
  coursePart5,
];

export const COURSE_MAP: Record<PartId, CoursePart> = {
  part1: coursePart1,
  part2: coursePart2,
  part3: coursePart3,
  part4: coursePart4,
  part5: coursePart5,
};

export function getCoursePart(partId: PartId): CoursePart {
  return COURSE_MAP[partId] || coursePart1;
}

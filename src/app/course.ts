import { algorithmsAndDataStructuresCourse } from './course-data';
import { Course } from './course.models';

const sourceCourse = algorithmsAndDataStructuresCourse as unknown as Course;

// The original authoring data keeps lesson records compact. Add the stable IDs
// and ordering fields that the standalone router and progress store need.
export const COURSE: Course = {
  ...sourceCourse,
  units: sourceCourse.units.map((unit) => ({
    ...unit,
    lessons: unit.lessons.map((lesson, index) => ({
      ...lesson,
      id: `${unit.id}-l${index + 1}`,
      courseId: sourceCourse.id,
      unitId: unit.id,
      order: index + 1
    }))
  }))
};

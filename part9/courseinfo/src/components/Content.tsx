import type { CoursePart } from "../types";

interface ContentProps {
  courses: CoursePart[];
}

const Content = ({ courses }: ContentProps) => (
  <>
    {courses.map((course) => {
      switch (course.kind) {
        case "basic":
          return (
            <div key={course.name}>
              <div>
                <b>
                  {course.name} {course.exerciseCount}
                </b>
              </div>
              <div>
                <i>{course.description}</i>
              </div>
              <br />
            </div>
          );
        case "group":
          return (
            <div key={course.name}>
              <div>
                <b>
                  {course.name} {course.exerciseCount}
                </b>
              </div>
              <div>project exercises {course.groupProjectCount}</div>
              <br />
            </div>
          );
        case "background":
          return (
            <div key={course.name}>
              <div>
                <b>
                  {course.name} {course.exerciseCount}
                </b>
              </div>
              <i>{course.description}</i>
              <div>submit to {course.backgroundMaterial}</div>
              <br />
            </div>
          );
        case "special":
          return (
            <div key={course.name}>
              <div>
                <b>
                  {course.name} {course.exerciseCount}
                </b>
              </div>
              <i>{course.description}</i>
              <div>require skills: {course.requirements.join(", ")}</div>
              <br />
            </div>
          );
        default:
          return assertNever(course);
      }
    })}
  </>
);

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Content;

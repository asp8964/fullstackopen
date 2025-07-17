const Course = ({ course }) => (
  <div>
    <Header text={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

const Header = ({ text }) => <h2>{text}</h2>;

const Content = ({ parts }) =>
  parts.map((part) => <Part key={part.id} part={part} />);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({ parts }) => (
  <p>
    <b>total of {parts.reduce((s, p) => s + p.exercises, 0)} exercises</b>
  </p>
);

export default Course;

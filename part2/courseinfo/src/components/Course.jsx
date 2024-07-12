const Header = ({ course }) => <h2>{course}</h2>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    console.log(
      `Reducing: accumulator is ${sum}, current element name is ${part.name}, exercises: ${part.exercises}`
    );
    return sum + part.exercises;
  }, 0);

  return <h3>total of {total} exercises </h3>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;

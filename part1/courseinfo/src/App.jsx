const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

function Part(props) {
  return (
    <p>
      {props.name} <span>{props.exercises}</span>
    </p>
  );
}

function Content(props) {
  return (
    <div>
      <Part
        name={props.content[0].name}
        exercises={props.content[0].exercises}
      />
      <Part
        name={props.content[1].name}
        exercises={props.content[1].exercises}
      />
      <Part
        name={props.content[2].name}
        exercises={props.content[2].exercises}
      />
    </div>
  );
}

const Total = (props) => {
  let total = props.content[0].exercises + props.content[1].exercises + props.content[2].exercises
  console.log(total);
  return (
<p><strong>Number of exercises: </strong>{props.content[0].exercises + props.content[1].exercises + props.content[2].exercises}</p>
  )
};

const App = () => {
  const course = "Half Stack application development";
  const content = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  // const part1 = 'Fundamentals of React'
  // const exercises1 = 10
  // const part2 = 'Using props to pass data'
  // const exercises2 = 7
  // const part3 = 'State of a component'
  // const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total content={content} />
      {/* <Content part1={part1} exercises1={exercises1} /> */}
      {/* <h1>{course}</h1>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p> */}
    </div>
  );
};

export default App;

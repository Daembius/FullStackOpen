const Header = (props) => {
  console.log("Header: " + props.course)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  console.log("Part - props: " + props.name + ' ' + props.exercises)
  return (
    <p>
      {props.name}: <span>{props.exercises}</span>
    </p>
  );
}

const Content = (props) => {
  // console.log("Content - props: " + props)
  return (
    <div>
      <Part
        name={props.parts[0].name}
        exercises={props.parts[0].exercises}
      />
      <Part
        name={props.parts[1].name}
        exercises={props.parts[1].exercises}
      />
      <Part
        name={props.parts[2].name}
        exercises={props.parts[2].exercises}
      />
    </div>
  );
}

const Total = (props) => {
  // Just to see how to use it with a variable:
  let total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
  console.log("Total: " + total);
  return (
<p><strong>Number of exercises: </strong>{props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
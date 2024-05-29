const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  console.log(props)
  return (
    <p>
      {props.name}: <span>{props.exercises}</span>
    </p>
  );
}

const Content = (props) => {
  console.log(props)
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
  // Just to see how to use it with a variable:
  let total = props.content[0].exercises + props.content[1].exercises + props.content[2].exercises
  console.log("Total: " + total);
  return (
<p><strong>Number of exercises: </strong>{props.content[0].exercises + props.content[1].exercises + props.content[2].exercises}</p>
  )
};

const App = () => {
  const course = "Half Stack application development";
  // const content = [
  //   {
  //     name: "Fundamentals of React",
  //     exercises: 10,
  //   },
  //   {
  //     name: "Using props to pass data",
  //     exercises: 7,
  //   },
  //   {
  //     name: "State of a component",
  //     exercises: 14,
  //   },
  // ];

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  console.log([part1, part2, part3])
  return (
    <div>
      <Header course={course} />
      <Content content={[part1, part2, part3]} />
      <Total content={[part1, part2, part3]} />

    </div>
  );
};

export default App;
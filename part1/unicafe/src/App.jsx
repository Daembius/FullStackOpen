import { useState } from "react";

const Statistics = (props) => {
  // Refactor your application so that displaying the
  // statistics is extracted into its own Statistics component.
  // The state of the application should remain in the App root component.
  return (
    <div>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.all}</p>
      <p>average {props.average}</p>
      <p>positive {props.positive}</p>
    </div>
  );
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  console.log("good", good, "neutral", neutral, "bad", bad);
  const all = good + neutral + bad;
  const average = !isNaN((good - bad) / all) ? (good - bad) / all : 0;
  const positive = !isNaN((100 * good) / all) ? (100 * good) / all : 0;
  console.log("all", all, "average", average, "positive", positive);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} 
      all={all} average={average} positive={positive} />
    </div>
  );
};

export default App;

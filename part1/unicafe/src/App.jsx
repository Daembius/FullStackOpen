import { useState } from "react";

// extract statistics into its own component
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = all !== 0 ? ((good - bad) / all).toFixed(1) : 0;
  const positive = all !== 0 ? ((100 * good) / all).toFixed(1) : 0;

  console.log("all", all, "average", average, "positive", positive);

  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </div>
  );
};

// Refactor Button component using destructuring
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  console.log("good", good, "neutral", neutral, "bad", bad);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;

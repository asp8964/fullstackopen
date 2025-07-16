import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return <p>No feedback given</p>;
  }

  const all = props.good + props.neutral + props.bad;
  return (
    <table>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={(props.good - props.bad) / all} />
      <StatisticLine text="positive" value={(props.good / all) * 100 + " %"} />
    </table>
  );
};

const StatisticLine = ({ text, value }) => (
  <tbody>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </tbody>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;

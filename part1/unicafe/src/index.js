import { useState } from "react";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td> {props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.statistics.all !== 0) {
    return (
      <table>
        <tbody>
          <Statistic text="good" value={props.statistics.good} />
          <Statistic text="neutral" value={props.statistics.neutral} />
          <Statistic text="bad" value={props.statistics.bad} />
          <Statistic text="all" value={props.statistics.all} />
          <Statistic text="average" value={props.statistics.average} />
          <Statistic text="positive" value={props.statistics.positive} />
        </tbody>
      </table>
    );
  } else {
    return <p> No feedback given </p>;
  }
};

const Button = (props) => {
  return <button onClick={props.handle}>{props.text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => setGood((prevGood) => prevGood + 1);
  const handleClickNeutral = () => setNeutral((prevNeutral) => prevNeutral + 1);
  const handleClickBad = () => setBad((prevBad) => prevBad + 1);

  const stats = {
    good: good,
    bad: bad,
    neutral: neutral,
    all: good + bad + neutral,
    average: (good - bad) / (good + bad + neutral) || 0,
    positive: (good / (good + bad + neutral)) * 100 + "%" || 0
  };

  return (
    <div>
      <h1> give feedback </h1>
      <Button text="good" handle={handleClickGood} />
      <Button text="neutral" handle={handleClickNeutral} />
      <Button text="bad" handle={handleClickBad} />
      <h2> statistics </h2>
      <Statistics statistics={stats} />
    </div>
  );
};
const root = createRoot(rootElement);

root.render(<App />);
import { useState } from "react";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");

const generateRandom = () => {
  return Math.floor(Math.random() * anecdotes.length);
};

const maxValue = (array) => {
  return Math.max.apply(null, array);
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(props.anecdotes.length));
  const [mostVoted, setMostVoted] = useState(anecdotes[0]);
  const copy = [...points];

  const handleNextAnecdote = () => {
    setSelected(generateRandom);
  };

  const handleNewVote = () => {
    copy[selected] += 1;
    setPoints(copy);
    if (copy[selected] >= maxValue(copy))
      setMostVoted(props.anecdotes[selected]);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p> has {copy[selected]} votes</p>
      <button onClick={handleNextAnecdote}>next anecdote</button>
      <button onClick={handleNewVote}>vote</button>
      <h2>Anecdotes with most votes</h2>
      <p>{mostVoted}</p>
    </div>
  );
};

const root = createRoot(rootElement);

root.render(<App anecdotes={anecdotes} />);

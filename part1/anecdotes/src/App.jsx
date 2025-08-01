import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [max, setMax] = useState(0);

  const getRandomInt = () => Math.floor(Math.random() * anecdotes.length);

  // feature: Never duplicate with previous
  // const getRandomAnecdote = function () {
  //   let randomInt = getRandomInt();
  //   while (randomInt === selected) {
  //     randomInt = getRandomInt();
  //   }
  //   setSelected(randomInt);
  // };

  function updateVotes() {
    const copy = [...votes];
    copy[selected] += 1;
    if (copy[selected] >= copy[max]) {
      setMax(selected);
    }
    setVotes(copy);
  }

  return (
    <>
      <Header text="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button onClick={() => updateVotes()} text="vote" />
      <Button
        onClick={() => setSelected(getRandomInt())}
        text="next anecdote"
      />
      {/* <Button onClick={() => getRandomAnecdote()} text="next anecdote" /> */}
      <Header text="Anecdote with most votes" />
      <div>{anecdotes[max]}</div>
      <div>has {votes[max]} votes</div>
    </>
  );
};

export default App;

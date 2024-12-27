import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function MostVoted({voteArray, anecdotes}) {
  const maxIndex = voteArray.indexOf(Math.max(...voteArray));

  return <>
  <h2>Most voted anecdote is: </h2>
  <div> {anecdotes[maxIndex]}</div>
  </>

}
function NextAnecdoteButton({onClick}) {
  return  <button onClick={onClick}>next anecdote</button>
}
function VoteButton({onClick}) {
  return <button onClick={onClick}>vote</button>
}
const App = () => {
  const [selected, setSelected] = useState(0);
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
  const [voteArray, setVoteArray] = useState(new Array(anecdotes.length).fill(0));
  function randomInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }
  function onClickNextAnecdote() {
    setSelected(randomInt(0, anecdotes.length-1));
  }
  function onClickVoteButton() {
    const tempArray = [...voteArray];
    tempArray[selected]++;
    setVoteArray(tempArray);
  }
  
   

  return (
    <>
    <div>
      {anecdotes[selected]} 
      <h2> This anecdote has {voteArray[selected]} votes. </h2>
    </div>
    <VoteButton onClick={onClickVoteButton}> </VoteButton><NextAnecdoteButton onClick={onClickNextAnecdote}></NextAnecdoteButton>
    <MostVoted voteArray={voteArray} anecdotes={anecdotes}></MostVoted>
    </>
  )
}

export default App

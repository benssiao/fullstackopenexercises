import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function Button({title, onClick}) {

  return <button onClick={onClick}>{title}</button>
}

function StatisticLine({title, titleCount}) {
  return <><td>{title}</td> <td>{titleCount}</td></>

}
function Statistics({count, sumArray, averageScore, percentageFeedback}) {
  if (count["good"] === 0 && count["neutral"] == 0 && count["bad"] === 0) {
    return <div>No feedback given</div>
  }
  return (
  <>
    <h1>{"Statistics"}</h1>
    <table>
      <tr><StatisticLine title="good" titleCount={count["good"]}></StatisticLine>  </tr>
      <tr><StatisticLine title="neutral" titleCount={count["neutral"]}></StatisticLine>  </tr>
      <tr><StatisticLine title="bad" titleCount={count["bad"]}></StatisticLine> </tr>
      <tr><StatisticLine title="all" titleCount={sumArray(Object.values(count))}></StatisticLine></tr>
      <tr><StatisticLine title="average" titleCount={averageScore(count)}></StatisticLine></tr>
      <tr><StatisticLine title="positive" titleCount={`${percentageFeedback(count)*100} %`}></StatisticLine></tr>
      </table>
  </>
  )
}

function App() {
  const [count, setCount] = useState({"good":0, "neutral": 0, "bad": 0});

  function onClickGood() {
    setCount({...count, "good": count["good"]+1});
  }

  function onClickNeutral() {
    setCount({...count, "neutral": count["neutral"] + 1});
  }

  function onClickBad() {
    setCount({...count, "bad": count["bad"] + 1});
  }

  function sumArray(array) {  
    return array.reduce((partialSum, a) => partialSum + a);
  }

  function averageScore(count) {
    return (count["good"] - count["bad"])/sumArray(Object.values(count));
  }

  function percentageFeedback(count) {
    return (count["good"])/sumArray(Object.values(count));
  }


  return (
    <>
      <h1>Give feedback</h1>
      <Button title="good" onClick={onClickGood}></Button> 
      <Button title="neutral" onClick={onClickNeutral} ></Button>  
      <Button title="bad" onClick={onClickBad} ></Button> 
      <Button title="reset" onClick={() => {setCount({"good":0, "neutral": 0, "bad": 0})}} > </Button>
      <Statistics count={count} sumArray={sumArray} averageScore={averageScore} percentageFeedback={percentageFeedback}></Statistics>
    </>
  )
}

export default App

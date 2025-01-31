import { useState } from 'react'

function Part({courseName, courseExerciseCount}) {
  return <p>
    {courseName} {courseExerciseCount}
  </p>
}
function Header({course}) {
  return <h1>
    {course}
  </h1>

}

function Content({courseList}) {
  const courses = courseList.map(({name: courseName, exercises: courseExerciseCount}, index) => <Part key={index} courseName = {courseName} courseExerciseCount={courseExerciseCount}></Part>);
  return <>

    {courses}
  </>

}

function Total({courseList}) {
  return <p> Number of exercise {courseList.map(({name: courseName, exercises: courseExerciseCount}) => courseExerciseCount).reduce((sum, curr) => sum+curr)}</p>

}

const App = () => {
  
  
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14
  };

  const parts = [part1, part2, part3];
  const course = {
    courseName: 'Half Stack application development',
    parts: parts
  };

  return (
    <div>
      <Header course={course.courseName}> </Header>
      <Content courseList={course.parts}></Content>
      <Total courseList={course.parts}></Total>
    </div>
  )
}

export default App
import { useState} from "react"

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
    const courses = courseList.map(({name: courseName, exercises: courseExerciseCount, id:id}) => <Part key={id} courseName = {courseName} courseExerciseCount={courseExerciseCount}></Part>);
    return <>
      {courses}
    </>
  
  }
  
  function Total({courseList}) {
    return <p style={{fontWeight: "bold"}}> total of {courseList.map(({name: courseName, exercises: courseExerciseCount}) => courseExerciseCount).reduce((sum, curr) => sum+curr)} exercises</p>
  
  }
  
  function CourseItem({course}) {
    return (
      <div>
      <h1>{course["name"]}</h1>
        <Header course={course.courseName}> </Header>
        <Content courseList={course.parts}></Content>
        <Total courseList={course.parts}></Total>
      </div>
    )
  }
  
  function Course({courses}) {
  
    return courses.map(course => <CourseItem key={course.id} course={course}></CourseItem>)
  
  }

  export default Course
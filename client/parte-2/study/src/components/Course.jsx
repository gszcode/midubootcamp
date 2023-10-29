// eslint-disable-next-line react/prop-types
function Note({ course }) {
  let totalExercises = course.parts.reduce((acc, num) => acc + num.exercises, 0)
  return (
    <div>
      <h2>{course.name}</h2>
      <ul>
        {course.parts.map((i) => (
          <li key={i.name}>
            {i.name} {i.exercises}
          </li>
        ))}
        <b>Total of {totalExercises} exercises</b>
      </ul>
    </div>
  )
}

export default Note

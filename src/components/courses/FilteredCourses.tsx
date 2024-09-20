export const FilteredCourses = ({course}: {course: any}) => {
  return <>
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
    </div>
  </>
}
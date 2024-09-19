import { getFilteredCoursesPublished } from "@/server/Courses"
import { CourseCard } from "@/components/courses/CourseCard"

interface FilteredCoursesProps {
    category?: string
}

export async function FilteredCourses({ category }: FilteredCoursesProps) {
    const courses = await getFilteredCoursesPublished(category)

    return (
        <div className="flex flex-wrap gap-5 p-5">
            {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    )
}
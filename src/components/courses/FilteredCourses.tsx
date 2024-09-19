import { getFilteredCoursesPublished } from "@/server/Courses"
import { CourseCard } from "@/components/courses/CourseCard"
import { NoCoursesFind } from "./NoCoursesFind"

interface FilteredCoursesProps {
    category?: string
    search?: string
}

export async function FilteredCourses({ category, search }: FilteredCoursesProps) {
    const courses = await getFilteredCoursesPublished(category, search)

    return (
        <div className="flex flex-wrap gap-5 p-5">
            {courses.length === 0 ? <NoCoursesFind /> : courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    )
}
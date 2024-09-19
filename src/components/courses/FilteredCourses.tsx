import { getFilteredCoursesPublished } from "@/server/Courses"
import { CourseCard } from "@/components/courses/CourseCard"

interface FilteredCoursesProps {
    category?: string
    search?: string
}

export async function FilteredCourses({ category, search }: FilteredCoursesProps) {
    const courses = await getFilteredCoursesPublished(category, search)

    return (
        <div className="flex flex-wrap gap-5 p-5">
            {courses.length === 0 ? <div className="text-center flex items-center justify-center text-gray-500">No courses found</div> : courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    )
}
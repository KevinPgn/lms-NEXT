import { HeadersHome } from "@/features/headers/HeadersHome";
import { SidebarHome } from "@/features/sidebar/SidebarHome";
import { getSession } from "@/components/utils/CacheSession";
import { Categories } from "@/components/categories/Categories";
import { getCoursesPublished } from "@/server/Courses";
import { CourseCard } from "@/components/courses/CourseCard";

export default async function Home() {
  const session = await getSession()
  const courses = await getCoursesPublished()

  return (
    <div className="flex">
      <SidebarHome />

      <main className="flex flex-col flex-1">
        <HeadersHome session={session} />
        <Categories />
        <div className="flex flex-wrap gap-5 p-5">
          {courses.map((course: any) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
    </div>
  );
}

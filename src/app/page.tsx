import { SidebarHome } from "@/features/sidebarHome/SidebarHome";
import { getSession } from "@/components/utils/CacheSession";
import { Headers } from "@/components/headers/Headers";
import { Categories } from "@/components/categories/Categories";
import {getCourses} from "@/server/Courses"
import { Course } from "@/components/courses/Course";

export default async function Home({searchParams}: {searchParams: {category: string}}) {
  const session = await getSession()
  const courses = await getCourses(searchParams.category)

  return (
    <section className="flex">
      <SidebarHome />

      <main className="flex-1">
        <Headers session={session}/>
        <div className="flex flex-col gap-4 p-3 mt-2">
          <Categories />
          {courses.length === 0 ? (
            <p className="text-center text-gray-500">No courses found</p>
          ) : (
            <div className="flex flex-wrap gap-4">
              {courses.map((course) => (
                <Course key={course.id} course={course} session={session}/>
              ))}
            </div>
          )}
        </div>
      </main>
    </section>    
  );
}

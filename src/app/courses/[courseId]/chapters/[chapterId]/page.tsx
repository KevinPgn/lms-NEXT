import { getSession } from "@/components/utils/CacheSession";
import { Headers } from "@/components/headers/Headers";
import { SidebarCourse } from "@/features/sidebarCourse/SidebarCourse";
export const revalidate = 3600
export const metadata = {
  title: "Course",
  description: "Course page",
}

import { getCourseId } from "@/server/Courses";

interface CoursePageWithChaptersProps {
    params: {
        courseId: string
        chapterId: string
    }
}

export default async function CoursePageWithChapters({params}: CoursePageWithChaptersProps) {
  const session = await getSession()
  const course = await getCourseId(params.courseId)

    return (
    <section className="flex">
      <SidebarCourse courseName={course?.title ?? ""}/>

      <main className="flex-1">
        <Headers session={session}/>

      </main>
    </section>    
  );
}

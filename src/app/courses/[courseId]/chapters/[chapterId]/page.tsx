import { getSession } from "@/components/utils/CacheSession";
import { Headers } from "@/components/headers/Headers";
import { SidebarCourse } from "@/features/sidebarCourse/SidebarCourse";
export const revalidate = 3600
export const metadata = {
  title: "Course",
  description: "Course page",
}

import { getCourseId } from "@/server/Courses";
import { getChapterById } from "@/server/Chapters";
import { CourseSuivi } from "@/components/courseSuivi/CourseSuivi";

interface CoursePageWithChaptersProps {
    params: {
        courseId: string
        chapterId: string
    }
}

export default async function CoursePageWithChapters({params}: CoursePageWithChaptersProps) {
  const session = await getSession()
  const course = await getCourseId(params.courseId)
  const chapter = await getChapterById({chapterId: params.chapterId})

    return (
    <section className="flex">
      <SidebarCourse courseName={course?.title ?? ""} courseId={course?.id ?? ""} courseChapters={course?.chapters ?? []} isPurchased={course?.isPurchased ?? false} />

      <main className="flex-1">
        <Headers session={session}/>

        <CourseSuivi chapterData={chapter} />
      </main>
    </section>    
  );
}

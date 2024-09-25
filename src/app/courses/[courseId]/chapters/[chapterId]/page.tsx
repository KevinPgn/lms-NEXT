import { getSession } from "@/components/utils/CacheSession";
import { Headers } from "@/components/headers/Headers";
import { SidebarCourse } from "@/features/sidebarCourse/SidebarCourse";
export const revalidate = 3600
export const metadata = {
  title: "Course",
  description: "Course page",
}
import prisma from "@/lib/prisma";

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

  const userProgress = await prisma.userProgress.findUnique({
    where: {
      userId_courseId_chapterId: {
        userId: session?.user?.id ?? '',
        courseId: params.courseId,
        chapterId: params.chapterId
      }
    }
  });

  const isCompleted = !!userProgress?.isCompleted;
  const isPurchased = course?.isPurchased ?? false;

  return (
    <section className="flex">
      <SidebarCourse 
        courseName={course?.title ?? ""} 
        courseId={course?.id ?? ""} 
        courseChapters={course?.chapters ?? []} 
        isPurchased={isPurchased}
        completedChapters={course?.chapters.filter(c => c.userProgress.length > 0).map(c => c.id) ?? []}
      />

      <main className="flex-1">
        <Headers session={session}/>

        <CourseSuivi 
          courseId={course?.id ?? ""} 
          chapterData={chapter} 
          isPurchased={isPurchased}
          isCompleted={isCompleted}
        />
      </main>
    </section>    
  );
}

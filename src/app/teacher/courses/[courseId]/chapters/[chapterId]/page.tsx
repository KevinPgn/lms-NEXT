import { SidebarTeacher } from '@/features/sidebarTeacher/SidebarTeacher'
import { TriangleAlert } from 'lucide-react'
import React from 'react'
import { getSession } from '@/components/utils/CacheSession'
import { getCourseById } from '@/server/Courses'
import { Headers } from '@/components/headers/Headers'
import { BackBtn } from '@/components/teacherChapters/BackBtn'

interface ChapterIdPageProps {
    params: {
        courseId: string
        chapterId: string
    }
}

const ChapterIdPage: React.FC<ChapterIdPageProps> = async ({ params }) => {
    const { courseId, chapterId } = params
    const session = await getSession()

    const course = await getCourseById({courseId})
    return (
        <section className="flex">
        <SidebarTeacher />
    
        <main className="flex-1">
          <Headers session={session}/>
          {!course?.data?.published ? (
            <div className='flex items-center bg-yellow-100 text-yellow-800 p-5 gap-2'>
              <TriangleAlert className='w-4 h-4' />
              <span className='text-sm'>This course is unpublished. It will not be visible to the students.</span>
            </div>
          ) : null}
          <BackBtn />
        </main>
      </section> 
  )
}

export default ChapterIdPage
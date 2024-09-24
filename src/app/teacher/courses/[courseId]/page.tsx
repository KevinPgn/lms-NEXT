import React from 'react'
import { SidebarTeacher } from '@/features/sidebarTeacher/SidebarTeacher'
import { Headers } from '@/components/headers/Headers'
import { getSession } from '@/components/utils/CacheSession'
import { getCourseById } from '@/server/Courses'
import {TriangleAlert} from "lucide-react"
import { CourseInformations } from '@/components/teacherCourseDetail/CourseInformations'

interface CoursePageProps {
    params: {
        courseId: string
    }
}

const CoursePage = async ({params}: CoursePageProps) => {
  const session = await getSession()
  const {courseId} = params
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

      <CourseInformations course={course?.data} courseId={courseId}/>
    </main>
  </section>  
  )
}

export default CoursePage
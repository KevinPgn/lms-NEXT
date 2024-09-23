import React from 'react'
import { SidebarTeacher } from '@/features/sidebarTeacher/SidebarTeacher'
import { Headers } from '@/components/headers/Headers'
import { getSession } from '@/components/utils/CacheSession'
import { getCourseById } from '@/server/Courses'

interface CoursePageProps {
    params: {
        courseId: string
    }
}

const CoursePage = async ({params}: CoursePageProps) => {
  const session = await getSession()
  const course = await getCourseById({courseId: params.courseId})

  return (
    <section className="flex">
    <SidebarTeacher />

    <main className="flex-1">
      <Headers session={session}/>
      

    </main>
  </section>  
  )
}

export default CoursePage
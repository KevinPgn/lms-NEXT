import { SidebarTeacher } from '@/features/sidebarTeacher/SidebarTeacher'
import React from 'react'
import { Headers } from '@/components/headers/Headers'
import { getSession } from '@/components/utils/CacheSession'

export const revalidate = 300 // 5 minutes

export const metadata = {
  title: "Teacher Courses",
  description: "Teacher Courses page",
}

const TeacherCoursesPage = async () => {
  const session = await getSession()

  return (
    <section className="flex">
      <SidebarTeacher />

      <main className="flex-1">
        <Headers session={session}/>
      </main>
    </section>    
  )
}

export default TeacherCoursesPage
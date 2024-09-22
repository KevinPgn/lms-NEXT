import { SidebarTeacher } from '@/features/sidebarTeacher/SidebarTeacher'
import React from 'react'
import { Headers } from '@/components/headers/Headers'
import { getSession } from '@/components/utils/CacheSession'

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
import React from 'react'
import { SidebarTeacher } from '@/features/sidebarTeacher/SidebarTeacher'
import { Headers } from '@/components/headers/Headers'
import { getSession } from '@/components/utils/CacheSession'

const CoursePage = async () => {
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

export default CoursePage
import React from 'react'
import { getPurchasesCourse } from '@/server/Courses'
import { SidebarHome } from '@/features/sidebarHome/SidebarHome'
import { Headers } from '@/components/headers/Headers'
import { Course } from '@/components/courses/Course'
import { getSession } from '@/components/utils/CacheSession'
import { HeaderDashboard } from '@/components/dashboard/HeaderDashboard'

export const metadata = {
  title: "Dashboard",
  description: "Dashboard page",
}

const DashboardPage = async () => {
  const session = await getSession()
  const purchasesCoursesResult = await getPurchasesCourse({})
  const purchasesCourses = purchasesCoursesResult?.data || []

  return (
    <section className="flex">
      <SidebarHome />

      <main className="flex-1">
        <Headers session={session}/>
        <HeaderDashboard />
        <div className="flex flex-col gap-4 p-3 mt-2">
          {purchasesCourses.length === 0 ? (
            <p className="text-center text-gray-500">No courses found</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-8">
              {purchasesCourses.map((course) => (
                <Course key={course.id} course={course} session={session}/>
              ))}
            </div>
          )}
        </div>
      </main>
    </section>    
  )
}

export default DashboardPage
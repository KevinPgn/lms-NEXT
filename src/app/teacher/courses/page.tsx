import { SidebarTeacher } from '@/features/sidebarTeacher/SidebarTeacher'
import React from 'react'
import { Headers } from '@/components/headers/Headers'
import { getSession } from '@/components/utils/CacheSession'
import { getCreatedCourses } from '@/server/Courses'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Ellipsis } from 'lucide-react'
export const revalidate = 300 // 5 minutes

export const metadata = {
  title: "Teacher Courses",
  description: "Teacher Courses page",
}

const TeacherCoursesPage = async () => {
  const session = await getSession()
  const courses = await getCreatedCourses({})

  return (
    <section className="flex">
      <SidebarTeacher />

      <main className="flex-1">
        <Headers session={session}/>
        <div className='p-5'>
            <Table className='border border-gray-200 dark:border-zinc-700'>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[800px]">Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
            </TableRow>
            </TableHeader>
                <TableBody>
                    {courses && courses?.data?.map((course) => (
                        <TableRow key={course.id}>
                            <TableCell>{course.title}</TableCell>
                            <TableCell>{course.price === 0 ? 'Free' : `$${course.price}`}</TableCell>
                            <TableCell>{course.published ? 'Published' : 'Draft'}</TableCell>
                            <TableCell>
                                <Ellipsis className='w-4 h-4 cursor-pointer' />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
      </main>
    </section>    
  )
}

export default TeacherCoursesPage
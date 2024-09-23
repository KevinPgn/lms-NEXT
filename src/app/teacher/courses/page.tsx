import { SidebarTeacher } from '@/features/sidebarTeacher/SidebarTeacher'
import React from 'react'
import { Headers } from '@/components/headers/Headers'
import { getSession } from '@/components/utils/CacheSession'
import { getCreatedCourses } from '@/server/Courses'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Ellipsis } from '@/components/teacherCourses/Ellipsis'
import { SearchBarTeacher } from '@/components/teacherCourses/SearchBarTeacher'
import { BtnNewCourses } from '@/components/teacherCourses/BtnNewCourses'

export const revalidate = 300 // 5 minutes

export const metadata = {
  title: "Teacher Courses",
  description: "Teacher Courses page",
}

const TeacherCoursesPage = async ({searchParams}: {searchParams: {search: string}}) => {
  const session = await getSession()
  const courses = await getCreatedCourses({search: searchParams.search})

  return (
    <section className="flex">
      <SidebarTeacher />

      <main className="flex-1">
        <Headers session={session}/>
        <div className='flex justify-between items-center p-5'>
          <SearchBarTeacher />
          <BtnNewCourses />
        </div>
        <div className='p-5'>
            <Table className='border border-gray-200 dark:border-zinc-700'>
        <TableCaption>A list of your recents courses.</TableCaption>
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
                            <TableCell>{course.published ? <span className='bg-blue-500 hover:bg-blue-600 cursor-pointer duration-75 text-white text-xs px-2 py-1 rounded-md'>Published</span> : <span className='bg-red-500 hover:bg-red-600 cursor-pointer duration-75 text-white text-xs px-2 py-1 rounded-md'>Draft</span>}</TableCell>
                            <TableCell>
                                <Ellipsis courseId={course.id} />
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
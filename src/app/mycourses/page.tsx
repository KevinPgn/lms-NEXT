import React from 'react'
import { getInstructorCourses } from '@/server/Courses'
import { FilteredCourses } from '@/components/courses/FilteredCourses'
import { NoCoursesFind } from '@/components/courses/NoCoursesFind'
import { SearchBar } from '@/components/courses/SearchBar'
import { CategoriesMyCourses } from '@/components/courses/CategoriesMyCourses'

export const metadata = {
    title: "My Courses",
    description: "Browse all your courses"
}

const MyCoursesPage = async ({searchParams}: {searchParams: {category: string}}) => {
  const result = await getInstructorCourses({category: searchParams.category})
  const resultData = result?.data

  return (
    <section className='p-5'>
      <SearchBar />
      <CategoriesMyCourses />
      <main >
        <h1 className='text-2xl font-bold mb-5'>Total Courses in {searchParams.category ? searchParams.category : 'total'}: {resultData?.totalCount}</h1>
        <div className='flex flex-wrap gap-5'>
          {resultData?.courses && resultData?.courses.length > 0 ? resultData?.courses.map((course: any) => (
            <FilteredCourses key={course.id} course={course} />
          )) : <NoCoursesFind />}
        </div>
      </main>

    </section>
  )


}

export default MyCoursesPage
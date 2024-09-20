import { Categories } from '@/components/courses/Categories'
import { FilteredCourses } from '@/components/courses/FilteredCourses'
import { SearchBar } from '@/components/courses/SearchBar'
import React from 'react'
import { getFilteredCourses } from '@/server/Courses'

export const metadata = {
  title: "Courses",
  description: "Browse all courses"
}

const CoursesPage = async ({searchParams}: {searchParams: {category: string}}) => {
  const {courses, totalCount} = await getFilteredCourses(searchParams.category)
  
  return (
    <section className='p-5'>
      <SearchBar />
      <Categories />
      <main>
        <h1 className='text-2xl font-bold mb-5'>Total Courses: {totalCount}</h1>
        {courses.map((course: any) => (
          <FilteredCourses key={course.id} course={course} />
        ))}
      </main>
    </section>
  )
}

export default CoursesPage
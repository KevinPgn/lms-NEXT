import { Categories } from '@/components/courses/Categories'
import { FilteredCourses } from '@/components/courses/FilteredCourses'
import { SearchBar } from '@/components/courses/SearchBar'
import React from 'react'

export const metadata = {
  title: "Courses",
  description: "Browse all courses"
}

const CoursesPage = ({searchParams}: {searchParams: {category: string}}) => {
  
  return (
    <section className='p-5'>
      <SearchBar />
      <Categories />
      <main>
        <FilteredCourses category={searchParams.category} />
      </main>
    </section>
  )
}

export default CoursesPage
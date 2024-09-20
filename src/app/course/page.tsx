import { Categories } from '@/components/courses/Categories'
import { SearchBar } from '@/components/courses/SearchBar'
import React from 'react'

export const metadata = {
  title: "Courses",
  description: "Browse all courses"
}

const CoursesPage = () => {
  return (
    <section className='p-5'>
      <SearchBar />
      <Categories />
    </section>
  )
}

export default CoursesPage
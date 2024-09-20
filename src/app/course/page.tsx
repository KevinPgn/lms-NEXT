import { Categories } from '@/components/courses/Categories'
import React from 'react'

export const metadata = {
  title: "Courses",
  description: "Browse all courses"
}

const CoursesPage = () => {
  return (
    <section>
      <Categories />
    </section>
  )
}

export default CoursesPage
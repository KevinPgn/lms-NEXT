"use client"
import {Button} from "@/components/ui/button"
import { enrollCourse } from "@/server/Courses"

export const EnrolledCourse = ({courseId}: {courseId: string}) => {
  return <>
  <Button variant="outline" onClick={
    async () => {
      const test = await enrollCourse({courseId})
      console.log("Enrolled the course", test)
    }
  }>
    Enrolled the course
  </Button>
  </>
}
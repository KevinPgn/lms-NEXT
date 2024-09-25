"use client"
import {Button} from "@/components/ui/button"
import { enrollCourse } from "@/server/Courses"

export const EnrolledCourse = ({courseId}: {courseId: string}) => {
  return <>
  <Button variant="outline" onClick={async () => await enrollCourse({courseId})}>
    Enrolled the course
  </Button>
  </>
}
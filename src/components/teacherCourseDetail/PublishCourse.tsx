"use client"
import {Button} from "@/components/ui/button"
import {publishCourse} from "@/server/Courses"
import {toast} from "react-toastify"

export const PublishCourse = ({courseId, published, completedFields}: {courseId: string, published: boolean, completedFields: number}) => {
  return <>
    <Button
    onClick={() => {
      publishCourse({courseId, published: !published})
      toast.success("Course published successfully")
    }}
    variant="outline" disabled={published || completedFields !== 6}>Publish</Button>
  </>
}
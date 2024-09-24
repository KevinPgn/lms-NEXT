"use client"
import {Button} from "@/components/ui/button"
import {publishChapter} from "@/server/Chapters"
import {toast} from "react-toastify"

export const PublishChapter = ({chapterId, isPublished}: {chapterId: string, isPublished: boolean}) => {
  return <>
    <Button
    onClick={async () => {
      const response = await publishChapter({chapterId, isPublished: !isPublished})
      toast.success(isPublished ? "Chapter unpublished successfully" : "Chapter published successfully")
      console.log(response)
    }}
    variant="outline" disabled={isPublished}>{isPublished ? "Unpublish" : "Publish"}</Button>
  </>
}
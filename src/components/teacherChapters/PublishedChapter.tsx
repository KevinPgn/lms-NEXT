"use client"
import {Button} from "@/components/ui/button"
import {publishChapter} from "@/server/Chapters"
import {toast} from "react-toastify"

export const PublishChapter = ({chapterId, isPublished, completedFields}: {chapterId: string, isPublished: boolean, completedFields: number}) => {
  return <>
    <Button
    onClick={async () => {
      await publishChapter({chapterId, isPublished: !isPublished})
      toast.success(isPublished ? "Chapter unpublished successfully" : "Chapter published successfully")
    }}
    variant="outline" disabled={isPublished || completedFields !== 2}>{isPublished ? "Unpublish" : "Publish"}</Button>
  </>
}
"use client"
import { Button } from "@/components/ui/button"
import { Plus, GripVerticalIcon, PencilLine, Trash } from "lucide-react"
import { createChapter, deleteChapter } from "@/server/Chapters"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const ChaptersForm = ({ courseId, courseChapters }: { courseId: string, courseChapters: any }) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState<{ [key: string]: boolean }>({})
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async (chapterId: string) => {
    setIsDeleting(prev => ({ ...prev, [chapterId]: true }))
    setError(null)
    try {
      await deleteChapter({ chapterId })
      // Optionally, you can trigger a revalidation or update local state
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Failed to delete the chapter.")
    } finally {
      setIsDeleting(prev => ({ ...prev, [chapterId]: false }))
    }
  }

  return (
    <div className="w-full p-4 bg-[#F4F4F4] dark:bg-transparent dark:border dark:border-gray-700 rounded-md mt-7">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">Course Chapters</span>
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => createChapter({ courseId })}
        >
          <Plus className="w-4 h-4" />
          Add a Chapter
        </Button>
      </div>
      <div>
        {error && <span className="text-sm text-red-500">{error}</span>}
        {courseChapters?.length ? (
          courseChapters.map((chapter: any) => (
            <div
              key={chapter.id}
              className="flex items-center justify-between p-3 bg-[#e3e7ec] dark:bg-gray-800 rounded-md mt-2"
            >
              <div className="flex items-center gap-2">
                <GripVerticalIcon size={20} className="cursor-grab" />
                <span className="text-md font-normal">{chapter.title}</span>
              </div>
              <div className="flex items-center gap-5">
                {chapter.isPublished ? (
                  <span className="bg-green-500 text-xs text-white px-2 py-1 rounded-full">Published</span>
                ) : (
                  <span className="bg-gray-500 text-xs text-white px-2 py-1 rounded-full">Draft</span>
                )}
                <PencilLine
                  onClick={() => router.push(`/teacher/courses/${courseId}/chapters/${chapter.id}`)}
                  size={20}
                  className="cursor-pointer"
                />
                <Trash
                  onClick={() => handleDelete(chapter.id)}
                  size={20}
                  className={`cursor-pointer ${isDeleting[chapter.id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
              </div>
            </div>
          ))
        ) : (
          <span className="text-sm text-gray-500 mt-2">No chapters</span>
        )}
      </div>
    </div>
  )
}
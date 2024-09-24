"use client"
import { Button } from "@/components/ui/button"
import {Plus, GripVerticalIcon, PencilLine, Trash} from "lucide-react"
import { createChapter } from "@/server/Chapters"

export const ChaptersForm = ({courseId, courseChapters}: {courseId: string, courseChapters: any}) => {
  return <div className="w-full p-4 bg-[#F4F4F4] dark:bg-transparent dark:border dark:border-gray-700 rounded-md mt-7">
    <div className="flex items-center justify-between">
      <span className="text-lg font-bold">Course Chapters</span>
      <Button variant="ghost" className="flex items-center gap-2" onClick={() => createChapter({courseId})}>
        <Plus className="w-4 h-4" />
        Add a Chapter   
      </Button>
    </div>
    <div>      
      {courseChapters?.length ? (
        courseChapters.map((chapter: any) => (
          <div key={chapter.id} className="flex items-center justify-between p-3 bg-[#e3e7ec] dark:bg-gray-800 rounded-md mt-2">
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
              <PencilLine size={20} className="cursor-pointer" />
              <Trash size={20} className="cursor-pointer" />
            </div>
          </div>
        ))
      ) : (
        <span className="text-sm text-gray-500 mt-2">No chapters</span>
      )}
    </div>
  </div>
}
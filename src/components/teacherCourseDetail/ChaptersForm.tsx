"use client"
import { Button } from "@/components/ui/button"
import {Plus} from "lucide-react"

export const ChaptersForm = ({courseId}: {courseId: string}) => {

  return <div className="w-full p-4 bg-[#F4F4F4] dark:bg-transparent dark:border dark:border-gray-700 rounded-md mt-7">
    <div className="flex items-center justify-between">
      <span className="text-lg font-bold">Course Chapters</span>
      <Button variant="ghost" className="flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Add a Chapter   
      </Button>
    </div>
  </div>
}
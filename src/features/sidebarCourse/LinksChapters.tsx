"use client"
import {Video, Lock} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export const LinksChapters = ({courseChapters, courseId, isPurchased}: {courseChapters: any, courseId: string, isPurchased: boolean}) => {
  const pathname = usePathname()

  return <div className="flex flex-col gap-y-3">
    {courseChapters.map((chapter: any) => (
      <Link 
        className={cn(
          "flex items-center gap-x-2 p-4 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-800 relative", 
          {
            "bg-gray-50 dark:bg-zinc-800": pathname === `/courses/${courseId}/chapters/${chapter.id}`
          }
        )} 
        key={chapter.id} 
        href={`/courses/${courseId}/chapters/${chapter.id}`}
      >
        {(chapter.freePreview || isPurchased) && <Video size={20} className="text-zinc-500"/>}
        {!chapter.freePreview && !isPurchased && <Lock size={20} className="text-zinc-500"/>}
        <span className="text-md">{chapter.title}</span>
        {pathname === `/courses/${courseId}/chapters/${chapter.id}` && (
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-black dark:bg-white" />
        )}
      </Link>
    ))}
  </div>
}
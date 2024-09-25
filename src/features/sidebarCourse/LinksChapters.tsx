"use client"
import {Video, Lock} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export const LinksChapters = ({courseChapters, courseId, isPurchased}: {courseChapters: any, courseId: string, isPurchased: boolean}) => {
  const pathname = usePathname()

  return  <div className="flex flex-col gap-y-3">
  {courseChapters.map((chapter: any) => {
    const isAccessible = chapter.freePreview || isPurchased
    const commonClasses = cn(
      "flex items-center gap-x-2 p-4 rounded-md relative",
      {
        "bg-gray-50 dark:bg-zinc-800": pathname === `/courses/${courseId}/chapters/${chapter.id}`,
        "hover:bg-gray-50 dark:hover:bg-zinc-800": isAccessible,
        "cursor-not-allowed opacity-60": !isAccessible
      }
    )

    const content = (
      <>
        {isAccessible ? (
          <Video size={20} className="text-zinc-500" />
        ) : (
          <Lock size={20} className="text-zinc-500" />
        )}
        <span className="text-md">{chapter.title}</span>
        {pathname === `/courses/${courseId}/chapters/${chapter.id}` && (
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-black dark:bg-white" />
        )}
      </>
    )

    return isAccessible ? (
      <Link
        key={chapter.id}
        href={`/courses/${courseId}/chapters/${chapter.id}`}
        className={commonClasses}
      >
        {content}
      </Link>
    ) : (
      <div key={chapter.id} className={commonClasses}>
        {content}
      </div>
    )
  })}
</div>
}
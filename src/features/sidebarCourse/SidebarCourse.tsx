import Link from "next/link"
import { LinksChapters } from "./LinksChapters"

export const SidebarCourse = ({courseName, courseId, courseChapters}: {courseName: string, courseId: string, courseChapters: any}) => {
  return <div className="w-80 h-screen sticky top-0 border-r border-gray-200 dark:border-zinc-800">
    <h1 className="text-xl p-5 font-semibold">{courseName}</h1>

    <LinksChapters courseChapters={courseChapters} courseId={courseId}/>
  </div>
}
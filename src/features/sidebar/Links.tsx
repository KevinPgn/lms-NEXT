"use client"
import {Sparkles, CircleArrowUp, Monitor, Zap, Users2} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Links = ({session}: {session: any}) => {
  const pathname = usePathname()    

  return <div className="flex flex-col gap-2 mt-5 mb-10">
    <Link href="/" className={`flex items-center gap-2 text-md text-black dark:text-white p-2 px-5 rounded-md hover:bg-gray-100 duration-75 dark:hover:bg-white/10 ${pathname === "/" ? "bg-gray-100 dark:bg-white/10 dark:text-white" : ""}`}>
        <CircleArrowUp className={`w-5 h-5 text-gray-500 ${pathname === "/" ? "text-black dark:text-white" : ""}`} />
        Overview
    </Link>

    <Link href="/course" className={`flex items-center gap-2 text-md text-black dark:text-white p-2 px-5 rounded-md hover:bg-gray-100 duration-75 dark:hover:bg-white/10 ${pathname === "/course" ? "bg-gray-100 dark:bg-white/10 dark:text-white" : ""}`}>
        <Sparkles className={`w-5 h-5 text-gray-500 ${pathname === "/course" ? "text-black dark:text-white" : ""}`} />
        Course
    </Link>

    {session ? (
    <>
    <Link href="/mycourses" className={`flex items-center gap-2 text-md text-black dark:text-white p-2 px-5 rounded-md hover:bg-gray-100 duration-75 dark:hover:bg-white/10 ${pathname === "/mycourses" ? "bg-gray-100 dark:bg-white/10 dark:text-white" : ""}`}>
        <Monitor className={`w-5 h-5 text-gray-500 ${pathname === "/mycourses" ? "text-black dark:text-white" : ""}`} />
        My Courses
    </Link>

    <Link href="/learningprogress" className={`flex items-center gap-2 text-md text-black dark:text-white p-2 px-5 rounded-md hover:bg-gray-100 duration-75 dark:hover:bg-white/10 ${pathname === "/learningprogress" ? "bg-gray-100 dark:bg-white/10 dark:text-white" : ""}`}>
        <Zap className={`w-5 h-5 text-gray-500 ${pathname === "/learningprogress" ? "text-black dark:text-white" : ""}`} />
        Learning Progress
    </Link>
    </>
    ): null}

    <Link href="/community" className={`flex items-center gap-2 text-md text-black dark:text-white p-2 px-5 rounded-md hover:bg-gray-100 duration-75 dark:hover:bg-white/10 ${pathname === "/community" ? "bg-gray-100 dark:bg-white/10 dark:text-white" : ""}`}>
        <Users2 className={`w-5 h-5 text-gray-500 ${pathname === "/community" ? "text-black dark:text-white" : ""}`} />
        Community
    </Link>
  </div>
}
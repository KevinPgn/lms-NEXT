import Link from "next/link"

export const SidebarCourse = ({courseName}: {courseName: string}) => {
  return <div className="w-80 h-screen sticky top-0 border-r border-gray-200 dark:border-zinc-800">
    <h1 className="text-2xl font-bold">{courseName}</h1>
  </div>
}
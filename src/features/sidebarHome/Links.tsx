"use client"
import Link from "next/link"
import {cn} from "@/lib/utils"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Compass } from "lucide-react"

export const Links = () => {
  const pathname = usePathname()
  
  return <div className="flex flex-col gap-2 mt-5">
    <Link href="/dashboard" className={cn("p-4 text-gray-700 flex items-center gap-2 px-5 duration-75 hover:bg-gray-100 dark:hover:bg-zinc-800", pathname === "/dashboard" && "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-zinc-800 font-semibold relative after:absolute after:right-0 after:top-0 after:w-1 after:h-full after:bg-blue-700")}>
      <LayoutDashboard size={20} />
      <span>Dashboard</span>
    </Link>

    <Link href="/" className={cn("p-4 flex items-center gap-2 px-5 duration-75 hover:bg-gray-100 dark:hover:bg-zinc-800", pathname === "/" && "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-zinc-800 font-semibold relative after:absolute after:right-0 after:top-0 after:w-1 after:h-full after:bg-blue-700")}>
      <Compass size={20} />
      <span>Browse</span>
    </Link>
  </div>
}
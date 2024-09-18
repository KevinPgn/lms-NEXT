"use client"
import Link from "next/link"
import { LayoutDashboard, Compass } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export const Links = () => {
  const pathname = usePathname()
  return <div className="flex flex-col gap-2 mt-5">
    <Link href="/dashboard" className={cn("flex text-gray-500 hover:bg-blue-100 hover:text-blue-700 duration-75 relative items-center gap-2 px-4 py-4", pathname === "/dashboard" && "bg-blue-100 after:absolute after:right-0 after:top-0 after:w-[5px] after:h-full after:bg-blue-700 after:z-[1] text-blue-700")}>
      <LayoutDashboard size={22} />
      <span className="font-medium text-md">Dashboard</span>
    </Link>

    <Link href="/browse" className={cn("flex text-gray-500 hover:bg-blue-100 hover:text-blue-700 duration-75 relative items-center gap-2 px-4 py-4", pathname === "/browse" && "bg-blue-100 after:absolute after:right-0 after:top-0 after:w-[5px] after:h-full after:bg-blue-700 after:z-[1] text-blue-700")}>
      <Compass size={22} />
      <span className="font-medium text-md">Browse</span>
    </Link>
  </div>
}
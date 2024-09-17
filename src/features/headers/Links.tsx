"use client"
import Link from "next/link"
import {Home} from "lucide-react"
import { usePathname } from "next/navigation"

export const Links = () => {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return <div className="flex bg-[#0f0f11] rounded-2xl py-1 px-2 w-fit items-center gap-4">
    <Link href="/" className={`flex p-2 px-4 hover:bg-black duration-75 rounded-lg items-center gap-2 ${isActive("/") ? "bg-black" : ""}`}>
        <Home className="w-5 h-5 text-white cursor-pointer" />
        <span className="text-white text-sm font-semibold cursor-pointer">Home</span>
    </Link>
    <Link href="/pricing" className={`flex p-2 px-4 hover:bg-black duration-75 rounded-lg items-center gap-2 ${isActive("/pricing") ? "bg-black" : ""}`}>
        <span className="text-white text-sm font-semibold cursor-pointer">Pricing</span>
    </Link>
    <Link href="/explore" className={`flex p-2 px-4 hover:bg-black duration-75 rounded-lg items-center gap-2 ${isActive("/explore") ? "bg-black" : ""}`}>
        <span className="text-white text-sm font-semibold cursor-pointer">Explore</span>
    </Link>
  </div>
}
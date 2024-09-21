"use client"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export const SearchBar = () => {
  return <div className="flex items-center gap-2 p-0.5 bg-gray-100 dark:bg-zinc-800 px-5 w-[340px] max-md:w-full rounded-full">
    <Search size={20} className="text-gray-500"/>
    <Input type="text" placeholder="Search for a course" className="border-none shadow-none bg-transparent" />
  </div>


}
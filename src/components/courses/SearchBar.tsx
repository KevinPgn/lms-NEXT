"use client"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export const SearchBar = () => {
  return <div className="flex items-center gap-2 w-[300px] max-md:w-full border border-gray-200 dark:border-gray-800 rounded-lg p-1 px-3">
    <Search size={20}/>
    <Input placeholder="Search" className="border-none bg-transparent"/>
  </div>
}
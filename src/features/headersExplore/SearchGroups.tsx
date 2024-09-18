"use client"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
export const SearchGroups = () => {
  return <div className="flex items-center text-white/70 justify-center w-[500px] py-2 px-5 mt-8 rounded-3xl border border-white/10 gap-2">
    <Search size={20} className="text-white/70"/>
    <Input placeholder="Search for anything" className="border-none outline-none bg-transparent"/>
  </div>
}
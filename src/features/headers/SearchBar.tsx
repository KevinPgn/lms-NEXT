"use client"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const SearchBar = () => {
  const router = useRouter()
  const [search, setSearch] = useState("")

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/?search=${search}`)
  }

  return <div className="flex items-center w-[350px] bg-blue-50 dark:bg-gray-900 rounded-full gap-2 px-3 py-1">
    <Search className="w-5 h-5 text-gray-500 cursor-pointer" />
    <form onSubmit={handleSearch} className="w-full">
      <Input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border-0 focus:ring-0 bg-transparent" placeholder="Search for a course" />
    
      <button type="submit" className="hidden">Search</button>
    </form>
  </div>
}
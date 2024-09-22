"use client"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from 'use-debounce'

export const SearchBar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')

  const debouncedSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }
    router.push(`/?${params.toString()}`)
  }, 300)

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    debouncedSearch(value)
  }, [debouncedSearch])

  return (
    <div className="flex items-center gap-2 p-0.5 bg-gray-100 dark:bg-zinc-800 px-5 w-[340px] max-md:w-full rounded-full">
      <Search size={20} className="text-gray-500"/>
      <Input 
        type="text" 
        placeholder="Search for a course" 
        className="border-none shadow-none bg-transparent" 
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  )
}
"use client"
import { Input } from "@/components/ui/input"
import { useState, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from 'use-debounce'

export const SearchBarTeacher = () => {
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
    router.push(`/teacher/courses?${params.toString()}`)
  }, 300)

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    debouncedSearch(value)
  }, [debouncedSearch])

  return (
    <Input 
      type="text" 
      placeholder="Filter courses..." 
      className="w-[400px] p-1 px-2" 
      value={searchQuery}
      onChange={handleSearch}
    />
  )
}
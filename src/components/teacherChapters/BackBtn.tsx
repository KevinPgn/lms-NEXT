"use client"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "../ui/button"

export const BackBtn = () => {
  const router = useRouter()
  return <Button variant="ghost" onClick={() => router.back()} className="w-fit flex items-center gap-2 ml-5 border border-gray-300 dark:border-gray-700 mt-5">
    <ArrowLeft className="w-4 h-4" />
    <span>Back to course setup</span>
  </Button>
}
"use client"
import categories from "@/features/data/Categories"
import {useSearchParams, useRouter} from "next/navigation"
import { Button } from "@/components/ui/button"
import { CircleEllipsis } from "lucide-react"

export const Categories = () => {
  const searchParams = useSearchParams()
  const categoryParams = searchParams.get("category")
  const router = useRouter()

  return (
   <div className="flex py-5 items-center flex-wrap justify-between">
    <div className="flex flex-wrap items-center gap-5">
        <Button
        onClick={() => router.push("/course")}
        variant={categoryParams === null ? "default" : "outline"}>
            All
        </Button>
        {categories.map((category) => (
        <Button
        onClick={() => router.push(`/course?category=${category.name}`)}
        key={category.name}
        variant={categoryParams === category.name ? "default" : "outline"}
        >
            {category.name}
        </Button>
        ))}
    </div>

    <CircleEllipsis size={20} className="cursor-pointer"/>
   </div>
  )
}
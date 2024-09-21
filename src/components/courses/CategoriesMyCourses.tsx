"use client"
import categories from "@/features/data/Categories"
import {useSearchParams, useRouter} from "next/navigation"
import { Button } from "@/components/ui/button"
import { CircleEllipsis } from "lucide-react"

export const CategoriesMyCourses = () => {
  const searchParams = useSearchParams()
  const categoryParams = searchParams.get("category")
  const router = useRouter()

  return (
   <div className="flex flex-wrap py-5 items-center justify-between">
    <div className="flex items-center gap-5">
        <Button
        onClick={() => router.push("/mycourses")}
        variant={categoryParams === null ? "default" : "outline"}>
            All
        </Button>
        {categories.map((category) => (
        <Button
        onClick={() => router.push(`/mycourses?category=${category.name}`)}
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
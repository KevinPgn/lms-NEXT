"use client"
import categories from "@/features/data/Categories"
import {useSearchParams, useRouter} from "next/navigation"
import { Button } from "@/components/ui/button"

export const Categories = () => {
  const searchParams = useSearchParams()
  const categoryParams = searchParams.get("category")
  const router = useRouter()

  return (
   <div className="flex flex-wrap py-5 px-10 items-center gap-10">
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
  )
}
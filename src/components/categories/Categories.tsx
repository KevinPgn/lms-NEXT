"use client"
import {useRouter} from "next/navigation"
import { Button } from "@/components/ui/button"
import {useSearchParams} from "next/navigation"
let categories: {
    name: string
}[] = [
    { name: "All", },
    { name: "Web Development", },
    { name: "Mobile Development", },
    { name: "Machine Learning", },
    { name: "Software Engineering", },
    { name: "Filming", },
    { name: "Photography", },
    { name: "Marketing", },
    { name: "Business", },
]

export const Categories = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryParams = searchParams.get("category")
  return <>
    <div className="flex items-center p-5 gap-5">
        {categories.map((category, index) => (
            <Button
                key={index}
                variant={"outline"}
                className={`text-sm rounded-full border-gray-200 dark:border-gray-800 font-normal ${categoryParams === category.name ? "bg-orange-500 text-white" : ""}`}
                onClick={() => router.push(`/?category=${category.name}`)}
            >
                {category.name}
            </Button>
        ))}
        <span className="text-sm font-normal underline cursor-pointer text-orange-500">See More</span>
    </div>
  </>
}
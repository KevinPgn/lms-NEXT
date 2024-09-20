"use client"
import categories from "@/features/data/Categories"
import {useSearchParams, useRouter} from "next/navigation"

export const Categories = () => {
  const searchParams = useSearchParams()
  const categoryParams = searchParams.get("category")
  const router = useRouter()

  return (
    <div className="flex flex-wrap py-5 items-center gap-2 justify-around border-b border-gray-200 dark:border-gray-800 pb-5">
      <span
        onClick={() => {
          router.push('/course')
        }}
        className={`relative cursor-pointer hover:text-purple-500 p-2 rounded-md duration-75 ${!categoryParams ? "after:absolute after:-bottom-5 after:left-0 after:w-full after:h-0.5 after:bg-purple-500 after:rounded-full after:duration-75 text-purple-500" : ""}`}
      >
        All
      </span>
      {categories.map((category) => (
        <span
          onClick={() => {
            router.push(`/course?category=${category.name}`)
          }}
          key={category.name}
          className={`relative cursor-pointer hover:text-purple-500 p-2 rounded-md duration-75 ${categoryParams === category.name ? "after:absolute after:-bottom-5 after:left-0 after:w-full after:h-0.5 after:bg-purple-500 after:rounded-full after:duration-75 text-purple-500" : ""}`}
        >
          {category.name}
        </span>
      ))}
    </div>
  )
}
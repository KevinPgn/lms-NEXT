"use client"
import {useRouter} from "next/navigation"
import { Button } from "@/components/ui/button"
import {useSearchParams} from "next/navigation"
import { ScreenShare, Computer, Smartphone, Brain, Film, Camera, Mail, Briefcase } from "lucide-react"

let categories: {
    name: string
    icon: React.ReactNode
}[] = [
    { name: "All", icon: <ScreenShare size={16} /> },
    { name: "Web Development", icon: <Computer size={16} /> },  
    { name: "Mobile Development", icon: <Smartphone size={16} /> },
    { name: "Machine Learning", icon: <Brain size={16} /> },
    { name: "Filming", icon: <Film size={16}  /> },
    { name: "Photography", icon: <Camera size={16} /> },
    { name: "Marketing", icon: <Mail size={16} /> },
    { name: "Business", icon: <Briefcase size={16} /> },
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
                className={`text-sm rounded-full border-gray-100 dark:border-gray-800 font-normal ${categoryParams === category.name ? "bg-orange-500 text-white" : ""}`}
                onClick={() => router.push(`/?category=${category.name}`)}
            >
                <span className="flex items-center gap-2">
                    {category.icon}
                    {category.name}
                </span>
            </Button>
        ))}
        <span className="text-sm font-normal underline cursor-pointer text-orange-500">See More</span>
    </div>
  </>
}
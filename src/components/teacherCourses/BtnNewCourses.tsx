import {Plus} from "lucide-react"
import { Button } from "@/components/ui/button"

export const BtnNewCourses = () => {
  return <Button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white">
    <div className="rounded-full w-5 h-5 flex items-center justify-center border border-gray-200">
        <Plus size={16} />
    </div>
    New Course
  </Button>
}
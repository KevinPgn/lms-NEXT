"use client"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import {useState} from "react"

export const CourseInformations = ({course}: {course: any}) => {
  const [fieldsCompleted, setFieldsCompleted] = useState(1)
  
  return <div className="p-7">
    <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
            <span className="text-xl font-medium">Course Setup</span>
            <span className="text-sm font-medium text-gray-500">Complete all fields ({fieldsCompleted}/6)</span>
        </div>
        <div className="flex items-center gap-4">
            <Button variant="outline" disabled={fieldsCompleted !== 6}>Publish</Button>
            <Button variant="destructive">
                <Trash className="w-4 h-4" />
            </Button>
        </div>
    </div>
  </div>
}
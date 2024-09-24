import { Button } from "@/components/ui/button"
import { Trash, LayoutDashboard, ListChecks } from "lucide-react"
import { TitleForm } from "./TitleForm"
import { DescriptionForm } from "./DescriptionForm"

export const CourseInformations = ({course, courseId}: {course: any, courseId: string}) => {  
  const requireFields = [
    course?.title,
    course?.description,
    course?.image,
    course?.price,
    course?.levels,
    course?.category
  ]
  const totalFields = requireFields.length
  const completedFields = requireFields.filter(field => field).length

  return <div className="p-7">
    <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
            <span className="text-2xl font-bold">Course Setup</span>
            <span className="text-sm font-normal text-gray-500">Complete all fields ({completedFields}/{totalFields})</span>
        </div>
        <div className="flex items-center gap-4">
            <Button variant="outline" disabled={completedFields !== totalFields}>Publish</Button>
            <Button variant="destructive">
                <Trash className="w-4 h-4" />
            </Button>
        </div>
    </div>

    <div className="flex items-start justify-between flex-wrap mt-14">
        <div className="w-[40%] max-md:w-full">
            <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full">
                    <LayoutDashboard className="w-8 h-8 text-blue-500" />
                </div>
                <span className="text-xl font-bold">Customize your course</span>
            </div>
            <TitleForm 
            initialTitle={course?.title}
            courseId={courseId} />

            <DescriptionForm 
            initialDescription={course?.description}
            courseId={courseId} />
        </div>
        <div className="w-[40%] max-md:w-full max-md:mt-10">
        <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full">
                    <ListChecks className="w-8 h-8 text-blue-500" />
                </div>
                <span className="text-xl font-bold">Course Chapters</span>
            </div> 
        </div>   
    </div>
  </div>
}
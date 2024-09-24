import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { PublishCourse } from "../teacherCourseDetail/PublishCourse"

export const ChapterInformations = ({chapter, chapterId}: {chapter: any, chapterId: string}) => {  
  const requireFields = [
    chapter?.title,
    chapter?.content,
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
            <PublishCourse courseId={chapterId} published={chapter?.published} />
            <Button variant="destructive">
                <Trash className="w-4 h-4" />
            </Button>
        </div>
    </div>

    <div className="flex items-start justify-between flex-wrap mt-14">
        <div className="w-[45%] max-md:w-full">

        </div>
        <div className="w-[45%] max-md:w-full max-md:mt-10">

        </div>   
    </div>
  </div>
}
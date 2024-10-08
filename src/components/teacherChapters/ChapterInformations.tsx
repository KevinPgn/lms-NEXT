import { Button } from "@/components/ui/button"
import { Trash, LayoutDashboard, Video, Eye } from "lucide-react"
import { PublishChapter } from "./PublishedChapter"
import { TitleFormChapter } from "./TitleFormChapter"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { DescriptionFormChapter } from "./DescriptionFormChapter"
import { VideoFormChapter } from "./VideoFormChapter"
import { FreePreviewFormChapter } from "./FreePreviewFormChapter"

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
            <PublishChapter chapterId={chapterId} isPublished={chapter?.isPublished} completedFields={completedFields} />
            <Button variant="destructive">
                <Trash className="w-4 h-4" />
            </Button>
        </div>
    </div>

    <div className="flex items-start justify-between flex-wrap mt-14">
        <div className="w-[45%] max-md:w-full">
        <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full">
                    <LayoutDashboard className="w-8 h-8 text-blue-500" />
                </div>
                <span className="text-xl font-bold">Customize your chapter</span>
        </div>

            <TitleFormChapter initialTitle={chapter?.title} chapterId={chapterId} />
            <DescriptionFormChapter initialDescription={chapter?.content} chapterId={chapterId} />
        
            <div className="flex items-center gap-2 mt-8">
                <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full">
                    <Eye className="w-8 h-8 text-blue-500" />
                </div>
                <span className="text-xl font-bold">Access settings</span>
            </div>

            <FreePreviewFormChapter initialFreePreview={chapter?.freePreview} chapterId={chapterId} />
        </div>
        <div className="w-[45%] max-md:w-full max-md:mt-10">
            <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full">
                    <Video className="w-8 h-8 text-blue-500" />
                </div>
                <span className="text-xl font-bold">Add a video</span>
            </div>

            <VideoFormChapter initialVideo={chapter?.video} chapterId={chapterId} />
        </div>   
    </div>

    <ToastContainer />
  </div>
}
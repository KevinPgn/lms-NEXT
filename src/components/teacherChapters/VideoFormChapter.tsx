"use client"
import {useState} from "react"
import { Input } from "@/components/ui/input"
import {Controller, useForm} from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Pencil, Video} from "lucide-react"
import { updateChapter } from "@/server/Chapters"
import {toast} from "react-toastify"

export const VideoFormChapter = ({initialVideo, chapterId}: {initialVideo: string, chapterId: string}) => {
  const [isEditing, setIsEditing] = useState(false)
  const {control, handleSubmit, formState: {errors}} = useForm()
  
  const onSubmit = async (data: any) => {
    try{
      await updateChapter({chapterId, video: data.video})
      toast.success("Chapter video updated successfully")
      setIsEditing(false)
    } catch(error){
      toast.error("Failed to update chapter video")
    }
  }

  return <div className="w-full p-4 bg-[#F4F4F4] dark:bg-transparent dark:border dark:border-gray-700 rounded-md mt-7">
    <div className="flex items-center justify-between">
      <span className="text-lg font-bold">Chapter Video</span>
      <Button variant="ghost" className="flex items-center gap-2" onClick={() => setIsEditing(!isEditing)}>
        <Video className="w-4 h-4" />
        {isEditing ? "Cancel" : "Edit Video"}
      </Button>
    </div>
    {isEditing ? (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="video"
          control={control}
          defaultValue={initialVideo}
          render={({field}) => (
            <Input
              {...field}
              className="mt-2"
            />
          )}
        />
        <Button type="submit" className="mt-4">Save</Button>
      </form>
    ) : (
     <div className="flex items-center justify-center gap-2 h-60 mt-3 bg-gray-200 rounded-md p-4">
        <Video size={40} className="text-gray-500" /> 
     </div>
    )}
  </div>
}
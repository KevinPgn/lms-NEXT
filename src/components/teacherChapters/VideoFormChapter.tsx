"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Plus, Video as VideoIcon } from "lucide-react"
import { UploadDropzone } from "@/components/utils/uploadthing"
import { updateChapter } from "@/server/Chapters"
import { toast } from "react-toastify"

export const VideoFormChapter = ({ initialVideo, chapterId }: { initialVideo: string, chapterId: string }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [videoUrl, setVideoUrl] = useState(initialVideo)
  const { handleSubmit } = useForm()

  const onSubmit = async () => {
    try {
      await updateChapter({ chapterId, video: videoUrl })
      toast.success("Video updated successfully")
      setIsEditing(false)
    } catch (error) {
      toast.error("Failed to update video")
    }
  }

  return (
    <div className="w-full p-4 bg-[#F4F4F4] dark:bg-transparent dark:border dark:border-gray-700 rounded-md mt-7">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">Chapter Video</span>
        <Button variant="ghost" className="flex items-center gap-2" onClick={() => setIsEditing(!isEditing)}>
          <Plus className="w-4 h-4" />
          {isEditing ? "Cancel" : "Add a Video"}
        </Button>
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res && res.length > 0) {
                setVideoUrl(res[0].url)
              }
              toast.success("Upload Completed")
            }}
            onUploadError={(error: Error) => {
              toast.error(`ERROR! ${error.message}`)
            }}
          />
          <Button type="submit" className="mt-4">Save</Button>
        </form>
      ) : (
        <div className="text-md font-normal mt-2">
          {videoUrl ? (
            <video src={videoUrl} className="w-full h-auto rounded-md" />
          ) : (
            <div className="w-full h-52 bg-gray-200 rounded-md flex items-center justify-center">
              <VideoIcon size={30} className="text-gray-500" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
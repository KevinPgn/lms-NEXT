"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Plus, Image as ImageIcon } from "lucide-react"
import { UploadDropzone } from "@/components/utils/uploadthing"
import { updateCourseById } from "@/server/Courses"
import { toast } from "react-toastify"

export const ImageForm = ({ initialImage, courseId }: { initialImage: string, courseId: string }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [imageUrl, setImageUrl] = useState(initialImage)
  const { handleSubmit } = useForm()

  const onSubmit = async () => {
    try {
      await updateCourseById({ courseId, image: imageUrl })
      toast.success("Image updated successfully")
      setIsEditing(false)
    } catch (error) {
      toast.error("Failed to update image")
    }
  }

  return (
    <div className="w-full p-4 bg-[#F4F4F4] dark:bg-transparent dark:border dark:border-gray-700 rounded-md mt-7">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">Course Image</span>
        <Button variant="ghost" className="flex items-center gap-2" onClick={() => setIsEditing(!isEditing)}>
          <Plus className="w-4 h-4" />
          {isEditing ? "Cancel" : "Add an Image"}
        </Button>
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res && res.length > 0) {
                setImageUrl(res[0].url)
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
          {imageUrl ? (
            <img src={imageUrl} alt="Course" className="w-full h-auto rounded-md" />
          ) : (
            <div className="w-full h-52 bg-gray-200 rounded-md flex items-center justify-center">
              <ImageIcon size={30} className="text-gray-500" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
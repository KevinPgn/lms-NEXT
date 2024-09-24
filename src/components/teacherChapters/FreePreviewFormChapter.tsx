"use client"
import {useState} from "react"
import { Input } from "@/components/ui/input"
import {Controller, useForm} from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Pencil} from "lucide-react"
import { updateChapter } from "@/server/Chapters"
import {toast} from "react-toastify"

export const FreePreviewFormChapter = ({initialFreePreview, chapterId}: {initialFreePreview: boolean, chapterId: string}) => {
  const [isEditing, setIsEditing] = useState(false)
  const {control, handleSubmit, formState: {errors}} = useForm()

  const onSubmit = async (data: any) => {
    try{
      await updateChapter({chapterId, freePreview: data.freePreview})
      toast.success("Chapter free preview updated successfully")
      setIsEditing(false)
    } catch(error){
      toast.error("Failed to update chapter free preview")
    }
  }

  return (
    <div className="w-full p-4 bg-[#F4F4F4] dark:bg-transparent dark:border dark:border-gray-700 rounded-md mt-7">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">Chapter Free Preview</span>
        <Button variant="ghost" className="flex items-center gap-2" onClick={() => setIsEditing(!isEditing)}>
          <Pencil className="w-4 h-4" />
          {isEditing ? "Cancel" : "Edit Free Preview"}
        </Button>
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-2 mt-4">
            <Controller
              name="freePreview"
              control={control}
              defaultValue={initialFreePreview}
              render={({ field }) => (
                <input
                  type="checkbox"
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="w-4 h-4"
                />
              )}
            />
            <label htmlFor="freePreview" className="text-sm font-medium">
              Do you want to give access to everyone without pay?
            </label>
          </div>
          <Button type="submit" className="mt-4">Save</Button>
        </form>
      ) : (
        <p className="text-md font-normal mt-2">
          {initialFreePreview ? "Free preview enabled" : "Free preview disabled"}
        </p>
      )}
    </div>
  )
}
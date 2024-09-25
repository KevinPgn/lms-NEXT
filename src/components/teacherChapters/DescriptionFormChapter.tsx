"use client"
import {useState} from "react"
import { Input } from "@/components/ui/input"
import {Controller, useForm} from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Pencil} from "lucide-react"
import { updateChapter } from "@/server/Chapters"
import {toast} from "react-toastify"
import { Editor } from "./Editor"
export const DescriptionFormChapter = ({initialDescription, chapterId}: {initialDescription: string, chapterId: string}) => {
  const [isEditing, setIsEditing] = useState(false)
  const {control, handleSubmit, formState: {errors}} = useForm()
  
  const onSubmit = async (data: any) => {
    try{
      await updateChapter({chapterId, content: data.content})
      toast.success("Chapter description updated successfully")
      setIsEditing(false)
    } catch(error){
      toast.error("Failed to update chapter description")
    }
  }

  return <div className="w-full p-4 bg-[#F4F4F4] dark:bg-transparent dark:border dark:border-gray-700 rounded-md mt-7">
    <div className="flex items-center justify-between">
      <span className="text-lg font-bold">Chapter Description</span>
      <Button variant="ghost" className="flex items-center gap-2" onClick={() => setIsEditing(!isEditing)}>
        <Pencil className="w-4 h-4" />
        {isEditing ? "Cancel" : "Edit Title"}
      </Button>
    </div>
    {isEditing ? (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="content"
          control={control}
          defaultValue={initialDescription}
          render={({field}) => (
            <Editor
              {...field}
              className="mt-2"
            />
          )}
        />
        <Button type="submit" className="mt-4">Save</Button>
      </form>
    ) : (
      <p className="text-md font-normal mt-2">{initialDescription ? 
        <div dangerouslySetInnerHTML={{ __html: initialDescription }} />
        : "No description"}</p>
    )}
  </div>
}
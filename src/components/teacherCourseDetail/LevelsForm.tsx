"use client"
import {useState} from "react"
import { Input } from "@/components/ui/input"
import {Controller, useForm} from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Pencil} from "lucide-react"
import { updateCourseById } from "@/server/Courses"
import {toast} from "react-toastify"

export const LevelsForm = ({initialLevels, courseId}: {initialLevels: string, courseId: string}) => {
  const [isEditing, setIsEditing] = useState(false)
  const {control, handleSubmit, formState: {errors}} = useForm()
  
  const onSubmit = async (data: any) => {
    try{
      await updateCourseById({courseId, levels: data.levels})
      toast.success("Course levels updated successfully")
      setIsEditing(false)
    } catch(error){
      toast.error("Failed to update course levels")
    }
  }

  return <div className="w-full p-4 bg-[#F4F4F4] dark:bg-transparent dark:border dark:border-gray-700 rounded-md mt-7">
    <div className="flex items-center justify-between">
      <span className="text-lg font-bold">Course Levels</span>
      <Button variant="ghost" className="flex items-center gap-2" onClick={() => setIsEditing(!isEditing)}>
        <Pencil className="w-4 h-4" />
        {isEditing ? "Cancel" : "Edit Levels"}
      </Button>
    </div>
    {isEditing ? (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="levels"
          control={control}
          defaultValue={initialLevels}
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
      <p className="text-md font-normal mt-2">{initialLevels ? initialLevels : "No levels"}</p>
    )}
  </div>
}
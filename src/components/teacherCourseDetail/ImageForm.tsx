"use client"
import {useState} from "react"
import { Input } from "@/components/ui/input"
import {Controller, useForm} from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Plus} from "lucide-react"
import { Image as ImageIcon } from "lucide-react"

export const ImageForm = ({initialImage, courseId}: {initialImage: string, courseId: string}) => {
  const [isEditing, setIsEditing] = useState(false)
  const {control, handleSubmit, formState: {errors}} = useForm()
  
  const onSubmit = (data: any) => {
    console.log(data)
  }

  return <div className="w-full p-4 bg-[#F4F4F4] dark:bg-transparent dark:border dark:border-gray-700 rounded-md mt-7">
    <div className="flex items-center justify-between">
      <span className="text-lg font-bold">Course Image</span>
      <Button variant="ghost" className="flex items-center gap-2" onClick={() => setIsEditing(!isEditing)}>
        <Plus className="w-4 h-4" />
        {isEditing ? "Cancel" : "Add a Image"}
      </Button>
    </div>
    {isEditing ? (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="image"
          control={control}
          defaultValue={initialImage}
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
      <div className="text-md font-normal mt-2">{initialImage ? initialImage : <div className="w-full h-52 bg-gray-200 rounded-md flex items-center justify-center">
        <ImageIcon size={30} className="text-gray-500" />
        </div>}</div>
    )}
  </div>
}
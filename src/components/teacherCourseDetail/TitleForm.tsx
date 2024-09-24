"use client"
import {useState} from "react"
import { Input } from "@/components/ui/input"
import {useForm, FieldValues} from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Pencil} from "lucide-react"

export const TitleForm = ({initialTitle, courseId}: {initialTitle: string, courseId: string}) => {
  const [isEditing, setIsEditing] = useState(false)
  const {control, handleSubmit} = useForm()
  
  const onSubmit = (data: any) => {
    console.log(data)
  }

  return <div className="w-full p-4 bg-[#F4F4F4] dark:bg-transparent dark:border dark:border-gray-700 rounded-md mt-7">
    <div className="flex items-center justify-between">
      <span className="text-lg font-bold">Course Title</span>
      <Button variant="ghost" className="flex items-center gap-2" onClick={() => setIsEditing(!isEditing)}>
        <Pencil className="w-4 h-4" />
        {isEditing ? "Cancel" : "Edit Title"}
      </Button>
    </div>
    {isEditing ? (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="title"
          defaultValue={initialTitle}
          className="mt-2"
        />
        <Button type="submit" className="mt-4">Save</Button>
      </form>
    ) : (
      <p className="text-md font-normal mt-2">{initialTitle}</p>
    )}
  </div>
}
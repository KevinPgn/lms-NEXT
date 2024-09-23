"use client"
import { useForm } from "react-hook-form"
import { createCourse } from "@/server/Courses"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
export const FormCreateCourse = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const router = useRouter()

  const onSubmit = async (data: any) => {
    await createCourse(data)
  }

  return <>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mt-4">
            <label htmlFor="title" className="text-sm font-medium">Course title</label>
            <Input type="text" id="title"
            {...register("title", {required: true})} placeholder="e.g. 'Mastering Next.js'"
            />
            {errors.title && <span className="text-sm text-red-500 mt-2">Title is required</span>}
            <span className="text-sm text-gray-500 mt-2">Be specific and descriptive with your course title. It helps learners understand what the course is about.</span>
        </div>
      <div className="flex mt-8 gap-2">
        <Button type="button" variant="outline" onClick={() => {
          router.back()
        }}>Cancel</Button>
        <Button variant="default" type="submit">Continue</Button>
      </div>
    </form>
  </>
}
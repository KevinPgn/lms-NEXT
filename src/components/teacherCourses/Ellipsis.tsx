"use client"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Edit, Ellipsis as EllipsisIcon, Trash, FileEdit } from "lucide-react"
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import React from "react"
import { Button } from "@/components/ui/button"
import { deleteCourse } from "@/server/Courses"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { publishCourse } from "@/server/Courses"
import { useRouter } from "next/navigation"

export const Ellipsis = ({courseId, coursePublished}: {courseId: string, coursePublished: boolean}) => {
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisIcon className="w-4 h-4 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => router.push(`/teacher/courses/${courseId}`)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => publishCourse({courseId, published: !coursePublished})}>
            <FileEdit className="w-4 h-4 mr-2" />
            {coursePublished ? "Draft" : "Publish"}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsDeleteDialogOpen(true)}>
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this course?</DialogTitle>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={async () => {
              await deleteCourse({courseId})
              setIsDeleteDialogOpen(false);
              toast.success("Course deleted successfully")
            }}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </>
  );
}
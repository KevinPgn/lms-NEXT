"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function BtnTeacherMode() {
  const pathname = usePathname()
  const router = useRouter()
  const isTeacherMode = pathname.startsWith("/teacher")

  const handleClick = () => {
    if (isTeacherMode) {
      // Exit teacher mode
      router.push("/")
    } else {
      // Enter teacher mode
      router.push("/teacher/courses")
    }
  }

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      size="sm"
      className="hidden md:flex"
    >
      {isTeacherMode ? (
        <div className="flex items-center">
          <LogOut className="mr-2 h-4 w-4" />
          Exit
        </div>
      ) : (
        "Teacher Mode"
      )}
    </Button>
  )
}
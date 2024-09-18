"use client"
import { Plus } from "lucide-react"
import { Button } from "../ui/button"

export const CreateGroup = () => {
  return <>
    <Button className="bg-[#0F0F11] border border-white/10 hover:bg-white/10 text-sm flex items-center gap-1">
      <Plus size={16} />
      Create Group
    </Button>
  </>
}
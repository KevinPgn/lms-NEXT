import { CreateGroup } from "@/components/utils/CreateGroup"
import { SelectGroups } from "./SelectGroups"
import { Bell, MessageCircle, Plus } from "lucide-react"
import { UserProfile } from "../auth/UserProfile"
import { getSession } from "@/components/utils/CacheSession"

export const HeadersExplore = () => {
  const session = getSession()
  return <header className="h-16">
    <nav className="h-full bg-[#080810] shadow-lg flex items-center justify-between px-5">
      <SelectGroups />

      <div className="flex items-center gap-5">
        <CreateGroup />
        <Bell size={23} className="text-white cursor-pointer hover:text-white" />
        <MessageCircle size={23} className="text-white cursor-pointer hover:text-white" />
        <UserProfile session={session} />
      </div>
    </nav>
  </header>
}
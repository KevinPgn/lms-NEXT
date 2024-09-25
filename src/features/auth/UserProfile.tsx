"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { User, LogOut } from "lucide-react"
import { signIn, signOut } from "next-auth/react"
export const UserProfile = ({session}: {session: any}) => {
  return <>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={session.user.image} />
          <AvatarFallback>
            {session.user.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <User className="w-4 h-4 mr-2" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut className="w-4 h-4 mr-2" />
          <span onClick={() => signOut()}>Logout</span>
        </DropdownMenuItem> 
      </DropdownMenuContent>
    </DropdownMenu>
  </>
}
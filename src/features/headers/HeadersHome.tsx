"use client"
import {usePathname} from "next/navigation"
import { SearchBar } from "./SearchBar"
import { Button } from "@/components/ui/button"
import { SignInButton } from "../auth/SignInButton"
import { UserProfile } from "../auth/UserProfile"

export const HeadersHome = ({session}: {session: any}) => {
  const pathname = usePathname()

  return <header className="w-full h-20 border-b border-gray-200 dark:border-gray-800">
    <nav className="flex items-center justify-between h-full px-5">
        {pathname === "/" && <SearchBar />}
    
        <div className="flex items-center gap-5">
            <Button variant={"outline"} className="text-sm font-normal">
                Teacher Mode
            </Button>
            {session ? <UserProfile session={session} /> : <SignInButton />}
        </div>
    </nav>    
  </header>
}
"use client"
import {usePathname} from "next/navigation"
import { SearchBar } from "./SearchBar"
import BtnTeacherMode from "./BtnTeacherMode"
import { SignInButton } from "@/features/auth/SignInButton"
import { UserProfile } from "@/features/auth/UserProfile"

export const Headers = ({session}: {session: any}) => {
  const pathname = usePathname()

  return <header className="p-3 px-5 h-20 border-b border-gray-200 dark:border-zinc-800">
    <nav className="flex items-center h-full w-full">
        <div className={`flex ${pathname === "/" ? "justify-between" : "justify-end"} w-full`}>
            {pathname === "/" && <SearchBar />}
        </div>

        <div className="flex items-center gap-5">
            <BtnTeacherMode />
            {!session ? <SignInButton /> : <UserProfile session={session}/>}
        </div>
    </nav>


  </header>
}
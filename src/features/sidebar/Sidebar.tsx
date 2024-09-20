import Link from "next/link"
import { Links } from "./Links"
import { ModeToggle } from "./DarkMode"
import { SignInButton } from "../auth/SignInButton"
import { getSession } from "@/components/utils/CacheSession"
import { SignOutButton } from "../auth/SignOutButton"

export const Sidebar = async () => {
  const session = await getSession()

  return <div className="w-60 p-2 bg-white flex flex-col justify-between dark:bg-black shadow-lg border-r border-gray-200 dark:border-gray-800 py-3 h-screen sticky top-0">
    <div className="flex flex-col gap-2">
        <Link href="/" className="flex items-center gap-2 px-3">
        <div className="w-9 h-9 rounded-xl bg-black dark:bg-white flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white dark:bg-black"></div>
        </div>
        <h2 className="text-2xl font-normal">LMSP</h2>
        </Link>

        <Links session={session}/>
        <ModeToggle />
    </div>

    {session ? <SignOutButton /> : <SignInButton />}
  </div>
}
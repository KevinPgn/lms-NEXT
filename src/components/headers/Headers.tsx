"use client"
import {usePathname} from "next/navigation"
import { SearchBar } from "./SearchBar"

export const Headers = ({session}: {session: any}) => {
  const pathname = usePathname()

  return <header className="flex justify-between items-center p-3 h-20 border-b border-gray-200 dark:border-zinc-800">
    <nav className="flex items-center gap-2">
        {pathname === "/" ? <SearchBar /> : null}
    </nav>
  </header>
}
import Link from "next/link"
import { Links } from "./Links"

export const SidebarHome = () => {
  return <div className="w-60 h-screen sticky top-0 border-r border-gray-200 dark:border-zinc-800">
    <Link href="/" className="flex items-center gap-2 p-3">
        <div className="w-10 h-10 bg-blue-700 dark:bg-gray-800 rounded-full"></div>
        <h1 className="text-xl font-bold text-blue-700">Logoipsum</h1>
    </Link>

    <Links />
  </div>
}
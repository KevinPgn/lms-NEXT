import Link from "next/link"
import { Links } from "./Links"

export const SidebarHome = () => {
  return <div className="h-screen w-[230px] border-r border-gray-200 dark:border-gray-800">
    <Link href="/" className="flex items-center justify-center py-3 gap-2">
      <div className="w-9 h-9 rounded-full bg-blue-500 dark:bg-blue-700"></div>
      <span className="text-xl font-bold text-blue-700">Logoipsum</span>
    </Link>
    <Links />
  </div>
}
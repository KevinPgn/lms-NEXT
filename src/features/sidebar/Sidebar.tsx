import Link from "next/link"
import { Links } from "./Links"
export const Sidebar = () => {
  return <div className="w-60 p-2 bg-white shadow-lg border-r border-gray-200 py-3 h-screen sticky top-0">
    <Link href="/" className="flex items-center gap-2 px-3">
    <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-white"></div>
    </div>
      <h2 className="text-2xl font-normal">LMSP</h2>
    </Link>

    <Links />
  </div>
}
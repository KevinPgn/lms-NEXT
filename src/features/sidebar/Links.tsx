import {Sparkles, Monitor, Zap, Users2} from "lucide-react"
import Link from "next/link"

export const Links = () => {
  return <div className="flex flex-col gap-2 mt-3">
    <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 p-2 rounded-md hover:bg-gray-100">
        <Sparkles className="w-4 h-4" />
        Dashboard
    </Link>
  </div>
}
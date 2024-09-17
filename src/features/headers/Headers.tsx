import Link from "next/link"
import { Links } from "./Links"
import { SignInButton } from "../auth/SignInButton"

export const Headers = () => {
  return <header className="h-16 px-2">
    <nav className="h-full flex items-center justify-between max-w-[1400px] mx-auto">
        <Link href="/">
            <span className="text-white text-xl font-semibold cursor-pointer">Grouple.</span>
        </Link>

        {/* Links */}
        <Links />
        
        {/* Login */}
        <SignInButton />
    </nav>
  </header>
}
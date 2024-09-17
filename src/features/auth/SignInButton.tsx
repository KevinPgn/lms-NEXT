"use client"
import { Button } from "@/components/ui/button"
import {signIn} from "next-auth/react"
import { LogIn } from "lucide-react"

export const SignInButton = () => {
  return <>
    <Button onClick={() => signIn()} className="flex text-sm font-semibold hover:bg-white/10 duration-75 bg-[#0f0f11] rounded-2xl border border-white/10 items-center gap-2"><LogIn className="w-4 h-4" /> Login</Button>
  </>
}
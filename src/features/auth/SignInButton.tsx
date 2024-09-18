"use client"
import { Button } from "@/components/ui/button"
import {signIn} from "next-auth/react"
import { LogIn } from "lucide-react"

export const SignInButton = () => {
  return <>
    <Button onClick={() => signIn()} className="flex items-center gap-2"><LogIn className="w-4 h-4" /> Login</Button>
  </>
}
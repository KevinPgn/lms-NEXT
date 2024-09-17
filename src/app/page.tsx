import { Headers } from "@/features/headers/Headers"
import Image from "next/image"
import {Plus} from "lucide-react"

export default function Home() {
  return (
  <>
    <Headers />
    <main className="h-screen max-w-[1400px] mt-32 text-center text-white mx-auto">
      <h1 className="text-7xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white/20 via-white to-white/20 leading-tight">Bringing Communities Together</h1>
      <p className="text-md text-gray-500 w-[700px] mt-4 mx-auto">Grouple is a vibrant online community platform that empowerspeople to connect, collaborate, and culitivate meaningfulrelationships</p>

      <div className="flex items-center gap-5 justify-center mt-5">
        <button className="flex items-center gap-2 bg-black border border-white/10 px-4 py-2 rounded-md text-white hover:bg-white/10 duration-75">
          Watch Demo
        </button>
        <button className="flex bg-white items-center gap-2 px-4 py-2 rounded-md text-black hover:bg-white/90 duration-75">
          <div className="border border-black/50 rounded-full p-1">
            <Plus size={10} className="text-black"/>
          </div>
          Get Started
        </button>
      </div>

      <div className="mt-12 relative">
      <div className="absolute w-full h-full bg-white/10 -z-10 opacity-50 rounded-full blur-xl"></div>
        <Image src="/dashboard-snippet.png" alt="hero" width={1000} height={1000} className="mx-auto" />
      </div>
    </main>
  </>
  );
}

import { Headers } from "@/features/headers/Headers"

export default function Home() {
  return (
  <>
    <Headers />
    <main className="h-screen max-w-[1400px] mt-32 text-center text-white mx-auto">
      <h1 className="text-7xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white/20 via-white to-white/20">Bringing Communities Together</h1>
      <p className="text-md text-gray-500 w-[700px] mt-4 mx-auto">Grouple is a vibrant online community platform that empowerspeople to connect, collaborate, and culitivate meaningfulrelationships</p>
    </main>
  </>
  );
}

import { SidebarHome } from "@/features/sidebarHome/SidebarHome";
import { getSession } from "@/components/utils/CacheSession";
import { Headers } from "@/components/headers/Headers";
export default async function Home() {
  const session = await getSession()

  return (
    <section className="flex">
      <SidebarHome />

      <main className="flex-1">
        <Headers session={session}/>
      </main>
    </section>    
  );
}

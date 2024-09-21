import { SidebarHome } from "@/features/sidebarHome/SidebarHome";
import { getSession } from "@/components/utils/CacheSession";
import { Headers } from "@/components/headers/Headers";
import { Categories } from "@/components/categories/Categories";

export default async function Home() {
  const session = await getSession()

  return (
    <section className="flex">
      <SidebarHome />

      <main className="flex-1">
        <Headers session={session}/>
        <div className="flex flex-col gap-4 p-3 mt-4">
          <Categories />
        </div>
      </main>
    </section>    
  );
}

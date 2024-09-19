import { HeadersHome } from "@/features/headers/HeadersHome";
import { SidebarHome } from "@/features/sidebar/SidebarHome";
import { getSession } from "@/components/utils/CacheSession";
import { Categories } from "@/components/categories/Categories";
export default async function Home() {
  const session = await getSession()

  return (
    <div className="flex">
      <SidebarHome />

      <main className="flex flex-col flex-1">
        <HeadersHome session={session} />
        <Categories />
      </main>
    </div>
  );
}

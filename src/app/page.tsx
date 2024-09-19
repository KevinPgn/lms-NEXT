import { HeadersHome } from "@/features/headers/HeadersHome";
import { SidebarHome } from "@/features/sidebar/SidebarHome";
import { getSession } from "@/components/utils/CacheSession";
import { Categories } from "@/components/categories/Categories";
import { FilteredCourses } from "@/components/courses/FilteredCourses";

export default async function Home({searchParams}: {searchParams: {category: string, search: string}}) {
  const session = await getSession()

  return (
    <div className="flex">
      <SidebarHome />

      <main className="flex flex-col overflow-y-auto flex-1">
        <HeadersHome session={session} />
        <Categories />
        <div className="flex flex-wrap gap-5 p-5">
          <FilteredCourses category={searchParams.category} search={searchParams.search} />
        </div>
      </main>
    </div>
  );
}

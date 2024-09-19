import { HeadersHome } from "@/features/headers/HeadersHome";
import { SidebarHome } from "@/features/sidebar/SidebarHome";
import { getSession } from "@/components/utils/CacheSession";
import { Categories } from "@/components/categories/Categories";
import { getCoursesPublished } from "@/server/Courses";
import { FilteredCourses } from "@/server/FilteredCourses";

export default async function Home({searchParams}: {searchParams: {category: string}}) {
  const session = await getSession()
  const courses = await getCoursesPublished()

  return (
    <div className="flex">
      <SidebarHome />

      <main className="flex flex-col overflow-y-auto flex-1">
        <HeadersHome session={session} />
        <Categories />
        <div className="flex flex-wrap gap-5 p-5">
          <FilteredCourses category={searchParams.category} />
        </div>
      </main>
    </div>
  );
}

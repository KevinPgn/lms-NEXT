import categories from "@/features/data/Categories"

export const Categories = () => {
  return <>
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <div key={category.name} className="p-2 text-sm cursor-pointer hover:bg-gray-100 duration-75 dark:hover:bg-gray-700 px-4 rounded-full border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            {category.name}
          </div>
        ))}
      </div>
    </div>
  </>
}
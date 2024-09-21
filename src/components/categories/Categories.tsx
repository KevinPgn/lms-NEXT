import categories from "@/features/data/Categories"

export const Categories = () => {
  return <>
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <div key={category.name} className="flex items-center gap-2 p-2 text-sm cursor-pointer hover:bg-gray-100 duration-75 dark:hover:bg-gray-700 px-4 rounded-full border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <category.icon className="w-4 h-4" />
            <span>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  </>
}
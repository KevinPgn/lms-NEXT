import {BookOpenIcon} from "lucide-react"

export const Course = ({course, session}: {course: any, session: any}) => {
  return <div className="w-[320px] rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800 p-3">
    {course.image ? (
        <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-md" />
    ) : (
        <div className="w-full h-40 bg-gray-300 rounded-md"></div>
    )}
    
    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-3">{course.title}</h2>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{course.category}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">{course.description}</p>

    {/* Number of chapters */}
    <div className="flex items-center gap-2 mt-3">
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-700">
        <BookOpenIcon className="w-4 h-4 text-blue-500" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{course._count.chapters} chapters</p>
    </div>

    {/* If is purchased no show Price, if not show Price */}
    {!course.isPurchased && session.user.id !== course.authorId ? (
        <p className="text-md mt-3 font-bold">${course.price}</p>
    ) : (
        <p className="text-md mt-3 font-bold">Free</p>
    )}
  </div>
}
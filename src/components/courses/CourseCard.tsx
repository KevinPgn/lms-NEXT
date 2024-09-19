import { BookOpen } from "lucide-react"

export const CourseCard = ({ course }: { course: any }) => {
  return (
    <div className="w-[300px] hover:scale-105 transition-all duration-300 p-3 rounded-lg border border-gray-200 dark:border-gray-800 cursor-pointer">
      <div className="w-full h-[150px] bg-pink-400 rounded-lg"></div>

      <h2 className="text-lg font-bold mt-2">{course.title ? course.title : "Course Title"}</h2>
      <p className="text-sm text-gray-500">{course.description ? course.description : "Course Description"}</p>
  
      <div className="flex items-center gap-2 mt-2">
        <span className="text-xs bg-red-400 text-white px-2 py-1 rounded-md">{course.category ? course.category : "Category"}</span>
      </div>

      <div className="flex items-center gap-2 mt-5 mb-5">
        <div className="flex rounded-full p-1 bg-blue-400">
          <BookOpen className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm text-gray-500">{course._count.lessons} lessons</span>
      </div>

      {/* Progress bar with percentage if user is member or price if not */}
      {course.isMember ? (
        <div className="w-full h-[10px] bg-gray-200 dark:bg-gray-800 rounded-full mt-4">
          <div 
            className="h-full bg-blue-400 rounded-full mb-1" 
            style={{width: `${course.progress}%`}}
          ></div>
          <span className="text-sm text-blue-400 font-bold">{course.progress}% completed</span>
        </div>
      ) : (
        <span className="text-md font-bold">{course.price === 0 ? "Free" : `$${course.price}`}</span>
      )}
    </div>
  )
}
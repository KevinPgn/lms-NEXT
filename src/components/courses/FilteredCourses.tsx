import { BriefcaseBusiness, Users2, Star } from "lucide-react"

export const FilteredCourses = ({course}: {course: any}) => {
  const levelname = course.levels[0]?.name || 'Unknown'

  return <div className="w-[350px] cursor-pointer hover:scale-105 transition-all duration-300 rounded-md shadow-md">
      <div className="w-full h-[200px] bg-purple-300 rounded-t-md"></div>
      <h2 className="text-xl p-4 font-bold">{course.title}</h2>

      <div className="flex items-center gap-2 p-2 justify-around">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-full p-2">
            <BriefcaseBusiness size={16} />
          </div>
          <p className={`text-sm ${
            levelname === "Beginners" ? "text-green-500 font-semibold" :
            levelname === "Intermediate" ? "text-orange-500 font-semibold" :
            levelname === "Advanced" ? "text-red-500 font-semibold" : "" 
          }`}>
            {levelname}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-full p-2">
            <Users2 size={16} />
          </div>
          <p>{course.enrolledUsers.length}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-full p-2">
          <Star size={16} className="fill-yellow-500 text-yellow-500"/>
          </div>
          <p>{course.averageRating}</p>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-700 my-3 mb-5"></div>

      <div className="flex items-center justify-between p-2">
        <span className="text-md font-bold">{course.price === 0 ? "Free" : `$${course.price}`}</span>
        <span className="text-sm text-gray-500">{new Date(course.createdAt).toLocaleDateString()}</span>
      </div>
    </div>



}
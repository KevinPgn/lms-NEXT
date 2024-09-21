import { BriefcaseBusiness, Users2, Star, Heart } from "lucide-react"

export const Courses = ({course}: {course: any}) => {
  const levelname = course.levels[0]?.name || 'Unknown'


  return <div className="w-[350px] rounded-md dark:border dark:border-gray-700 shadow-md">
      <div className="w-full h-[200px] bg-purple-300 rounded-t-md relative group">
        <div className="absolute hidden top-2 right-2 cursor-pointer bg-[#FBA90D] rounded-full p-2 group-hover:flex">
        <Heart size={25} className="text-white fill-white" />
        </div>
      </div>

      <h2 className="text-xl p-4 font-bold cursor-pointer">{course.title}</h2>

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
          <p>{course._count.enrolledUsers}</p>
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
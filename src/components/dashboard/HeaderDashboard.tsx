import {Clock, CircleCheckIcon} from "lucide-react"
export const HeaderDashboard = () => {
  return <div className="w-full flex-wrap p-5 flex items-center justify-between">
    <div className="w-[45%] max-lg:w-full border flex items-center gap-2 rounded-md border-gray-200 dark:border-zinc-800 p-4">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-700">
        <Clock className="w-9 h-9 text-blue-500" />
      </div>
      <div>
        <h1 className="text-lg font-bold">In progress</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">0 courses</p>
      </div>
    </div>
    <div className="w-[45%] max-lg:w-full max-lg:mt-4 border flex items-center gap-2 rounded-md border-gray-200 dark:border-zinc-800 p-4">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100 dark:bg-green-700">
        <CircleCheckIcon className="w-9 h-9 text-green-500" />
      </div>
      <div>
        <h1 className="text-lg font-bold">Completed</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">0 courses</p>
      </div>
    </div>
  </div>
}
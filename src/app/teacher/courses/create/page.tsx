import { SidebarTeacher } from '@/features/sidebarTeacher/SidebarTeacher'
import { Headers } from '@/components/headers/Headers'
import { getSession } from '@/components/utils/CacheSession'
import { FormCreateCourse } from '@/components/teacherCreateCourse/FormCreateCourse'

const TeacherCourseCreatePage = async () => {
    const session = await getSession()

  return (
    <section className="flex">
      <SidebarTeacher />

      <main className="flex-1">
        <Headers session={session}/>
        
        <div className='max-w-3xl mx-auto mt-10'>
            <h2 className='text-2xl font-bold'>Name your course</h2>
            <p className='text-sm text-gray-500'>What would you like to name your course? You can change this later.</p>
        
            <FormCreateCourse />
        </div>
      </main>
    </section>  
  )
}

export default TeacherCourseCreatePage
import { EnrolledCourse } from "./EnrolledCourse";

interface CourseSuiviProps {
    chapterData: any; // Replace 'any' with a proper type for your chapter data
    isPurchased: boolean;
  }
  
  export const CourseSuivi = ({ chapterData, isPurchased }: CourseSuiviProps) => {
    return (
      <div className="p-6">
        {chapterData?.videoUrl && <video src={chapterData.videoUrl} />}
        <div className="flex justify-end w-full">
            {!isPurchased ? <EnrolledCourse courseId={chapterData?.id} /> : null}
        </div>
        <h2 className="text-2xl font-bold mb-4">{chapterData?.title}</h2>
        <div
        dangerouslySetInnerHTML={{ __html: chapterData?.content ?? "" }}
        ></div>
      </div>
    );
  };
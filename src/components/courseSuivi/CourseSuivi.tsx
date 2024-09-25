interface CourseSuiviProps {
    chapterData: any; // Replace 'any' with a proper type for your chapter data
  }
  
  export const CourseSuivi = ({ chapterData }: CourseSuiviProps) => {
    return (
      <div className="p-6">
        {chapterData?.videoUrl && <video src={chapterData.videoUrl} />}
        <h2 className="text-2xl font-bold mb-4">{chapterData?.title}</h2>
        <div
        dangerouslySetInnerHTML={{ __html: chapterData?.content ?? "" }}
        ></div>
      </div>
    );
  };
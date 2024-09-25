interface CourseSuiviProps {
    chapterData: any; // Replace 'any' with a proper type for your chapter data
  }
  
  export const CourseSuivi = ({ chapterData }: CourseSuiviProps) => {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{chapterData?.title}</h2>
        {/* Display other chapter information here */}
        {/* For example: */}
        {chapterData?.content && <p>{chapterData.content}</p>}
        {/* Add more components to display videos, quizzes, etc. */}
      </div>
    );
  };
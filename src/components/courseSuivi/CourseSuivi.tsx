"use client"
import { EnrolledCourse } from "./EnrolledCourse";
import { Button } from "@/components/ui/button";
import { markChapterAsCompleted } from "@/server/Chapters";
import { useState } from "react";
import { toast } from "react-toastify";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface CourseSuiviProps {
  chapterData: any;
  isPurchased: boolean;
  courseId: string;
  isCompleted: boolean;
}

export const CourseSuivi = ({ courseId, chapterData, isPurchased, isCompleted: initialIsCompleted }: CourseSuiviProps) => {
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);
  const router = useRouter();

  const handleMarkAsCompleted = async () => {
    try {
      const test = await markChapterAsCompleted({ chapterId: chapterData.id, courseId });
      console.log(chapterData.id, "chapterData.id")
      setIsCompleted(true);
      toast.success("Chapter marked as completed!");
      router.refresh(); // This will trigger a re-render of the page with fresh data
    } catch (error) {
      console.error("Error marking chapter as completed:", error);
      toast.error("Failed to mark chapter as completed");
    }
  };

  return (
    <div className="p-6">
      {chapterData?.videoUrl && <video src={chapterData.videoUrl} controls className="w-full mb-4" />}
      <div className="flex justify-between items-center w-full mb-4">
        <h2 className="text-2xl font-bold">{chapterData?.title}</h2>
        <div className="flex gap-2">
          {!isPurchased && <EnrolledCourse courseId={courseId} />}
          {isPurchased && !isCompleted && (
            <Button onClick={handleMarkAsCompleted} className="flex items-center gap-2">
              <CheckCircle size={20} />
              Mark as Completed
            </Button>
          )}
          {isCompleted && (
            <span className="text-green-500 font-semibold flex items-center gap-2">
              <CheckCircle size={20} />
              Completed
            </span>
          )}
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: chapterData?.content ?? "" }}
      ></div>
    </div>
  );
};
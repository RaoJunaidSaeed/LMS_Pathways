import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/db';
import Chapter from '@/models/Chapter';
import UserProgress from '@/models/UserProgress';
import CourseSidebarItem from './CourseSidebarItem';
import CourseProgress from '@/components/student/CourseProgress';

export default async function CourseSidebar({ course, progressCount }) {
  const { userId } = await auth();

  if (!userId) {
    return redirect('/');
  }

  await connectDB();

  // 1. Fetch Chapters
  const chapters = await Chapter.find({
    courseId: course._id,
    isPublished: true,
  }).sort({ position: 1 });

  // 2. Fetch User Progress
  const userProgress = await UserProgress.find({
    userId,
    chapterId: { $in: chapters.map((c) => c._id) },
  });

  return (
    <div className="h-full border-r border-slate-700 bg-slate-900 flex flex-col overflow-y-auto shadow-xl">
      <div className="p-8 flex flex-col border-b border-slate-700">
        <h1 className="font-semibold text-lg text-slate-100">{course.title}</h1>

        <div className="flex justify-between gap-6 items-center w-full ">
          <div className="flex flex-col w-[50%]">
            {chapters.map((chapter) => {
              const isCompleted = !!userProgress.find(
                (progress) =>
                  progress.chapterId.toString() === chapter._id.toString() && progress.isCompleted
              );

              return (
                <CourseSidebarItem
                  key={chapter._id.toString()} // Good practice to stringify key too
                  // 🛠️ FIX 1: Convert Chapter ID to String
                  id={chapter._id.toString()}
                  label={chapter.title}
                  isCompleted={isCompleted}
                  // 🛠️ FIX 2: Convert Course ID to String
                  courseId={course._id.toString()}
                  isLocked={!chapter.isFree && !userId}
                />
              );
            })}
          </div>
          {/* Progress Bar */}
          <div className="flex justify-center gap-6 items-center mt-6 w-[40%]">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        </div>
      </div>
    </div>
  );
}

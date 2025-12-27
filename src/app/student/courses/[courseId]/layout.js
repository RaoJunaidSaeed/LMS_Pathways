import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/db';
import Course from '@/models/Course';
import CourseSidebar from '@/components/courses/CourseSidebar';
import { getProgress } from '@/lib/actions/progress'; // 1. Import action

export default async function CourseLayout({ children, params }) {
  const { userId } = await auth();
  const { courseId } = await params;

  if (!userId) return redirect('/');

  await connectDB();

  const course = await Course.findOne({ _id: courseId });
  if (!course) return redirect('/');

  // 2. Calculate Progress
  const progressCount = await getProgress(userId, courseId);

  const plainCourse = JSON.parse(JSON.stringify(course));

  return (
    <div className=" bg-slate-950 flex flex-col">
      <CourseSidebar
        course={plainCourse}
        progressCount={progressCount} // 3. Pass real data
      />

      <main className=" h-full">{children}</main>
    </div>
  );
}

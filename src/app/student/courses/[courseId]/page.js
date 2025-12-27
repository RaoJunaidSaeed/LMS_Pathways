import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/db';
import Chapter from '@/models/Chapter';

export default async function CourseIdPage({ params }) {
  const { courseId } = await params;
  const { userId } = await auth();

  if (!userId) return redirect('/');

  await connectDB();

  // Find the first published chapter
  const firstChapter = await Chapter.findOne({
    courseId: courseId,
    isPublished: true,
  }).sort({ position: 1 });

  if (!firstChapter) {
    return redirect('/student/dashboard');
  }

  // Redirect to the first chapter immediately
  return redirect(`/student/courses/${courseId}/chapters/${firstChapter._id}`);
}

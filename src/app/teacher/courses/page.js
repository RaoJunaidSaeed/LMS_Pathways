import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/db';
import Course from '@/models/Course';
import CourseCard from '@/components/courses/CourseCard';
import LinkTag from '@/components/ui/LinkTag';

export default async function CoursesPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect('/');
  }

  await connectDB();

  const courses = await Course.find({ userId }).sort({ createdAt: -1 });
  const plainCourses = JSON.parse(JSON.stringify(courses));

  return (
    // 🛠️ FIX: Use w-[90%] to take up 90% of screen width and mx-auto to center it
    <div className="w-[90%] mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-sky-400 to-emerald-400">
          My Courses
        </h1>

        <LinkTag path="/teacher/create">
          <button className="bg-sky-600 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-sky-500 transition shadow-[0_0_15px_rgba(14,165,233,0.3)] border border-sky-500">
            + New Course
          </button>
        </LinkTag>
      </div>

      {/* Grid Layout: Kept the column settings from before, but now they have more room to breathe */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {plainCourses.length === 0 ? (
          <div className="col-span-full text-center text-slate-400 mt-20 italic">
            No courses found. Create your first one to get started!
          </div>
        ) : (
          plainCourses.map((course) => (
            <CourseCard
              key={course._id}
              id={course._id}
              title={course.title}
              price={course.price}
              imageUrl={course.imageUrl}
              category={course.category}
              isPublished={course.isPublished}
              chaptersLength={course.chapters.length}
            />
          ))
        )}
      </div>
    </div>
  );
}

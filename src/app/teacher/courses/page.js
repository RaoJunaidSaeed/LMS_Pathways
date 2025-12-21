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

  // 1. Fetch ALL courses for this user (Sorted by newest first)
  const courses = await Course.find({ userId }).sort({ createdAt: -1 }); // -1 means Descending order (Newest first)

  // 2. Serialize Data (Fix for "Plain Object" error)
  const plainCourses = JSON.parse(JSON.stringify(courses));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Courses</h1>
        <LinkTag path="/teacher/create">
          <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition">
            + New Course
          </button>
        </LinkTag>
      </div>

      {/* 3. The Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {plainCourses.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 mt-10">
            No courses found. Create your first one!
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
            />
          ))
        )}
      </div>
    </div>
  );
}

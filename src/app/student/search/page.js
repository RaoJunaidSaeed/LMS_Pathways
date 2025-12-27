import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/db';
import Course from '@/models/Course';
import Category from '@/models/Category';
import CourseCard from '@/components/courses/CourseCard';
import Categories from '@/components/search/Categories';
import SearchInput from '@/components/search/SearchInput';

export default async function SearchPage({ searchParams }) {
  const { userId } = await auth();
  if (!userId) return redirect('/');

  await connectDB();

  const categories = await Category.find().sort({ name: 1 });

  // Filter Logic
  const title = (await searchParams).title;
  const categoryId = (await searchParams).categoryId;

  const query = { isPublished: true };
  if (title) query.title = { $regex: title, $options: 'i' };
  if (categoryId) query.category = categoryId;

  const courses = await Course.find(query).sort({ createdAt: -1 });

  return (
    <div className="p-6 text-slate-200 w-[90%] mx-auto">
      {/* Header & Search */}
      <div className="mb-6 space-y-4">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-sky-400 to-emerald-400">
          Browse Courses
        </h1>
        <div className="md:hidden block">
          <SearchInput />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <Categories items={JSON.parse(JSON.stringify(categories))} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length === 0 ? (
          <div className="col-span-full text-center text-slate-400 mt-10">No courses found.</div>
        ) : (
          courses.map((course) => (
            // NOTE: We need to update CourseCard to link to /student/courses/[id]
            // instead of /teacher/courses/[id] when in student mode.
            // For now, pass a prop 'isStudentView={true}' if you update the card,
            // or just ensure the LinkTag inside CourseCard is dynamic.
            <CourseCard
              key={course._id}
              id={course._id}
              title={course.title}
              price={course.price}
              imageUrl={course.imageUrl}
              category={course.category}
              isPublished={course.isPublished}
              chaptersLength={course.chapters.length}
              baseUrl="/student/courses"
            />
          ))
        )}
      </div>
    </div>
  );
}

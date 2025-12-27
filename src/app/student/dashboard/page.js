import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/db';
import Purchase from '@/models/Purchase';
import LinkTag from '@/components/ui/LinkTag';
import CourseCard from '@/components/courses/CourseCard';

// 🛠️ CRITICAL FIX: Import these models so Mongoose registers them
import Course from '@/models/Course';
import Chapter from '@/models/Chapter';

export default async function StudentDashboard() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) return redirect('/');

  await connectDB();

  // 1. Fetch Purchases & Populate Course Data
  // Now Mongoose knows what "Course" and "Chapter" are
  const purchases = await Purchase.find({ userId })
    .populate({
      path: 'courseId',
      populate: { path: 'chapters' }, // This line caused the error
    })
    .sort({ createdAt: -1 });

  // 2. Extract Courses from Purchases
  const enrolledCourses = purchases
    .map((purchase) => purchase.courseId)
    .filter((course) => course !== null);

  const coursesToShow = JSON.parse(JSON.stringify(enrolledCourses));

  return (
    <div className="p-6 text-slate-200 w-[90%] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-sky-400 to-emerald-400">
          My Learning
        </h1>
        <p className="text-slate-400 mt-2">
          Welcome back, {user?.firstName}. Pick up where you left off.
        </p>
      </div>

      {coursesToShow.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesToShow.map((course) => (
            <CourseCard
              key={course._id}
              id={course._id}
              title={course.title}
              price={course.price}
              imageUrl={course.imageUrl}
              category={course.category}
              isPublished={course.isPublished}
              chaptersLength={course.chapters?.length || 0}
              baseUrl="/student/courses" // Ensure they go to student view
            />
          ))}
        </div>
      ) : (
        // Empty State
        <div className="bg-slate-900/40 backdrop-blur-sm p-12 rounded-xl border-2 border-dashed border-slate-700 text-center">
          <div className="p-4 rounded-full bg-slate-800/50 inline-block mb-4">🎓</div>
          <h3 className="text-xl font-semibold text-slate-200">No enrollments yet</h3>
          <p className="text-slate-400 mt-2 mb-6">
            You haven't joined any courses yet. Visit the Browse page to find one!
          </p>
          <LinkTag path="/student/search">
            <button className="bg-sky-600 text-white px-6 py-2 rounded-md font-medium hover:bg-sky-500 transition shadow-lg">
              Browse Courses
            </button>
          </LinkTag>
        </div>
      )}
    </div>
  );
}

// import { auth, currentUser } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import connectDB from '@/lib/db';
// import Purchase from '@/models/Purchase';
// import LinkTag from '@/components/ui/LinkTag';
// import CourseCard from '@/components/courses/CourseCard';

// export default async function StudentDashboard() {
//   const { userId } = await auth();
//   const user = await currentUser();

//   if (!userId) return redirect('/');

//   await connectDB();

//   // 1. Fetch Purchases & Populate Course Data
//   const purchases = await Purchase.find({ userId })
//     .populate({
//       path: 'courseId',
//       populate: { path: 'chapters' }, // Needed to count chapters
//     })
//     .sort({ createdAt: -1 });

//   // 2. Extract Courses from Purchases
//   const enrolledCourses = purchases
//     .map((purchase) => purchase.courseId)
//     .filter((course) => course !== null); // Safety check if course was deleted

//   const coursesToShow = JSON.parse(JSON.stringify(enrolledCourses));

//   return (
//     <div className="p-6 text-slate-200 w-[90%] mx-auto">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-sky-400 to-emerald-400">
//           My Learning
//         </h1>
//         <p className="text-slate-400 mt-2">
//           Welcome back, {user?.firstName}. Pick up where you left off.
//         </p>
//       </div>

//       {coursesToShow.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {coursesToShow.map((course) => (
//             <CourseCard
//               key={course._id}
//               id={course._id}
//               title={course.title}
//               price={course.price}
//               imageUrl={course.imageUrl}
//               category={course.category}
//               isPublished={course.isPublished}
//               chaptersLength={course.chapters?.length || 0}
//             />
//           ))}
//         </div>
//       ) : (
//         // Empty State
//         <div className="bg-slate-900/40 backdrop-blur-sm p-12 rounded-xl border-2 border-dashed border-slate-700 text-center">
//           <div className="p-4 rounded-full bg-slate-800/50 inline-block mb-4">🎓</div>
//           <h3 className="text-xl font-semibold text-slate-200">No enrollments yet</h3>
//           <p className="text-slate-400 mt-2 mb-6">
//             You haven't joined any courses yet. Visit the Browse page to find one!
//           </p>
//           <LinkTag path="/student/search">
//             <button className="bg-sky-600 text-white px-6 py-2 rounded-md font-medium hover:bg-sky-500 transition shadow-lg">
//               Browse Courses
//             </button>
//           </LinkTag>
//         </div>
//       )}
//     </div>
//   );
// }

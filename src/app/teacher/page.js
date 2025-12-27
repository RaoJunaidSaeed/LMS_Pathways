import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/db';
import Course from '@/models/Course';
import Chapter from '@/models/Chapter'; // 1. Added Import: Required for populate to work
import LinkTag from '@/components/ui/LinkTag';
import CourseCard from '@/components/courses/CourseCard';

export default async function Dashboard() {
  // 1. Auth & User Data
  const user = await currentUser();
  const { userId } = await auth();

  if (!userId || !user) {
    return redirect('/');
  }

  // 2. Fetch Data from DB
  await connectDB();

  // Fetch all courses owned by user
  // 2. Added populate: This fills the 'chapters' array so we can count them
  const allCourses = await Course.find({ userId }).populate('chapters').sort({ createdAt: -1 });

  // 3. Calculate Stats
  // Active = Published courses
  const publishedCourses = allCourses.filter((course) => course.isPublished);
  const activeCoursesCount = publishedCourses.length;

  // Placeholder logic for Students & Earnings (Requires a 'Purchase' model later)
  const totalStudents = 0;
  const totalEarnings = 0;

  // 4. Clean Data (Serialization for Next.js)
  const plainPublishedCourses = JSON.parse(JSON.stringify(publishedCourses));
  const role = user.publicMetadata?.role;

  return (
    <div className="w-[90%] mx-auto py-10 min-h-screen">
      {/* --- HEADER SECTION --- */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-sky-400 to-emerald-400">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-slate-400 mt-2">
            You are logged in as a{' '}
            <span className="font-bold uppercase text-sky-400 tracking-wider">{role}</span>.
          </p>
        </div>
      </div>

      {/* --- INSTRUCTOR VIEW --- */}
      {role === 'teacher' && (
        <div className="space-y-10">
          {/* 1. Stats Grid (Real Data) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Students" value={totalStudents} icon="👥" />
            <StatCard title="Active Courses" value={activeCoursesCount} icon="📘" />
            <StatCard title="Total Earnings" value={`$${totalEarnings.toFixed(2)}`} icon="💰" />
          </div>

          {/* 2. Active Courses Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-100">Active Courses</h3>

              <div className="flex items-center gap-x-4">
                <LinkTag path="/teacher/courses">
                  <span className="text-sm text-sky-400 hover:text-sky-300 hover:underline cursor-pointer transition">
                    View All
                  </span>
                </LinkTag>

                <LinkTag path="/teacher/create">
                  <button className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-500 transition shadow-[0_0_15px_rgba(14,165,233,0.3)] border border-sky-500">
                    + New Course
                  </button>
                </LinkTag>
              </div>
            </div>

            {/* Course Grid or Empty State */}
            {plainPublishedCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {plainPublishedCourses.map((course) => (
                  <CourseCard
                    key={course._id}
                    id={course._id}
                    title={course.title}
                    price={course.price}
                    imageUrl={course.imageUrl}
                    category={course.category}
                    isPublished={course.isPublished}
                    // 3. Added Safety Check: Prevents crash if chapters is undefined
                    chaptersLength={course.chapters?.length || 0}
                  />
                ))}
              </div>
            ) : (
              // Empty State
              <div className="bg-slate-900/40 backdrop-blur-sm p-12 rounded-xl border-2 border-dashed border-slate-700 text-center flex flex-col items-center justify-center gap-y-4">
                <div className="p-4 rounded-full bg-slate-800/50">
                  <span className="text-4xl">📂</span>
                </div>
                <p className="text-slate-400">You have no published courses yet.</p>
                <LinkTag path="/teacher/create">
                  <span className="text-sky-400 hover:underline cursor-pointer">
                    Create and publish one now
                  </span>
                </LinkTag>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// --- Helper Component: StatCard ---
function StatCard({ title, value, icon }) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-xl border border-slate-700 shadow-lg hover:bg-slate-800/60 transition group">
      <div className="flex items-center justify-between">
        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider group-hover:text-sky-400 transition">
          {title}
        </p>
        <span className="text-2xl opacity-50 grayscale group-hover:grayscale-0 transition">
          {icon}
        </span>
      </div>
      <p className="text-3xl font-bold text-slate-100 mt-2">{value}</p>
    </div>
  );
}

// import { auth, currentUser } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import connectDB from '@/lib/db';
// import Course from '@/models/Course';
// import LinkTag from '@/components/ui/LinkTag';
// import CourseCard from '@/components/courses/CourseCard';

// export default async function Dashboard() {
//   // 1. Auth & User Data
//   const user = await currentUser();
//   const { userId } = await auth();

//   if (!userId || !user) {
//     return redirect('/');
//   }

//   // 2. Fetch Data from DB
//   await connectDB();

//   // Fetch all courses owned by user
//   const allCourses = await Course.find({ userId }).sort({ createdAt: -1 });

//   // 3. Calculate Stats
//   // Active = Published courses
//   const publishedCourses = allCourses.filter((course) => course.isPublished);
//   const activeCoursesCount = publishedCourses.length;

//   // Placeholder logic for Students & Earnings (Requires a 'Purchase' model later)
//   const totalStudents = 0;
//   const totalEarnings = 0;

//   // 4. Clean Data (Serialization for Next.js)
//   const plainPublishedCourses = JSON.parse(JSON.stringify(publishedCourses));
//   const role = user.publicMetadata?.role;

//   return (
//     <div className="w-[90%] mx-auto py-10 min-h-screen">
//       {/* --- HEADER SECTION --- */}
//       <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-sky-400 to-emerald-400">
//             Welcome back, {user.firstName}!
//           </h1>
//           <p className="text-slate-400 mt-2">
//             You are logged in as a{' '}
//             <span className="font-bold uppercase text-sky-400 tracking-wider">{role}</span>.
//           </p>
//         </div>
//       </div>

//       {/* --- INSTRUCTOR VIEW --- */}
//       {role === 'teacher' && (
//         <div className="space-y-10">
//           {/* 1. Stats Grid (Real Data) */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <StatCard title="Total Students" value={totalStudents} icon="👥" />
//             <StatCard title="Active Courses" value={activeCoursesCount} icon="📘" />
//             <StatCard title="Total Earnings" value={`$${totalEarnings.toFixed(2)}`} icon="💰" />
//           </div>

//           {/* 2. Active Courses Section */}
//           <div>
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-2xl font-bold text-slate-100">Active Courses</h3>

//               <div className="flex items-center gap-x-4">
//                 <LinkTag path="/teacher/courses">
//                   <span className="text-sm text-sky-400 hover:text-sky-300 hover:underline cursor-pointer transition">
//                     View All
//                   </span>
//                 </LinkTag>

//                 <LinkTag path="/teacher/create">
//                   <button className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-500 transition shadow-[0_0_15px_rgba(14,165,233,0.3)] border border-sky-500">
//                     + New Course
//                   </button>
//                 </LinkTag>
//               </div>
//             </div>

//             {/* Course Grid or Empty State */}
//             {plainPublishedCourses.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
//                 {plainPublishedCourses.map((course) => (
//                   <CourseCard
//                     key={course._id}
//                     id={course._id}
//                     title={course.title}
//                     price={course.price}
//                     imageUrl={course.imageUrl}
//                     category={course.category}
//                     isPublished={course.isPublished}
//                     chaptersLength={course.chapters.length}
//                   />
//                 ))}
//               </div>
//             ) : (
//               // Empty State
//               <div className="bg-slate-900/40 backdrop-blur-sm p-12 rounded-xl border-2 border-dashed border-slate-700 text-center flex flex-col items-center justify-center gap-y-4">
//                 <div className="p-4 rounded-full bg-slate-800/50">
//                   <span className="text-4xl">📂</span>
//                 </div>
//                 <p className="text-slate-400">You have no published courses yet.</p>
//                 <LinkTag path="/teacher/create">
//                   <span className="text-sky-400 hover:underline cursor-pointer">
//                     Create and publish one now
//                   </span>
//                 </LinkTag>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // --- Helper Component: StatCard ---
// function StatCard({ title, value, icon }) {
//   return (
//     <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-xl border border-slate-700 shadow-lg hover:bg-slate-800/60 transition group">
//       <div className="flex items-center justify-between">
//         <p className="text-slate-400 text-sm font-medium uppercase tracking-wider group-hover:text-sky-400 transition">
//           {title}
//         </p>
//         <span className="text-2xl opacity-50 grayscale group-hover:grayscale-0 transition">
//           {icon}
//         </span>
//       </div>
//       <p className="text-3xl font-bold text-slate-100 mt-2">{value}</p>
//     </div>
//   );
// }

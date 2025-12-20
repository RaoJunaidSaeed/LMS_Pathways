'use client';

import { useUser } from '@clerk/nextjs';
// import { useUserRole } from '@/utils/context/UserRoleContext';

export default function Dashboard() {
  const { user } = useUser();
  // const { role } = useUserRole();
  const role = user.publicMetadata.role;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.firstName}!</h1>
          <p className="text-gray-600 mt-1">
            You are logged in as a <span className="font-bold uppercase text-blue-600">{role}</span>
            .
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* --- STUDENT VIEW --- */}
        {role === 'student' && (
          <div className="space-y-8">
            {/* 1. The "Call to Action" Banner */}
            <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-lg flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">Ready to learn?</h2>
                <p className="opacity-90">Pick up where you left off or start something new.</p>
              </div>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-sm">
                Browse Courses
              </button>
            </div>

            {/* 2. Student Stats Grid (Converted from Instructor Stats) */}
            <div className="grid md:grid-cols-3 gap-6">
              <StatCard title="Enrolled Courses" value="0" />
              <StatCard title="Hours Learned" value="0h" />
              <StatCard title="Certificates Won" value="0" />
            </div>

            {/* 3. "My Learning" Section (Converted from "My Courses") */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">My Learning</h3>
                <a href="/courses" className="text-blue-600 font-semibold hover:underline text-sm">
                  View All
                </a>
              </div>

              {/* Empty State for Students */}
              <div className="bg-white p-12 rounded-xl border-2 border-dashed border-gray-300 text-center text-gray-400">
                <p className="mb-4">You haven't enrolled in any courses yet.</p>
                <button className="text-blue-600 font-bold hover:underline">
                  Browse Catalog &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- INSTRUCTOR VIEW (Hidden for now unless role changes) --- */}
        {role === 'teacher' && (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-gray-700">Instructor Dashboard</h2>
            <p className="text-gray-500">Switch to an instructor account to see this view.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple Helper Component
function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
      <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
  );
}

// 'use client'; // 1. Must be a Client Component to use Hooks

// import { useUser } from '@clerk/nextjs'; // Client-side user data
// import { useUserRole } from '@/utils/context/UserRoleContext'; // Your custom hook

// export default function Dashboard() {
//   // 2. Get user profile (Name, Image) from Clerk Client Hook
//   const { user } = useUser();

//   // 3. Get Role data from your Custom Context Hook
//   const { role } = useUserRole();

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       {/* Header Section */}
//       <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.firstName}!</h1>
//           <p className="text-gray-600 mt-1">
//             You are logged in as a <span className="font-bold uppercase text-blue-600">{role}</span>
//             .
//           </p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto">
//         {/* --- STUDENT VIEW --- */}
//         {role === 'student' && (
//           <div className="space-y-6">
//             <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-lg">
//               <h2 className="text-2xl font-bold mb-2">Ready to learn?</h2>
//               <p className="opacity-90 mb-6">You have 0 courses in progress.</p>
//               <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors">
//                 Browse Courses
//               </button>
//             </div>
//           </div>
//         )}

//         {/* --- INSTRUCTOR VIEW --- */}
//         {role === 'student' && (
//           <div className="grid md:grid-cols-3 gap-6">
//             <StatCard title="Total Students" value="0" />
//             <StatCard title="Active Courses" value="0" />
//             <StatCard title="Total Earnings" value="$0.00" />

//             <div className="md:col-span-3 mt-8">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-bold text-gray-800">My Courses</h3>
//                 <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold">
//                   + Create New Course
//                 </button>
//               </div>
//               <div className="bg-white p-12 rounded-xl border-2 border-dashed border-gray-300 text-center text-gray-400">
//                 You haven't created any courses yet.
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Simple Helper Component
// function StatCard({ title, value }) {
//   return (
//     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
//       <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{title}</p>
//       <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
//     </div>
//   );
// }

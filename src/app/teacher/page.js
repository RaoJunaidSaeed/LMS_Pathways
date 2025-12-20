'use client';

import LinkTag from '@/components/ui/LinkTag';
import { useUser } from '@clerk/nextjs';
// import { useUserRole } from '@/utils/context/UserRoleContext';

export default function Dashboard() {
  const { user } = useUser();
  // const { role } = useUserRole();
  const role = user?.publicMetadata?.role;

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

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">My Courses</h3>
        <LinkTag path="/teacher/courses">
          <span className="text-blue-600 hover:underline cursor-pointer">View All</span>
        </LinkTag>
      </div>
      {/* CONDITIONAL RENDERING BASED ON ROLE */}
      <div className="max-w-7xl mx-auto">
        {/* --- INSTRUCTOR VIEW --- */}
        {role === 'teacher' && (
          <div className="grid md:grid-cols-3 gap-6">
            <StatCard title="Total Students" value="0" />
            <StatCard title="Active Courses" value="0" />
            <StatCard title="Total Earnings" value="$0.00" />

            <div className="md:col-span-3 mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">My Courses</h3>
                <LinkTag path="/teacher/create">
                  <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold">
                    + Create New Course
                  </button>
                </LinkTag>
              </div>
              <div className="bg-white p-12 rounded-xl border-2 border-dashed border-gray-300 text-center text-gray-400">
                You haven't created any courses yet.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple Helper Component for Stats
function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
  );
}

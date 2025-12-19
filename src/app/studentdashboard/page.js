import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/db';
import User from '@/models/User';

export default async function Dashboard() {
  // 1. Get the current user from Clerk
  const { userId } = await auth();
  const user = await currentUser();

  // 2. Fetch the user's role from MongoDB
  // (We check DB to be 100% sure, though Clerk metadata is also an option)
  await connectDB();
  let dbUser = await User.findOne({ clerkId: userId });

  // Safety: If for some reason they exist in Clerk but not DB, send to onboarding
  // Safety: If for some reason they exist in Clerk but not DB, create them now (Sync)
  if (!dbUser) {
    if (user) {
      dbUser = await User.create({
        clerkId: userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0]?.emailAddress,
        imageUrl: user.imageUrl,
        role: user.publicMetadata?.role || 'student',
      });
    } else {
      redirect('/onboarding');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.firstName}!</h1>
          <p className="text-gray-600 mt-1">
            You are logged in as a{' '}
            <span className="font-bold uppercase text-blue-600">{dbUser.role}</span>.
          </p>
        </div>
      </div>

      {/* CONDITIONAL RENDERING BASED ON ROLE */}
      <div className="max-w-7xl mx-auto">
        {/* --- INSTRUCTOR VIEW --- */}
        {dbUser.role === 'student' && (
          <div className="grid md:grid-cols-3 gap-6">
            <StatCard title="Total Students" value="0" />
            <StatCard title="Active Courses" value="0" />
            <StatCard title="Total Earnings" value="$0.00" />

            <div className="md:col-span-3 mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">My Courses</h3>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold">
                  + Create New Course
                </button>
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

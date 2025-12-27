import Navbar from '@/components/ui/Navbar';
import StudentSidebar from '@/components/student/StudentSidebar';

export default function StudentLayout({ children }) {
  return (
    <div className="h-full bg-slate-950">
      {/* 1. Header (Same Navbar as Teacher, but cleaner) */}
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>

      {/* 2. Student Sidebar (Hidden on mobile) */}
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <StudentSidebar />
      </div>

      {/* 3. Main Content */}
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  );
}

import Navbar from '@/components/ui/Navbar';
import TeacherSidebar from '@/components/teacher/TeacherSidebar'; // We will ensure this exists in Step 2

export default function TeacherLayout({ children }) {
  return (
    <div className="h-full bg-slate-950">
      {/* 1. TOP NAVBAR (Fixed) */}
      <div className="h-[80px] md:pl-56 fixed top-0 w-full z-50">
        <Navbar />
      </div>

      {/* 2. TEACHER SIDEBAR (Fixed Left, Hidden on Mobile) */}
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <TeacherSidebar />
      </div>

      {/* 3. MAIN CONTENT */}
      <main className="md:pl-56 pt-[80px]  bg-slate-950">{children}</main>
    </div>
  );
}

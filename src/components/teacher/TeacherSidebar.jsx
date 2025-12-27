'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const teacherRoutes = [
  {
    icon: '📚',
    label: 'Courses',
    href: '/teacher/courses',
  },
  {
    icon: '📊',
    label: 'Analytics',
    href: '/teacher/analytics',
  },
];

export default function TeacherSidebar() {
  const pathname = usePathname();

  return (
    <div className="h-full border-r border-slate-700 bg-slate-900 flex flex-col overflow-y-auto shadow-xl">
      {/* Sidebar Header / Logo Area */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">👨‍🏫</div>
          <h1 className="font-bold text-xl text-slate-100">Instructor</h1>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col w-full">
        {teacherRoutes.map((route) => {
          // Check active state (starts with to catch sub-pages like /teacher/courses/123)
          const isActive = pathname?.startsWith(route.href);

          return (
            <Link
              key={route.href}
              href={route.href}
              className={`
                flex items-center gap-x-2 pl-6 transition-all h-14 text-sm font-medium
                ${
                  isActive
                    ? 'text-sky-400 bg-slate-800 border-r-4 border-sky-400'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }
              `}
            >
              <span>{route.icon}</span>
              {route.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

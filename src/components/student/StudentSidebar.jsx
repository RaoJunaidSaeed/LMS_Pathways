'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LinkTag from '../ui/LinkTag';

const studentRoutes = [
  {
    icon: '🎓',
    label: 'My Learning',
    href: '/student/dashboard',
  },
  {
    icon: '🔍',
    label: 'Browse Courses',
    href: '/student/search', // Now inside /student
  },
];

export default function StudentSidebar() {
  const pathname = usePathname();

  return (
    <div className="h-full border-r border-slate-700 bg-slate-900 flex flex-col overflow-y-auto shadow-xl">
      <LinkTag path="/">
        <div className="flex items-center gap-2 p-6">
          <div className="bg-sky-500/20 p-2 rounded-lg text-sky-400">📚</div>
          <h1 className="font-bold text-xl text-slate-100">Pathways</h1>
        </div>
      </LinkTag>

      <div className="flex flex-col w-full">
        {studentRoutes.map((route) => {
          const isActive = pathname === route.href; // Strict match usually better here

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

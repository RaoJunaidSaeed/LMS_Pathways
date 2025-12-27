'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function CourseSidebarItem({ label, id, isCompleted, courseId, isLocked }) {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? '🔒' : isCompleted ? '✅' : '▶️';

  // Check if this specific chapter is currently active
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/student/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={`
        flex items-center gap-x-2 text-slate-400 text-sm font-medium pl-6 transition-all hover:text-slate-200 hover:bg-slate-800/50 h-14 w-full text-left
        ${isActive && 'text-sky-400 bg-slate-800 border-r-4 border-sky-400'}
        ${isCompleted && 'text-emerald-400 hover:text-emerald-300'}
        ${isCompleted && isActive && 'bg-emerald-900/20'}
      `}
    >
      <div className="flex items-center gap-x-2 p-4 ">
        <span>{Icon}</span>
        <span className={isActive ? 'text-slate-100' : ''}>{label}</span>
      </div>
    </button>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { publishCourse, unpublishCourse, deleteCourse } from '@/lib/actions/course'; // Import deleteCourse
import { toast } from 'react-hot-toast';

export default function CourseActions({ disabled, courseId, isPublished }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await unpublishCourse(courseId);
        toast.success('Course unpublished');
      } else {
        await publishCourse(courseId);
        toast.success('Course published!');
      }
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this ENTIRE course? This cannot be undone.'
    );
    if (!confirm) return;

    try {
      setIsLoading(true);
      await deleteCourse(courseId);
      toast.success('Course deleted');
      router.push(`/teacher/courses`); // Redirect to Course List
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <button
        onClick={onClick}
        disabled={disabled || isLoading}
        className={`
          text-sm font-medium px-4 py-2 rounded-md transition border shadow-sm
          ${
            disabled
              ? 'bg-slate-700 text-slate-400 border-slate-600 cursor-not-allowed opacity-50'
              : isPublished
              ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 hover:text-white'
              : 'bg-sky-600 text-white border-sky-500 hover:bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.3)]'
          }
        `}
      >
        {isPublished ? 'Unpublish' : 'Publish'}
      </button>

      <button
        onClick={onDelete}
        disabled={isLoading}
        className="p-2 rounded-md bg-slate-800 hover:bg-red-900/20 text-slate-400 hover:text-red-500 border border-slate-700 hover:border-red-500/30 transition"
      >
        🗑️
      </button>
    </div>
  );
}

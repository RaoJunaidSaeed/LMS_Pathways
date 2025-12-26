'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteChapter, publishChapter, unpublishChapter } from '@/lib/actions/chapter'; // Path preserved
import { toast } from 'react-hot-toast';

export default function ChapterActions({ disabled, courseId, chapterId, isPublished }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await unpublishChapter(courseId, chapterId);
        toast.success('Chapter unpublished successfully');
      } else {
        await publishChapter(courseId, chapterId);
        toast.success('Chapter published successfully');
      }
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this chapter?');
    if (!confirm) return;

    try {
      setIsLoading(true);
      await deleteChapter(courseId, chapterId);
      toast.success('Chapter deleted');
      router.refresh();
      router.push(`/teacher/courses/${courseId}`); // Redirect back to Course Page
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
          text-sm font-medium px-4 py-2 rounded-md transition
          ${
            isPublished
              ? 'text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700'
              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30'
          }
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {isPublished ? 'Unpublish' : 'Publish'}
      </button>

      <button
        onClick={onDelete}
        disabled={isLoading}
        className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 p-2 rounded-md transition disabled:opacity-50"
      >
        <span className="h-4 w-4">🗑️</span>
      </button>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteChapter, publishChapter, unpublishChapter } from '@/lib/actions/chapter';

export default function ChapterActions({ disabled, courseId, chapterId, isPublished }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await unpublishChapter(courseId, chapterId);
      } else {
        await publishChapter(courseId, chapterId);
      }
      router.refresh();
    } catch {
      alert('Something went wrong');
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
      router.refresh();
      router.push(`/teacher/courses/${courseId}`); // Go back to course page
    } catch {
      alert('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <button
        onClick={onClick}
        disabled={disabled || isLoading}
        className="text-sm border border-slate-200 bg-white hover:bg-slate-100 px-3 py-1 rounded-md transition"
      >
        {isPublished ? 'Unpublish' : 'Publish'}
      </button>

      <button
        onClick={onDelete}
        disabled={isLoading}
        className="bg-black text-white p-2 rounded-md hover:bg-slate-800 transition"
      >
        🗑️
      </button>
    </div>
  );
}

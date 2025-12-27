'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toggleChapterCompletion } from '@/lib/actions/progress';
import { toast } from 'react-hot-toast';

export default function CourseProgressButton({ chapterId, courseId, isCompleted, nextChapterId }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      // Toggle the status
      await toggleChapterCompletion(chapterId, !isCompleted, courseId);

      // If we just finished a chapter and there is a next one, ask to move on
      if (!isCompleted && nextChapterId) {
        toast.success('Chapter completed!');
        router.push(`/student/courses/${courseId}/chapters/${nextChapterId}`);
      } else {
        toast.success(isCompleted ? 'Progress reset' : 'Chapter completed');
        router.refresh();
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = isCompleted ? '✅' : '⭕';

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`
        flex items-center gap-x-2 px-4 py-2 rounded-md font-medium transition border
        ${
          isCompleted
            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 hover:bg-emerald-500/30'
            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
        }
      `}
    >
      <span>{Icon}</span>
      {isCompleted ? 'Completed' : 'Mark as complete'}
    </button>
  );
}

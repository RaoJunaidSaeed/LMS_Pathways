'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createChapter } from '@/lib/actions/chapter'; // Path preserved
import { toast } from 'react-hot-toast';
import GlassCard from '@/components/ui/GlassCard';

export default function ChaptersForm({ initialData, courseId }) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleCreating = () => setIsCreating((current) => !current);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await createChapter(courseId, title);

      if (result && result.success) {
        setTitle('');
        setIsCreating(false);
        toast.success('Chapter created successfully');
        router.refresh();
      } else {
        toast.error('Something went wrong');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const onEdit = (id) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };

  return (
    <GlassCard className="mt-6">
      {/* HEADER */}
      <div className="font-medium flex items-center justify-between text-slate-100">
        Course chapters
        <button
          onClick={toggleCreating}
          className="text-sky-400 hover:text-sky-300 transition text-sm font-semibold"
        >
          {isCreating ? 'Cancel' : 'Add a chapter'}
        </button>
      </div>

      {/* CREATE FORM */}
      {isCreating && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <input
            disabled={isLoading}
            className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-900/50 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
            placeholder="e.g. 'Introduction to the course'"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            disabled={isLoading || !title}
            type="submit"
            className="bg-sky-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-sky-600 transition disabled:opacity-50"
          >
            Create
          </button>
        </form>
      )}

      {/* LIST OF CHAPTERS */}
      {!isCreating && (
        <div className={`mt-2 ${!initialData.chapters.length && 'text-slate-500 italic text-sm'}`}>
          {!initialData.chapters.length && 'No chapters yet.'}

          <div className="flex flex-col gap-y-2 mt-2">
            {initialData.chapters.map((chapter) => (
              <div
                key={chapter._id}
                className={`
                  flex items-center justify-between p-3 rounded-md border transition
                  ${
                    chapter.isPublished
                      ? 'bg-sky-900/10 border-sky-500/20 text-sky-100'
                      : 'bg-slate-800/40 border-slate-700 text-slate-300'
                  }
                `}
              >
                <div className="flex-1 truncate font-medium flex items-center gap-x-2">
                  {chapter.title}
                </div>

                <div className="ml-auto pr-2 flex items-center gap-x-2">
                  {chapter.isFree && (
                    <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full border border-blue-500/20">
                      Free
                    </span>
                  )}

                  <span
                    className={`text-xs px-2 py-1 rounded-full border ${
                      chapter.isPublished
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                    }`}
                  >
                    {chapter.isPublished ? 'Published' : 'Draft'}
                  </span>

                  <button
                    onClick={() => onEdit(chapter._id)}
                    className="hover:text-white hover:bg-white/10 p-1 rounded transition text-slate-400"
                  >
                    ✏️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isCreating && (
        <p className="text-xs text-slate-500 mt-4">
          Drag and drop to reorder the chapters (Coming Soon)
        </p>
      )}
    </GlassCard>
  );
}

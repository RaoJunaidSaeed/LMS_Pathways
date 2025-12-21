'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createChapter } from '@/lib/actions/chapter';
import { toast } from 'react-hot-toast'; // or use alert()

export default function ChaptersForm({ initialData, courseId }) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleCreating = () => setIsCreating((current) => !current);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await createChapter(courseId, title);

    if (result.success) {
      setTitle('');
      setIsCreating(false);
      toast.success('Chapter created successfully');
      router.refresh();
    } else {
      toast.error('Something went wrong');
    }
    setIsLoading(false);
  };

  const onEdit = (id) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      {/* HEADER */}
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <button onClick={toggleCreating} className="text-blue-700 hover:underline text-sm">
          {isCreating ? 'Cancel' : 'Add a chapter'}
        </button>
      </div>

      {/* CREATE FORM */}
      {isCreating && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <input
            disabled={isLoading}
            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="e.g. 'Introduction to the course'"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            disabled={isLoading || !title}
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800"
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
                className="flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-2 text-sm p-2"
              >
                <div className="flex-1 truncate font-medium">{chapter.title}</div>
                <div className="ml-auto pr-2 flex items-center gap-x-2">
                  {chapter.isFree && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      Free
                    </span>
                  )}
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      chapter.isPublished
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {chapter.isPublished ? 'Published' : 'Draft'}
                  </span>
                  <button
                    onClick={() => onEdit(chapter._id)}
                    className="hover:opacity-75 transition"
                  >
                    ✏️ {/* Edit Icon Placeholder */}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4 text-slate-500">
          Drag and drop to reorder the chapters (Coming Soon)
        </p>
      )}
    </div>
  );
}

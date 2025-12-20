'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateChapter } from '@/lib/actions/chapter';

export default function ChapterTitleForm({ initialData, courseId, chapterId }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.title);
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await updateChapter(courseId, chapterId, { title });
    setIsEditing(false);
    router.refresh();
    setIsLoading(false);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter title
        <button onClick={toggleEdit} className="text-blue-700 hover:underline text-sm">
          {isEditing ? 'Cancel' : 'Edit title'}
        </button>
      </div>
      {!isEditing && <p className="text-sm mt-1">{initialData.title}</p>}
      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <input
            disabled={isLoading}
            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            disabled={isLoading || !title}
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800"
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
}

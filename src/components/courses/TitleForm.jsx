'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateCourse } from '@/lib/actions/course'; // Check your import path (lib/actions vs actions)
import { toast } from 'react-hot-toast';
import GlassCard from '@/components/ui/GlassCard';

export default function TitleForm({ initialData, courseId }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.title);
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Ensure your action returns { success: true } or throws error
    try {
      await updateCourse(courseId, { title: title });
      toast.success('Title updated successfully');
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlassCard className="mt-6">
      <div className="font-medium flex items-center justify-between text-slate-100">
        Course title
        <button
          onClick={toggleEdit}
          className="text-sky-400 hover:text-sky-300 transition text-sm font-semibold"
        >
          {isEditing ? 'Cancel' : 'Edit title'}
        </button>
      </div>

      {!isEditing && <p className="text-sm mt-2 text-slate-300">{initialData.title}</p>}

      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            disabled={isLoading}
            className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-900/50 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
            placeholder="e.g. 'Advanced Web Development'"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex items-center gap-x-2">
            <button
              disabled={isLoading || !title}
              type="submit"
              className="bg-sky-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-sky-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </GlassCard>
  );
}

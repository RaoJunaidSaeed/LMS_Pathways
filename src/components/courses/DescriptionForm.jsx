'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateCourse } from '@/lib/actions/course'; // Path preserved as requested
import { toast } from 'react-hot-toast';
import GlassCard from '@/components/ui/GlassCard';

export default function DescriptionForm({ initialData, courseId }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(initialData.description || '');
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await updateCourse(courseId, { description });

      // Check for success property based on your action's return structure
      if (result && !result.error) {
        toast.success('Description updated successfully');
        setIsEditing(false);
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

  return (
    <GlassCard className="mt-6">
      <div className="font-medium flex items-center justify-between text-slate-100">
        Course description
        <button
          onClick={toggleEdit}
          className="text-sky-400 hover:text-sky-300 transition text-sm font-semibold"
        >
          {isEditing ? 'Cancel' : 'Edit description'}
        </button>
      </div>

      {!isEditing && (
        <div className={`text-sm mt-2 ${!initialData.description && 'text-slate-500 italic'}`}>
          {!initialData.description && 'No description provided'}
          {initialData.description && (
            <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {initialData.description}
            </div>
          )}
        </div>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <textarea
            disabled={isLoading}
            className="flex w-full rounded-md border border-slate-600 bg-slate-900/50 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
            rows="5"
            placeholder="e.g. 'This course covers the fundamentals of...'"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            disabled={isLoading || !description}
            type="submit"
            className="bg-sky-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-sky-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </form>
      )}
    </GlassCard>
  );
}

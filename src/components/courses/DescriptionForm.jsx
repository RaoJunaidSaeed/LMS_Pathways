'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateCourse } from '@/lib/actions/course';
import { toast } from 'react-hot-toast'; // or use alert()

export default function DescriptionForm({ initialData, courseId }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(initialData.description || '');
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await updateCourse(courseId, { description });
    if (result.success) {
      setIsEditing(false);
      toast.success('Description updated successfully');
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course description
        <button onClick={toggleEdit} className="text-blue-700 hover:underline text-sm">
          {isEditing ? 'Cancel' : 'Edit description'}
        </button>
      </div>

      {!isEditing && (
        <p className={`text-sm mt-2 ${!initialData.description && 'text-slate-500 italic'}`}>
          {initialData.description || 'No description provided'}
        </p>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <textarea
            disabled={isLoading}
            className="flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows="5"
            placeholder="e.g. 'This course is about...'"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            disabled={isLoading || !description}
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800 disabled:opacity-50"
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateCourse } from '@/lib/actions/course';

export default function CategoryForm({ initialData, courseId, options }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialData.category || '');
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await updateCourse(courseId, { category: selectedCategory });

    if (result.success) {
      setIsEditing(false);
      router.refresh();
    }
    setIsLoading(false);
  };

  const selectedOption = options.find((option) => option.value === initialData.category);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Category
        <button onClick={toggleEdit} className="text-blue-700 hover:underline text-sm">
          {isEditing ? 'Cancel' : 'Edit category'}
        </button>
      </div>

      {!isEditing && (
        <p className={`text-sm mt-2 ${!initialData.category && 'text-slate-500 italic'}`}>
          {selectedOption?.label || 'No category selected'}
        </p>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <select
            disabled={isLoading}
            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>
              Select a category
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            disabled={isLoading || !selectedCategory}
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

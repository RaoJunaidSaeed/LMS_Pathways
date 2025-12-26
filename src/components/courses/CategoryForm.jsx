'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateCourse } from '@/lib/actions/course'; // Path preserved
import { toast } from 'react-hot-toast';
import GlassCard from '@/components/ui/GlassCard';

export default function CategoryForm({ initialData, courseId, options }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialData.category || '');
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await updateCourse(courseId, { category: selectedCategory });

      if (result && result.success) {
        setIsEditing(false);
        toast.success('Category updated successfully');
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

  const selectedOption = options.find((option) => option.value === initialData.category);

  return (
    <GlassCard className="mt-6">
      <div className="font-medium flex items-center justify-between text-slate-100">
        Course Category
        <button
          onClick={toggleEdit}
          className="text-sky-400 hover:text-sky-300 transition text-sm font-semibold"
        >
          {isEditing ? 'Cancel' : 'Edit category'}
        </button>
      </div>

      {!isEditing && (
        <p
          className={`text-sm mt-2 ${
            !initialData.category ? 'text-slate-500 italic' : 'text-slate-300'
          }`}
        >
          {selectedOption?.label || 'No category selected'}
        </p>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <select
            disabled={isLoading}
            className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-900/50 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled className="bg-slate-800 text-slate-400">
              Select a category
            </option>
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-slate-800 text-slate-100"
              >
                {option.label}
              </option>
            ))}
          </select>
          <button
            disabled={isLoading || !selectedCategory}
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

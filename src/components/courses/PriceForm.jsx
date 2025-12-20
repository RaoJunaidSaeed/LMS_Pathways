'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateCourse } from '@/lib/actions/course';

export default function PriceForm({ initialData, courseId }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(initialData.price || '');
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await updateCourse(courseId, { price: Number(price) });
    if (result.success) {
      setIsEditing(false);
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course price
        <button onClick={toggleEdit} className="text-blue-700 hover:underline text-sm">
          {isEditing ? 'Cancel' : 'Edit price'}
        </button>
      </div>

      {!isEditing && (
        <p className={`text-sm mt-2 ${!initialData.price && 'text-slate-500 italic'}`}>
          {initialData.price ? `$${initialData.price}` : 'No price set'}
        </p>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="number"
            step="0.01"
            disabled={isLoading}
            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Set a price for your course"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button
            disabled={isLoading}
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

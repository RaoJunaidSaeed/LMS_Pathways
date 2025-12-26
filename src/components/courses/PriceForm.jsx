'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateCourse } from '@/lib/actions/course'; // Path preserved
import { toast } from 'react-hot-toast';
import GlassCard from '@/components/ui/GlassCard';

export default function PriceForm({ initialData, courseId }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(initialData.price || '');
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Ensure price is sent as a number
      const result = await updateCourse(courseId, { price: parseFloat(price) });

      if (result && result.success) {
        setIsEditing(false);
        toast.success('Price updated successfully');
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
        Course price
        <button
          onClick={toggleEdit}
          className="text-sky-400 hover:text-sky-300 transition text-sm font-semibold"
        >
          {isEditing ? 'Cancel' : 'Edit price'}
        </button>
      </div>

      {!isEditing && (
        <p
          className={`text-sm mt-2 ${
            !initialData.price ? 'text-slate-500 italic' : 'text-slate-300'
          }`}
        >
          {initialData.price ? `$${initialData.price}` : 'No price set'}
        </p>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="number"
            step="0.01"
            disabled={isLoading}
            className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-900/50 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
            placeholder="Set a price for your course"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button
            disabled={isLoading || !price}
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

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateChapter } from '@/lib/actions/chapter';
import { toast } from 'react-hot-toast';
import GlassCard from '@/components/ui/GlassCard';

export default function ChapterAccessForm({ initialData, courseId, chapterId }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isFree, setIsFree] = useState(!!initialData.isFree); // Double bang ensures boolean
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateChapter(courseId, chapterId, { isFree: isFree });
      toast.success('Chapter access updated');
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
        Chapter access
        <button
          onClick={toggleEdit}
          className="text-sky-400 hover:text-sky-300 transition text-sm font-semibold"
        >
          {isEditing ? 'Cancel' : 'Edit access'}
        </button>
      </div>

      {!isEditing && (
        <p className={`text-sm mt-2 ${!initialData.isFree ? 'text-slate-300' : 'text-slate-300'}`}>
          {initialData.isFree ? (
            <span className="text-emerald-400 font-medium">This chapter is free for preview.</span>
          ) : (
            <span className="text-slate-400 italic">This chapter is not free.</span>
          )}
        </p>
      )}

      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <div className="flex items-start space-x-3 space-y-0 rounded-md border border-slate-600 p-4 bg-slate-900/50">
            <input
              type="checkbox"
              id="isFree"
              checked={isFree}
              onChange={(e) => setIsFree(e.target.checked)}
              disabled={isLoading}
              className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-sky-500 focus:ring-sky-500 focus:ring-offset-slate-900 mt-1"
            />
            <div className="space-y-1 leading-none">
              <label
                htmlFor="isFree"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-200"
              >
                Free for preview
              </label>
              <p className="text-xs text-slate-400">
                Check this box if you want to make this chapter free for preview.
              </p>
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-sky-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-sky-600 transition disabled:opacity-50"
          >
            Save
          </button>
        </form>
      )}
    </GlassCard>
  );
}

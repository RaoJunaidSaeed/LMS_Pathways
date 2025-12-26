'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateChapter } from '@/lib/actions/chapter'; // Path preserved
import { toast } from 'react-hot-toast';
import GlassCard from '@/components/ui/GlassCard';

export default function ChapterVideoForm({ initialData, courseId, chapterId }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [videoUrl, setVideoUrl] = useState(initialData.videoUrl || '');
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateChapter(courseId, chapterId, { videoUrl: videoUrl });
      toast.success('Chapter video updated successfully');
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  // HELPER: Extract Video ID from various YouTube link formats
  const getVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getVideoId(initialData.videoUrl);

  return (
    <GlassCard className="mt-6">
      <div className="font-medium flex items-center justify-between text-slate-100">
        Chapter Video
        <button
          onClick={toggleEdit}
          className="text-sky-400 hover:text-sky-300 transition text-sm font-semibold"
        >
          {isEditing ? 'Cancel' : 'Edit video'}
        </button>
      </div>

      {/* VIEW MODE: Native Iframe */}
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-800/50 rounded-md mt-4 border border-dashed border-slate-600 text-slate-400">
            📺 No video yet
          </div>
        ) : (
          <div className="relative aspect-video mt-4 bg-black rounded-md overflow-hidden border border-slate-700 shadow-lg">
            {videoId ? (
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-300">
                Invalid Video URL
              </div>
            )}
          </div>
        ))}

      {/* EDIT MODE */}
      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <input
            disabled={isLoading}
            className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-900/50 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
            placeholder="e.g. https://youtu.be/..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <div className="text-xs text-slate-400">
            Supports standard YouTube and Share (youtu.be) links.
          </div>
          <button
            disabled={isLoading || !videoUrl}
            type="submit"
            className="bg-sky-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-sky-600 transition disabled:opacity-50"
          >
            Save Video
          </button>
        </form>
      )}
    </GlassCard>
  );
}

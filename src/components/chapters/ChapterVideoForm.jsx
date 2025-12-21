'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateChapter } from '@/lib/actions/chapter';
import { toast } from 'react-hot-toast'; // or use alert()

export default function ChapterVideoForm({ initialData, courseId, chapterId }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [videoUrl, setVideoUrl] = useState(initialData.videoUrl || '');
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await updateChapter(courseId, chapterId, { videoUrl: videoUrl });
    setIsEditing(false);
    toast.success('Chapter video updated successfully');
    router.refresh();
    setIsLoading(false);
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
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Video
        <button onClick={toggleEdit} className="text-blue-700 hover:underline text-sm">
          {isEditing ? 'Cancel' : 'Edit video'}
        </button>
      </div>

      {/* VIEW MODE: Native Iframe */}
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md mt-4 text-slate-500">
            📺 No video yet
          </div>
        ) : (
          <div className="relative aspect-video mt-4 bg-black rounded-md overflow-hidden">
            {videoId ? (
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex items-center justify-center h-full text-white">
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
            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="e.g. https://youtu.be/..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <div className="text-xs text-slate-500">
            Supports standard YouTube and Share (youtu.be) links.
          </div>
          <button
            disabled={isLoading || !videoUrl}
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800"
          >
            Save Video
          </button>
        </form>
      )}
    </div>
  );
}

// 'use client';

// import { useState, useEffect } from 'react'; // Added useEffect
// import { useRouter } from 'next/navigation';
// import { updateChapter } from '@/lib/actions/chapter';
// import dynamic from 'next/dynamic';

// // 1. Dynamic Import
// const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

// export default function ChapterVideoForm({ initialData, courseId, chapterId }) {
//   const router = useRouter();

//   // 2. Mounted State
//   const [isMounted, setIsMounted] = useState(false);

//   const [isEditing, setIsEditing] = useState(false);
//   const [videoUrl, setVideoUrl] = useState(initialData.videoUrl || '');
//   const [isLoading, setIsLoading] = useState(false);

//   // 3. Force Client-Side Render Only
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // If not mounted yet, show nothing (Prevents the "Black Box" crash)
//   if (!isMounted) {
//     return null;
//   }

//   const toggleEdit = () => setIsEditing((current) => !current);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     await updateChapter(courseId, chapterId, { videoUrl: videoUrl });
//     setIsEditing(false);
//     router.refresh();
//     setIsLoading(false);
//   };

//   return (
//     <div className="mt-6 border bg-slate-100 rounded-md p-4">
//       <div className="font-medium flex items-center justify-between">
//         Chapter Video
//         <button onClick={toggleEdit} className="text-blue-700 hover:underline text-sm">
//           {isEditing ? 'Cancel' : 'Edit video'}
//         </button>
//       </div>

//       {!isEditing &&
//         (!initialData.videoUrl ? (
//           <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md mt-4 text-slate-500">
//             📺 No video yet
//           </div>
//         ) : (
//           // 4. Player Container
//           <div className="relative aspect-video mt-4 bg-slate-900 rounded-md overflow-hidden">
//             <ReactPlayer url={initialData.videoUrl} width="100%" height="100%" controls={true} />
//           </div>
//         ))}

//       {isEditing && (
//         <form onSubmit={onSubmit} className="space-y-4 mt-4">
//           <input
//             disabled={isLoading}
//             className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
//             placeholder="e.g. https://www.youtube.com/watch?v=..."
//             value={videoUrl}
//             onChange={(e) => setVideoUrl(e.target.value)}
//           />
//           <div className="text-xs text-muted-foreground text-slate-500">
//             Current stored URL: {initialData.videoUrl || 'None'}
//           </div>
//           <button
//             disabled={isLoading || !videoUrl}
//             type="submit"
//             className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800"
//           >
//             Save Video
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { updateChapter } from '@/lib/actions/chapter';
// import ReactPlayer from 'react-player'; // Use this to preview the video

// export default function ChapterVideoForm({ initialData, courseId, chapterId }) {
//   const router = useRouter();
//   const [isEditing, setIsEditing] = useState(false);
//   const [videoUrl, setVideoUrl] = useState(initialData.videoUrl || '');
//   const [isLoading, setIsLoading] = useState(false);

//   const toggleEdit = () => setIsEditing((current) => !current);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     // Save the URL to the database
//     await updateChapter(courseId, chapterId, { videoUrl: videoUrl });
//     setIsEditing(false);
//     router.refresh();
//     setIsLoading(false);
//   };

//   return (
//     <div className="mt-6 border bg-slate-100 rounded-md p-4">
//       <div className="font-medium flex items-center justify-between">
//         Chapter Video
//         <button onClick={toggleEdit} className="text-blue-700 hover:underline text-sm">
//           {isEditing ? 'Cancel' : 'Edit video'}
//         </button>
//       </div>

//       {/* PREVIEW MODE */}
//       {!isEditing &&
//         (!initialData.videoUrl ? (
//           <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md mt-4 text-slate-500">
//             📺 No video yet
//           </div>
//         ) : (
//           <div className="relative aspect-video mt-4 bg-black rounded-md overflow-hidden">
//             {/* This previews the YouTube video directly */}
//             <ReactPlayer url={initialData.videoUrl} width="100%" height="100%" controls />
//           </div>
//         ))}

//       {/* EDIT MODE */}
//       {isEditing && (
//         <form onSubmit={onSubmit} className="space-y-4 mt-4">
//           <p className="text-sm text-slate-500">Paste your YouTube link below:</p>
//           <input
//             disabled={isLoading}
//             className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
//             placeholder="e.g. https://www.youtube.com/watch?v=..."
//             value={videoUrl}
//             onChange={(e) => setVideoUrl(e.target.value)}
//           />
//           <button
//             disabled={isLoading || !videoUrl}
//             type="submit"
//             className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800"
//           >
//             Save Video
//           </button>
//         </form>
//       )}

//       {initialData.videoUrl && !isEditing && (
//         <div className="text-xs text-muted-foreground mt-2 text-slate-500">
//           Videos can take a few seconds to process.
//         </div>
//       )}
//     </div>
//   );
// }

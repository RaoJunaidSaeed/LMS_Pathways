'use client';

import { useState } from 'react';

export default function VideoPlayer({ playbackId, isLocked, title }) {
  const [isReady, setIsReady] = useState(false);

  // Helper to extract YouTube ID (same as before)
  const getVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getVideoId(playbackId);

  return (
    <div className="relative aspect-video bg-black rounded-md overflow-hidden">
      {/* 🔒 LOCKED STATE */}
      {isLocked ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 gap-y-2 text-slate-400">
          <span className="text-4xl">🔒</span>
          <p className="text-sm font-medium">This chapter is locked.</p>
          <p className="text-xs">Purchase the course to watch.</p>
        </div>
      ) : /* ▶️ VIDEO STATE */
      videoId ? (
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="flex items-center justify-center h-full text-slate-400">
          Video not found
        </div>
      )}
    </div>
  );
}

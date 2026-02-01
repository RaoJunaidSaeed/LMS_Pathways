'use client';

import { isYouTubeUrl, getVideoId } from '@/lib/utils';
import ReactPlayer from 'react-player';

export default function VideoPlayer({ playbackId, isLocked, title }) {
  const isYT = isYouTubeUrl(playbackId);
  const videoId = isYT ? getVideoId(playbackId) : null;

  return (
    <div className="relative aspect-video bg-black rounded-md overflow-hidden">
      {isLocked ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 gap-y-2 text-slate-400">
          <span className="text-4xl">&#x1f512;</span>
          <p className="text-sm font-medium">This chapter is locked.</p>
          <p className="text-xs">Purchase the course to watch.</p>
        </div>
      ) : isYT && videoId ? (
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : playbackId ? (
        <ReactPlayer
          url={playbackId}
          controls
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      ) : (
        <div className="flex items-center justify-center h-full text-slate-400">
          Video not found
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { updateChapter } from '@/lib/actions/chapter';
import { toast } from 'react-hot-toast';
import { isYouTubeUrl, getVideoId } from '@/lib/utils';
import { uploadToCloudinary } from '@/lib/cloudinary-upload';
import GlassCard from '@/components/ui/GlassCard';
import VideoRecorder from '@/components/chapters/VideoRecorder';

const TABS = [
  { key: 'youtube', label: 'YouTube URL' },
  { key: 'record', label: 'Record Video' },
  { key: 'upload', label: 'Upload File' },
];

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

export default function ChapterVideoForm({ initialData, courseId, chapterId }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('youtube');
  const [videoUrl, setVideoUrl] = useState(initialData.videoUrl || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [savedUrl, setSavedUrl] = useState(initialData.videoUrl || '');
  const fileInputRef = useRef(null);

  const toggleEdit = () => {
    setIsEditing((current) => !current);
    setUploadProgress(0);
    setIsUploading(false);
    setRecordedBlob(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Save a video URL (YouTube or Cloudinary)
  const saveVideoUrl = async (url) => {
    setIsLoading(true);
    try {
      await updateChapter(courseId, chapterId, { videoUrl: url });
      toast.success('Chapter video updated');
      setVideoUrl(url);
      setSavedUrl(url);
      setIsEditing(false);
      setIsUploading(false);
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  // YouTube tab submit
  const onYouTubeSubmit = (e) => {
    e.preventDefault();
    saveVideoUrl(videoUrl);
  };

  // Upload a blob/file to Cloudinary then save the URL
  const uploadAndSave = async (file) => {
    setIsUploading(true);
    setIsLoading(true);
    setUploadProgress(0);
    try {
      const url = await uploadToCloudinary(file, {
        onProgress: setUploadProgress,
      });
      await saveVideoUrl(url);
    } catch {
      toast.error('Video upload failed');
      setIsLoading(false);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Record tab: blob received from VideoRecorder
  const onRecordingComplete = (blob) => {
    setRecordedBlob(blob);
    uploadAndSave(blob);
  };

  // Upload tab: file selected
  const onFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File is too large. Maximum size is 100 MB.');
      e.target.value = '';
      return;
    }
    uploadAndSave(file);
  };

  const displayUrl = savedUrl;
  const ytId = getVideoId(displayUrl);
  const isYT = isYouTubeUrl(displayUrl);

  return (
    <GlassCard className="mt-6">
      <div className="font-medium flex items-center justify-between text-slate-100">
        Chapter Video
        <button
          onClick={toggleEdit}
          disabled={isUploading}
          className="text-sky-400 hover:text-sky-300 transition text-sm font-semibold disabled:opacity-50"
        >
          {isEditing ? 'Cancel' : 'Edit video'}
        </button>
      </div>

      {/* PREVIEW AREA — always visible */}
      {isUploading ? (
        /* Uploading state: show progress in the preview area */
        <div className="relative aspect-video mt-4 bg-slate-900 rounded-md overflow-hidden border border-slate-700 shadow-lg flex flex-col items-center justify-center gap-4">
          {/* Circular progress */}
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
              <circle
                cx="48" cy="48" r="40"
                fill="none"
                stroke="#334155"
                strokeWidth="6"
              />
              <circle
                cx="48" cy="48" r="40"
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - uploadProgress / 100)}
                className="transition-all duration-300"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-sky-400">
              {uploadProgress}%
            </span>
          </div>
          <p className="text-sm text-slate-400">Uploading video...</p>
          {/* Bottom progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
            <div
              className="h-full bg-sky-500 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      ) : !isEditing ? (
        /* View mode: show video or placeholder */
        !displayUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-800/50 rounded-md mt-4 border border-dashed border-slate-600 text-slate-400">
            No video yet
          </div>
        ) : (
          <div className="relative aspect-video mt-4 bg-black rounded-md overflow-hidden border border-slate-700 shadow-lg">
            {isYT && ytId ? (
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${ytId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : displayUrl ? (
              <video
                src={displayUrl}
                controls
                className="absolute top-0 left-0 w-full h-full object-contain"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-300">
                Invalid Video URL
              </div>
            )}
          </div>
        )
      ) : null}

      {/* EDIT MODE — tabs and inputs */}
      {isEditing && !isUploading && (
        <div className="mt-4 space-y-4">
          {/* Tab selector */}
          <div className="flex rounded-md overflow-hidden border border-slate-600">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                disabled={isLoading}
                onClick={() => {
                  setActiveTab(tab.key);
                  setUploadProgress(0);
                  setRecordedBlob(null);
                }}
                className={`flex-1 py-2 text-sm font-medium transition ${
                  activeTab === tab.key
                    ? 'bg-sky-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* YouTube Tab */}
          {activeTab === 'youtube' && (
            <form onSubmit={onYouTubeSubmit} className="space-y-4">
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

          {/* Record Tab */}
          {activeTab === 'record' && (
            <VideoRecorder onRecordingComplete={onRecordingComplete} />
          )}

          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <label className="flex flex-col items-center justify-center h-40 rounded-md border-2 border-dashed border-slate-600 bg-slate-800/50 hover:bg-slate-800 transition cursor-pointer">
              <span className="text-slate-300 text-sm font-medium">
                Click to select a video file
              </span>
              <span className="text-xs text-slate-500 mt-1">
                MP4, WebM, MOV — up to 100 MB
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={onFileSelect}
              />
            </label>
          )}
        </div>
      )}
    </GlassCard>
  );
}

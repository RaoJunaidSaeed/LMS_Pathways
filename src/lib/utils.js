// lib/utils.js

export function getYouTubeThumbnail(url, quality = 'hq') {
  if (!url) return null;

  // 1. Regex to extract the Video ID from various YouTube URL formats
  // Handles: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  // YouTube video IDs are always 11 characters long
  const videoId = match && match[2].length === 11 ? match[2] : null;

  if (!videoId) {
    // Return a fallback image if the URL is invalid
    return '/images/course-placeholder.jpg';
  }

  // 2. Return the requested quality
  // 'max' = HD (1280x720) - might not exist for old videos
  // 'hq'  = High Quality (480x360) - safest bet, always exists
  // 'mq'  = Medium Quality (320x180)

  if (quality === 'max') {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

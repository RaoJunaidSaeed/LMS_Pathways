// lib/utils.js

const YT_REGEX = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;

export function isYouTubeUrl(url) {
  if (!url) return false;
  const match = url.match(YT_REGEX);
  return !!(match && match[2].length === 11);
}

export function getVideoId(url) {
  if (!url) return null;
  const match = url.match(YT_REGEX);
  return match && match[2].length === 11 ? match[2] : null;
}

export function getYouTubeThumbnail(url, quality = 'hq') {
  const videoId = getVideoId(url);

  if (!videoId) {
    return '/images/course-placeholder.jpg';
  }

  if (quality === 'max') {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

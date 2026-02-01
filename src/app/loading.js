import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 bg-[#141E30]/80 z-50">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-400 border-t-transparent" />
      <p className="text-sky-400 text-lg font-medium animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
}

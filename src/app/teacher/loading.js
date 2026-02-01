import React from 'react';

export default function TeacherLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-400 border-t-transparent" />
      <p className="text-sky-400 text-lg font-medium animate-pulse">Loading, Please wait ⏳</p>
    </div>
  );
}

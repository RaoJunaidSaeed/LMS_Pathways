'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { publishCourse, unpublishCourse } from '@/lib/actions/course';
// import { toast } from 'react-hot-toast'; // or use alert()

export default function CourseActions({ disabled, courseId, isPublished }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await unpublishCourse(courseId);
        alert('Course unpublished'); // Replace with toast if available
      } else {
        await publishCourse(courseId);
        alert('Course published!'); // Replace with toast if available
        // confetti.onOpen(); // Future feature
      }

      router.refresh();
    } catch {
      alert('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <button
        onClick={onClick}
        disabled={disabled || isLoading}
        className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isPublished ? 'Unpublish' : 'Publish'}
      </button>

      {/* You can add a Delete Trash Icon here later if you want */}
    </div>
  );
}

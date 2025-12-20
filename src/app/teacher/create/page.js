'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCourse } from '@/lib/actions/course'; // Import the action above

export default function CreateCoursePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);

    // Call the Server Action
    const result = await createCourse(formData);

    if (result.success) {
      // Redirect to the future Setup Page
      router.push(`/teacher/courses/${result.courseId}`);
    } else {
      alert('Something went wrong');
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div className="w-full">
        <h1 className="text-2xl font-bold">Name your course</h1>
        <p className="text-sm text-slate-600 mb-8">
          What would you like to name your course? Don't worry, you can change this later.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8 mt-8">
          <div className="space-y-2">
            <label className="font-medium">Course Title</label>
            <input
              name="title"
              type="text"
              required
              disabled={isLoading}
              placeholder="e.g. 'Advanced Web Development'"
              className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            />
          </div>

          <div className="flex items-center gap-x-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCourse } from '@/lib/actions/course'; // Path preserved
import GlassCard from '@/components/ui/GlassCard'; // Optional wrapper for consistency
import { toast } from 'react-hot-toast';

export default function CreateCoursePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);

    try {
      const result = await createCourse(formData);

      if (result && result.success) {
        toast.success('Course created successfully');
        router.push(`/teacher/courses/${result.courseId}`);
      } else {
        toast.error('Something went wrong');
        setIsLoading(false);
      }
    } catch {
      toast.error('Something went wrong');
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6 text-slate-200">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-sky-400 to-emerald-400">
          Name your course
        </h1>
        <p className="text-sm text-slate-400 mb-8 mt-2">
          What would you like to name your course? Don&apos;t worry, you can change this later.
        </p>

        {/* Form wrapped in Glass Card style for focus */}
        <GlassCard className="p-8 mt-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="font-medium text-slate-300">Course Title</label>
              <input
                name="title"
                type="text"
                required
                disabled={isLoading}
                placeholder="e.g. 'Advanced Web Development'"
                className="flex h-12 w-full rounded-md border border-slate-600 bg-slate-900/50 px-4 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition disabled:opacity-50"
              />
            </div>

            <div className="flex items-center gap-x-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-slate-800 text-slate-300 border border-slate-700 px-4 py-2 rounded-md hover:bg-slate-700 hover:text-white transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-sky-600 text-white px-6 py-2 rounded-md font-medium hover:bg-sky-500 transition shadow-[0_0_15px_rgba(14,165,233,0.3)] border border-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}

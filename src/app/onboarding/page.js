'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { completeOnboarding } from '@/lib/actions/user';

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData) => {
    await completeOnboarding(formData);
    // Force a reload so the frontend picks up the new metadata
    // window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-8">How will you use EduPlatform?</h1>

      <form action={handleSubmit} className="flex gap-6">
        <button
          type="submit"
          name="role"
          value="student"
          className="w-48 h-16 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700"
        >
          I am a Student
        </button>
        <button
          type="submit"
          name="role"
          value="teacher"
          className="w-48 h-16 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-50"
        >
          I am an Instructor
        </button>
      </form>
    </div>
  );
}

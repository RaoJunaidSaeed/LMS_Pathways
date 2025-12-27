'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
// We will create this server action momentarily
import { checkout } from '@/lib/actions/checkout';

export default function CourseEnrollButton({ price, courseId }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      // FOR TESTING ONLY: This simulates a successful purchase
      const result = await checkout(courseId);

      if (result.success) {
        toast.success('Course Enrolled (Test Mode)');
        router.refresh();
      } else {
        toast.error('Enrollment failed');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="bg-sky-600 text-white px-6 py-2 rounded-md font-bold text-sm hover:bg-sky-500 transition shadow-[0_0_15px_rgba(14,165,233,0.4)]"
    >
      Enroll for {price ? `$${price}` : 'Free'} (Test)
    </button>
  );
}

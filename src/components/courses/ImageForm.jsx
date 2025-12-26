'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { updateCourse } from '@/lib/actions/course';
import { toast } from 'react-hot-toast';
import GlassCard from '@/components/ui/GlassCard';
import { FileUpload } from '@/components/FileUpload'; // Ensure you have this component

export default function ImageForm({ initialData, courseId }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      // values should contain { imageUrl: "..." } from your FileUpload component
      await updateCourse(courseId, values);
      toast.success('Course image updated');
      document.body.style.overflow = 'auto';
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      // 🛠️ CRITICAL FIX: Always turn off loading, so the page never gets "stuck"
      setIsLoading(false);
    }
  };

  return (
    <GlassCard className="mt-6">
      <div className="font-medium flex items-center justify-between text-slate-100">
        Course image
        <button
          onClick={toggleEdit}
          className="text-sky-400 hover:text-sky-300 transition text-sm font-semibold"
        >
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && <>+ Add image</>}
          {!isEditing && initialData.imageUrl && <>Edit image</>}
        </button>
      </div>

      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-800/50 rounded-md mt-4 border border-dashed border-slate-600">
            <span className="text-slate-400 text-sm">📷 No image uploaded</span>
          </div>
        ) : (
          <div className="relative aspect-video mt-4 rounded-md overflow-hidden border border-slate-700 shadow-lg">
            <Image alt="Upload" fill className="object-cover" src={initialData.imageUrl} />
          </div>
        ))}

      {isEditing && (
        <div className="mt-4">
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4 text-slate-400 text-center">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </GlassCard>
  );
}

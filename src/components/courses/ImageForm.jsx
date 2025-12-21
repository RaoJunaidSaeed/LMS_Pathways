'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateCourse } from '@/lib/actions/course';
import { FileUpload } from '@/components/FileUpload';
import Image from 'next/image';
import { toast } from 'react-hot-toast'; // or use alert()

export default function ImageForm({ initialData, courseId }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      await updateCourse(courseId, values);
      toast.success('Image updated successfully');
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <button onClick={toggleEdit} className="text-blue-700 hover:underline text-sm">
          {isEditing && 'Cancel'}
          {!isEditing && !initialData.imageUrl && 'Add an image'}
          {!isEditing && initialData.imageUrl && 'Edit image'}
        </button>
      </div>

      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md mt-4">
            📷 No image
          </div>
        ) : (
          <div className="relative aspect-video mt-4">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
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
          <div className="text-xs text-muted-foreground mt-4">16:9 aspect ratio recommended</div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createAttachment, deleteAttachment } from '@/lib/actions/attachment';
import { FileUpload } from '@/components/FileUpload';

export default function AttachmentForm({ initialData, courseId }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (url) => {
    if (url) {
      await createAttachment(courseId, url);
      setIsEditing(false);
      router.refresh();
    }
  };

  const onDelete = async (id) => {
    setDeletingId(id);
    await deleteAttachment(id, courseId);
    setDeletingId(null);
    router.refresh();
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course resources
        <button onClick={toggleEdit} className="text-blue-700 hover:underline text-sm">
          {isEditing && 'Cancel'}
          {!isEditing && 'Add a file'}
        </button>
      </div>

      {/* VIEW MODE: List of Files */}
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">No attachments yet.</p>
          )}

          {initialData.attachments.length > 0 && (
            <div className="space-y-2 mt-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment._id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <span className="text-xs mr-2">📄</span> {/* File Icon */}
                  <p className="text-xs line-clamp-1 w-full">{attachment.name}</p>
                  {deletingId === attachment._id && (
                    <div className="ml-auto">⌛ {/* Loading Icon */}</div>
                  )}
                  {deletingId !== attachment._id && (
                    <button
                      onClick={() => onDelete(attachment._id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      ❌ {/* Delete Icon */}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* EDIT MODE: Upload Area */}
      {isEditing && (
        <div className="mt-4">
          <FileUpload endpoint="courseAttachment" onChange={(url) => onSubmit(url)} />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete the course.
          </div>
        </div>
      )}
    </div>
  );
}

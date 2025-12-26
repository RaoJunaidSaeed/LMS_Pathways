'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createAttachment, deleteAttachment } from '@/lib/actions/attachment'; // Path preserved
import { FileUpload } from '@/components/FileUpload';
import { toast } from 'react-hot-toast';
import GlassCard from '@/components/ui/GlassCard';

export default function AttachmentForm({ initialData, courseId }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (url) => {
    if (url) {
      try {
        await createAttachment(courseId, url);
        setIsEditing(false);
        toast.success('Attachment added successfully');
        router.refresh();
      } catch {
        toast.error('Something went wrong');
      }
    }
  };

  const onDelete = async (id) => {
    try {
      setDeletingId(id);
      await deleteAttachment(id, courseId);
      toast.success('Attachment deleted successfully');
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <GlassCard className="mt-6">
      <div className="font-medium flex items-center justify-between text-slate-100">
        Course resources
        <button
          onClick={toggleEdit}
          className="text-sky-400 hover:text-sky-300 transition text-sm font-semibold"
        >
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
                  className="flex items-center p-3 w-full bg-slate-800/40 border border-slate-700 text-sky-200 rounded-md transition hover:bg-slate-800/60"
                >
                  <span className="text-xs mr-2 text-sky-400">📄</span>
                  <p className="text-xs line-clamp-1 w-full text-slate-300">{attachment.name}</p>

                  {deletingId === attachment._id && (
                    <div className="ml-auto animate-spin h-4 w-4 border-2 border-slate-400 border-t-transparent rounded-full"></div>
                  )}

                  {deletingId !== attachment._id && (
                    <button
                      onClick={() => onDelete(attachment._id)}
                      className="ml-auto hover:bg-slate-700/50 p-1 rounded-full transition opacity-70 hover:opacity-100"
                    >
                      ❌
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
          <div className="bg-slate-900/50 rounded-md p-4 border border-slate-600">
            <FileUpload endpoint="courseAttachment" onChange={(url) => onSubmit(url)} />
          </div>
          <div className="text-xs text-slate-400 mt-4">
            Add anything your students might need to complete the course.
          </div>
        </div>
      )}
    </GlassCard>
  );
}

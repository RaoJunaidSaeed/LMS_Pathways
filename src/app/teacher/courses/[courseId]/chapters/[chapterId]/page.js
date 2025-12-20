import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import connectDB from '@/lib/db';
import Chapter from '@/models/Chapter';

import ChapterVideoForm from '@/components/chapters/ChapterVideoForm';
import ChapterTitleForm from '@/components/chapters/ChapterTitleForm';
import ChapterActions from '@/components/chapters/ChapterActions';
import ChapterDescriptionForm from '@/components/chapters/ChapterDescriptionForm';
import LinkTag from '@/components/ui/LinkTag';
// You can reuse Title/Description forms here too if you modify them slightly to accept chapterId,
// or create specific ChapterTitleForm/ChapterDescriptionForm components.

export default async function ChapterIdPage({ params }) {
  const { courseId, chapterId } = await params;
  const { userId } = await auth();

  if (!userId) return redirect('/');

  await connectDB();

  // Fetch the specific chapter
  let chapter = await Chapter.findById(chapterId);

  if (!chapter) return redirect('/'); // Handle invalid ID

  // Serialize for client
  chapter = JSON.parse(JSON.stringify(chapter));

  // Completion check
  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
  const completionText = `(${requiredFields.filter(Boolean).length}/${requiredFields.length})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="p-6">
      {/* Back Button */}
      <div className="flex items-center justify-between w-full">
        <div className="w-full">
          <LinkTag
            path={`/teacher/courses/${courseId}`}
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            ⬅️ Back to course setup
          </LinkTag>

          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">Chapter Creation</h1>
              <span className="text-sm text-slate-700">Complete all fields {completionText}</span>
            </div>
            <ChapterActions
              disabled={!isComplete}
              courseId={courseId}
              chapterId={chapterId}
              isPublished={chapter.isPublished}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        {/* LEFT COLUMN: Metadata */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-x-2">
              <div className="rounded-full flex items-center justify-center bg-blue-100 p-2 text-blue-700">
                📝
              </div>
              <h2 className="text-xl font-semibold">Customize your chapter</h2>
            </div>

            <ChapterTitleForm initialData={chapter} courseId={courseId} chapterId={chapterId} />
            <ChapterDescriptionForm
              initialData={chapter}
              courseId={courseId}
              chapterId={chapterId}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Video */}
        <div>
          <div className="flex items-center gap-x-2">
            <div className="rounded-full flex items-center justify-center bg-blue-100 p-2 text-blue-700">
              📺
            </div>
            <h2 className="text-xl font-semibold">Add a video</h2>
          </div>

          {/* THE VIDEO FORM */}
          <ChapterVideoForm initialData={chapter} courseId={courseId} chapterId={chapterId} />
        </div>
      </div>
    </div>
  );
}

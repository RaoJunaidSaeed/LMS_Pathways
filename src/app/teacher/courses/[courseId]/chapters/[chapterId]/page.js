import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import connectDB from '@/lib/db';
import Chapter from '@/models/Chapter';

// Components
import ChapterTitleForm from '@/components/chapters/ChapterTitleForm';
import ChapterDescriptionForm from '@/components/chapters/ChapterDescriptionForm';
import ChapterAccessForm from '@/components/chapters/ChapterAccessForm';
import ChapterVideoForm from '@/components/chapters/ChapterVideoForm';
import ChapterActions from '@/components/chapters/ChapterActions';

// 🎨 Reusable Icon Badge (Matches Course Page)
const IconBadge = ({ icon }) => (
  <div className="rounded-full flex items-center justify-center bg-sky-500/10 p-2 text-sky-400 ring-1 ring-sky-500/20 shadow-[0_0_10px_rgba(14,165,233,0.15)]">
    {icon}
  </div>
);

export default async function ChapterIdPage({ params }) {
  const { courseId, chapterId } = await params;
  const { userId } = await auth();

  if (!userId) return redirect('/');

  await connectDB();

  let chapter = await Chapter.findOne({ _id: chapterId, courseId });
  if (!chapter) return redirect('/');

  // Clean data for client components to avoid serialization errors
  chapter = JSON.parse(JSON.stringify(chapter));

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    // 🛠️ FIX: Applied w-[90%] and mx-auto to align with Dashboard/Courses/Setup pages
    <div className="w-[90%] mx-auto py-10 text-slate-200">
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between mb-8">
        <div className="w-full">
          <Link
            href={`/teacher/courses/${courseId}`}
            className="flex items-center text-sm hover:text-sky-400 transition mb-6 text-slate-400"
          >
            ⬅️ Back to course setup
          </Link>

          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-sky-400 to-emerald-400">
                Chapter Creation
              </h1>
              <span className="text-sm text-slate-400">Complete all fields {completionText}</span>
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

      {/* --- MAIN GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT COLUMN */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-x-3 mb-6">
              <IconBadge icon="✏️" />
              <h2 className="text-xl font-semibold text-slate-100">Customize your chapter</h2>
            </div>
            <ChapterTitleForm initialData={chapter} courseId={courseId} chapterId={chapterId} />
            <ChapterDescriptionForm
              initialData={chapter}
              courseId={courseId}
              chapterId={chapterId}
            />
          </div>

          <div>
            <div className="flex items-center gap-x-3 mb-6">
              <IconBadge icon="👁️" />
              <h2 className="text-xl font-semibold text-slate-100">Access Settings</h2>
            </div>
            <ChapterAccessForm initialData={chapter} courseId={courseId} chapterId={chapterId} />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-x-3 mb-6">
              <IconBadge icon="📺" />
              <h2 className="text-xl font-semibold text-slate-100">Add a video</h2>
            </div>
            <ChapterVideoForm initialData={chapter} courseId={courseId} chapterId={chapterId} />
          </div>
        </div>
      </div>
    </div>
  );
}

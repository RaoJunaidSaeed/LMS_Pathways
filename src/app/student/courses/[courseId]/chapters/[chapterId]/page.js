import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/db';
import Chapter from '@/models/Chapter';
import Course from '@/models/Course';
import Purchase from '@/models/Purchase';
import Attachment from '@/models/Attachment';
import UserProgress from '@/models/UserProgress';

// Components
import VideoPlayer from '@/components/student/VideoPlayer';
import CourseEnrollButton from '@/components/student/CourseEnrollButton';
import CourseProgressButton from '@/components/student/CourseProgressButton';

export default async function ChapterIdPage({ params }) {
  const { userId } = await auth();
  const { courseId, chapterId } = await params;

  if (!userId) return redirect('/');

  await connectDB();

  // 1. Fetch Main Data
  const chapter = await Chapter.findOne({ _id: chapterId, courseId, isPublished: true });
  const course = await Course.findOne({ _id: courseId, isPublished: true });
  const attachments = await Attachment.find({ courseId }).sort({ createdAt: -1 });

  if (!chapter || !course) return redirect('/student/dashboard');

  // 2. Check Purchase & Access
  const purchase = await Purchase.findOne({ userId, courseId });
  const isLocked = !chapter.isFree && !purchase;

  // 3. Fetch User Progress (Check if completed)
  const userProgress = await UserProgress.findOne({
    userId,
    chapterId,
  });

  // 4. Find Next Chapter (For auto-play / button navigation)
  const nextChapter = await Chapter.findOne({
    courseId,
    isPublished: true,
    position: { $gt: chapter.position },
  }).sort({ position: 1 });

  // 5. Clean Data
  const cleanAttachments = JSON.parse(JSON.stringify(attachments));

  return (
    <div className="p-6 max-w-6xl mx-auto text-slate-200 pb-20">
      {/* --- VIDEO PLAYER SECTION --- */}
      <div className="p-4 border border-slate-700 bg-slate-900 rounded-md shadow-lg">
        <VideoPlayer
          chapterId={chapterId}
          title={chapter.title}
          courseId={courseId}
          // 🛠️ FIX 1: Convert ObjectId to String
          nextChapterId={nextChapter?._id?.toString()}
          playbackId={chapter.videoUrl}
          isLocked={isLocked}
        />
      </div>

      {/* --- CHAPTER DETAILS --- */}
      <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-700 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">{chapter.title}</h2>
          <p className="text-slate-400 mt-1 text-sm">
            From course: <span className="text-sky-400">{course.title}</span>
          </p>
        </div>

        {/* ACTION BUTTON */}
        {!purchase ? (
          <CourseEnrollButton price={course.price} courseId={courseId} />
        ) : (
          <CourseProgressButton
            chapterId={chapterId}
            courseId={courseId}
            // 🛠️ FIX 2: Convert ObjectId to String here too
            nextChapterId={nextChapter?._id?.toString()}
            isCompleted={!!userProgress?.isCompleted}
          />
        )}
      </div>

      {/* --- DESCRIPTION --- */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-slate-100">Description</h3>
        <div className="text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-900/50 p-6 rounded-md border border-slate-700/50">
          {chapter.description || 'No description provided.'}
        </div>
      </div>

      {/* --- ATTACHMENTS --- */}
      {cleanAttachments.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-slate-100">
            Resources ({cleanAttachments.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cleanAttachments.map((item) => (
              <a
                href={item.url}
                target="_blank"
                key={item._id}
                className="flex items-center p-3 w-full bg-slate-800 border border-slate-700 text-sky-400 rounded-md hover:bg-slate-700 transition"
              >
                <span className="mr-2">📎</span>
                <span className="line-clamp-1">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

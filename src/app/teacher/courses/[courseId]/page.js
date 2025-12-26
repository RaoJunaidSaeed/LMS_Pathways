import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/db';

// Models
import Course from '@/models/Course';
import Category from '@/models/Category';
import Chapter from '@/models/Chapter';
import Attachment from '@/models/Attachment';

// Components
import TitleForm from '@/components/courses/TitleForm';
import DescriptionForm from '@/components/courses/DescriptionForm';
import PriceForm from '@/components/courses/PriceForm';
import CategoryForm from '@/components/courses/CategoryForm';
import ImageForm from '@/components/courses/ImageForm';
import ChaptersForm from '@/components/courses/ChaptersForm';
import AttachmentForm from '@/components/courses/AttachmentForm';
import CourseActions from '@/components/courses/CourseActions';

// 🎨 NEW: A reusable Icon Badge for the dark theme
const IconBadge = ({ icon }) => (
  <div className="rounded-full flex items-center justify-center bg-sky-500/10 p-2 text-sky-400 ring-1 ring-sky-500/20 shadow-[0_0_10px_rgba(14,165,233,0.15)]">
    {icon}
  </div>
);

export default async function CourseSetupPage({ params }) {
  const { courseId } = await params;
  const { userId } = await auth();

  if (!userId) return redirect('/');

  await connectDB();

  // 1. Fetch Categories
  const categories = await Category.find().sort({ name: 1 });
  const categoryOptions = categories.map((c) => ({
    label: c.name,
    value: c.name.toLowerCase(),
  }));

  // 2. Fetch Course
  let course = await Course.findOne({ _id: courseId, userId });
  if (!course) return redirect('/teacher/courses');

  // 3. Fetch Chapters & Attachments
  const chapters = await Chapter.find({ courseId: course._id }).sort({ position: 1 });
  const attachments = await Attachment.find({ courseId: course._id }).sort({ createdAt: -1 });

  // 4. Clean Data
  course = JSON.parse(JSON.stringify(course));
  const cleanChapters = JSON.parse(JSON.stringify(chapters));
  const cleanAttachments = JSON.parse(JSON.stringify(attachments));

  course.chapters = cleanChapters;
  course.attachments = cleanAttachments;

  // 5. Completion Logic (Updated: 5 Fields + Published Chapter)
  const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished);

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.category,
    course.price,
    hasPublishedChapter,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    // 🛠️ FIX: Applied w-[90%] and mx-auto to align with Dashboard/Courses page
    <div className="w-[90%] mx-auto py-10 text-slate-200">
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-sky-400 to-emerald-400 drop-shadow-sm">
            Course Setup
          </h1>
          <span className="text-sm text-slate-400">Complete all fields {completionText}</span>
        </div>

        <CourseActions
          disabled={!isComplete}
          courseId={course._id.toString()}
          isPublished={course.isPublished}
        />
      </div>

      {/* --- MAIN GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT COLUMN */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-x-3 mb-6">
              <IconBadge icon="📋" />
              <h2 className="text-xl font-semibold text-slate-100">Customize your course</h2>
            </div>

            <TitleForm initialData={course} courseId={course._id} />
            <DescriptionForm initialData={course} courseId={course._id} />
            <ImageForm initialData={course} courseId={course._id} />
            <CategoryForm initialData={course} courseId={course._id} options={categoryOptions} />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">
          {/* Chapters */}
          <div>
            <div className="flex items-center gap-x-3 mb-6">
              <IconBadge icon="📑" />
              <h2 className="text-xl font-semibold text-slate-100">Course chapters</h2>
            </div>
            <ChaptersForm initialData={course} courseId={course._id} />
          </div>

          {/* Pricing */}
          <div>
            <div className="flex items-center gap-x-3 mb-6">
              <IconBadge icon="💰" />
              <h2 className="text-xl font-semibold text-slate-100">Sell your course</h2>
            </div>
            <PriceForm initialData={course} courseId={course._id} />
          </div>

          {/* Attachments */}
          <div>
            <div className="flex items-center gap-x-3 mb-6">
              <IconBadge icon="📎" />
              <h2 className="text-xl font-semibold text-slate-100">Resources & Attachments</h2>
            </div>
            <AttachmentForm initialData={course} courseId={course._id} />
          </div>
        </div>
      </div>
    </div>
  );
}

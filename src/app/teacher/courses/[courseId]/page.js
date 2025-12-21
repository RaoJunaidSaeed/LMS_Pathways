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

  // 4. Clean Data (Serialize for Client Components)
  course = JSON.parse(JSON.stringify(course));
  const cleanChapters = JSON.parse(JSON.stringify(chapters));
  const cleanAttachments = JSON.parse(JSON.stringify(attachments));

  // Attach children to course object
  course.chapters = cleanChapters;
  course.attachments = cleanAttachments;
  const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished);
  // 5. Completion Logic
  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.category,
    hasPublishedChapter, // Changed from just "chapters.length > 0"
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-700">Complete all fields {completionText}</span>
        </div>
        <CourseActions
          disabled={!isComplete}
          courseId={course._id.toString()}
          isPublished={course.isPublished}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        {/* --- LEFT COLUMN --- */}
        <div>
          <div className="flex items-center gap-x-2">
            <div className="rounded-full flex items-center justify-center bg-blue-100 p-2 text-blue-700">
              📋
            </div>
            <h2 className="text-xl font-semibold">Customize your course</h2>
          </div>

          <TitleForm initialData={course} courseId={course._id} />
          <DescriptionForm initialData={course} courseId={course._id} />
          <ImageForm initialData={course} courseId={course._id} />
          <CategoryForm initialData={course} courseId={course._id} options={categoryOptions} />
        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <div className="rounded-full flex items-center justify-center bg-blue-100 p-2 text-blue-700">
                LIST
              </div>
              <h2 className="text-xl font-semibold">Course chapters</h2>
            </div>
            {/* REAL CHAPTERS FORM */}
            <ChaptersForm initialData={course} courseId={course._id} />
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <div className="rounded-full flex items-center justify-center bg-blue-100 p-2 text-blue-700">
                💰
              </div>
              <h2 className="text-xl font-semibold">Sell your course</h2>
            </div>
            <PriceForm initialData={course} courseId={course._id} />
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <div className="rounded-full flex items-center justify-center bg-blue-100 p-2 text-blue-700">
                📎
              </div>
              <h2 className="text-xl font-semibold">Resources & Attachments</h2>
            </div>
            {/* REAL ATTACHMENTS FORM */}
            <AttachmentForm initialData={course} courseId={course._id} />
          </div>
        </div>
      </div>
    </div>
  );
}

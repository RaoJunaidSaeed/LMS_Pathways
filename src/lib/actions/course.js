'use server';

import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/db';
import Course from '@/models/Course';

// 1. CREATE Action (You likely already have this)
export async function createCourse(formData) {
  try {
    const { userId } = await auth();
    const title = formData.get('title');

    if (!userId) {
      return { error: 'Unauthorized' };
    }

    await connectDB();

    const course = await Course.create({
      userId,
      title,
      isPublished: false, // Start as Draft
    });

    return { success: true, courseId: course._id.toString() };
  } catch (error) {
    console.error('Course creation error:', error);
    return { error: 'Something went wrong' };
  }
}

// 2. UPDATE Action (This is the one you are missing)
export async function updateCourse(courseId, values) {
  try {
    const { userId } = await auth();

    // Security Check: Only allow if logged in
    if (!userId) {
      return { error: 'Unauthorized' };
    }

    await connectDB();

    // Security Check: Only update if the course belongs to THIS user
    const course = await Course.findOneAndUpdate(
      { _id: courseId, userId: userId },
      { $set: values },
      { new: true }
    );

    if (!course) {
      return { error: 'Course not found or unauthorized' };
    }

    return { success: true, course: JSON.parse(JSON.stringify(course)) };
  } catch (error) {
    console.error('Course update error:', error);
    return { error: 'Something went wrong' };
  }
}

// ... existing imports

// 1. PUBLISH ACTION
export async function publishCourse(courseId) {
  try {
    const { userId } = await auth();
    if (!userId) return { error: 'Unauthorized' };

    await connectDB();

    const course = await Course.findOne({ _id: courseId, userId }).populate('chapters'); // We need to check chapters too

    if (!course) return { error: 'Not found' };

    // 🔬 VALIDATION: Ensure everything is ready before publishing
    // At least one chapter must be published
    const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished);

    if (
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      !course.category ||
      !hasPublishedChapter
    ) {
      return { error: 'Missing required fields' };
    }

    await Course.findByIdAndUpdate(courseId, { isPublished: true });

    return { success: true };
  } catch (error) {
    console.log('[COURSE_PUBLISH]', error);
    return { error: 'Something went wrong' };
  }
}

// 2. UNPUBLISH ACTION
export async function unpublishCourse(courseId) {
  try {
    const { userId } = await auth();
    if (!userId) return { error: 'Unauthorized' };

    await connectDB();

    await Course.findByIdAndUpdate(courseId, { isPublished: false });

    return { success: true };
  } catch (error) {
    return { error: 'Something went wrong' };
  }
}

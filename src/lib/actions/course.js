'use server';

import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/db';
import Course from '@/models/Course';
import Chapter from '@/models/Chapter';
import Attachment from '@/models/Attachment';
import { revalidatePath } from 'next/cache';

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

    // Find course and populate chapters to check if any are published
    const course = await Course.findOne({ _id: courseId, userId }).populate('chapters');

    if (!course) return { error: 'Not found' };

    // 🔬 VALIDATION: Check strictly for these 5 fields + 1 Chapter Requirement
    const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished);

    if (
      !course.title || // Field 1
      !course.description || // Field 2
      !course.imageUrl || // Field 3
      !course.category || // Field 4
      !course.price || // Field 5
      !hasPublishedChapter // Requirement: At least one active chapter
    ) {
      // We explicitly DO NOT check for course.attachments here
      return { error: 'Missing required fields' };
    }

    await Course.findByIdAndUpdate(courseId, { isPublished: true });

    revalidatePath(`/teacher/courses/${courseId}`);
    revalidatePath(`/search`);

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

export async function deleteCourse(courseId) {
  try {
    const { userId } = await auth();
    if (!userId) return { error: 'Unauthorized' };

    await connectDB();

    const course = await Course.findOne({ _id: courseId, userId });
    if (!course) return { error: 'Not found' };

    // 1. Delete all Chapters associated with this course
    // (In a production app with Mux, you would loop through chapters and delete Mux assets here too)
    await Chapter.deleteMany({ courseId });

    // 2. Delete all Attachments
    if (Attachment) {
      await Attachment.deleteMany({ courseId });
    }

    console.log(course);
    // 3. Delete the Course itself
    await Course.deleteOne({ _id: courseId });
    revalidatePath('/teacher/courses');
    return { success: true };
  } catch (error) {
    console.log('[DELETE_COURSE]', error);
    return { error: 'Internal Error' };
  }
}

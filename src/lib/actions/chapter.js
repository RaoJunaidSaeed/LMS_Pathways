'use server';

import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/db';
import Course from '@/models/Course';
import Chapter from '@/models/Chapter';

export async function createChapter(courseId, title) {
  try {
    const { userId } = await auth();
    if (!userId) return { error: 'Unauthorized' };

    await connectDB();

    // 1. Verify Course Owner
    const courseOwner = await Course.findOne({ _id: courseId, userId });
    if (!courseOwner) return { error: 'Unauthorized' };

    // 2. Find the last chapter to determine new position
    const lastChapter = await Chapter.findOne({ courseId }).sort({ position: -1 });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    // 3. Create the Chapter
    const chapter = await Chapter.create({
      title,
      courseId,
      position: newPosition,
    });

    // 4. Push chapter ID to Course array (Optional but good for quick access)
    await Course.findByIdAndUpdate(courseId, {
      $push: { chapters: chapter._id },
    });

    return { success: true, chapterId: chapter._id.toString() };
  } catch (error) {
    console.error('Chapter creation error:', error);
    return { error: 'Something went wrong' };
  }
}

// ... existing createChapter code ...

export async function updateChapter(courseId, chapterId, values) {
  try {
    const { userId } = await auth();
    if (!userId) return { error: 'Unauthorized' };

    await connectDB();

    // Verify ownership via the Course
    const courseOwner = await Course.findOne({ _id: courseId, userId });
    if (!courseOwner) return { error: 'Unauthorized' };

    const chapter = await Chapter.findByIdAndUpdate(chapterId, { $set: values }, { new: true });

    return { success: true, chapter: JSON.parse(JSON.stringify(chapter)) };
  } catch (error) {
    console.log('Chapter Update Error', error);
    return { error: 'Something went wrong' };
  }
}

// ... existing imports and functions ...

export async function publishChapter(courseId, chapterId) {
  try {
    const { userId } = await auth();
    if (!userId) return { error: 'Unauthorized' };

    await connectDB();

    const chapter = await Chapter.findOne({ _id: chapterId, courseId });

    // Validation: Can't publish without a video or title
    if (!chapter || !chapter.title || !chapter.videoUrl) {
      return { error: 'Missing required fields' };
    }

    const publishedChapter = await Chapter.findByIdAndUpdate(
      chapterId,
      { isPublished: true },
      { new: true }
    );

    return { success: true, isPublished: true };
  } catch (error) {
    console.log('Chapter Publish Error', error);
    return { error: 'Something went wrong' };
  }
}

export async function unpublishChapter(courseId, chapterId) {
  try {
    const { userId } = await auth();
    if (!userId) return { error: 'Unauthorized' };

    await connectDB();

    await Chapter.findByIdAndUpdate(chapterId, { isPublished: false }, { new: true });

    return { success: true, isPublished: false };
  } catch (error) {
    return { error: 'Something went wrong' };
  }
}

export async function deleteChapter(courseId, chapterId) {
  try {
    const { userId } = await auth();
    if (!userId) return { error: 'Unauthorized' };

    await connectDB();

    // 1. Find the chapter to ensure it belongs to the user (via course)
    const ownCourse = await Course.findOne({ _id: courseId, userId });
    if (!ownCourse) return { error: 'Unauthorized' };

    const chapter = await Chapter.findOne({ _id: chapterId, courseId });
    if (!chapter) return { error: 'Chapter not found' };

    // 2. Delete the Chapter
    await Chapter.deleteOne({ _id: chapterId });

    // 3. Check if the course still has any published chapters
    // If not, we should unpublish the entire course
    const publishedChaptersInCourse = await Chapter.find({
      courseId,
      isPublished: true,
    });

    if (!publishedChaptersInCourse.length) {
      await Course.updateOne({ _id: courseId }, { isPublished: false });
    }

    return { success: true };
  } catch (error) {
    console.log('[DELETE_CHAPTER]', error);
    return { error: 'Internal Error' };
  }
}

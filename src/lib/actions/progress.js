'use server';

import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/db';
import UserProgress from '@/models/UserProgress';
import Chapter from '@/models/Chapter';
import { revalidatePath } from 'next/cache';

// 1. Calculate Progress Percentage
export async function getProgress(userId, courseId) {
  try {
    await connectDB();

    // Get all published chapters for the course
    const publishedChapters = await Chapter.find({
      courseId,
      isPublished: true,
    });

    const publishedChapterIds = publishedChapters.map((chapter) => chapter._id);

    // Get count of valid completed chapters
    const validCompletedChapters = await UserProgress.countDocuments({
      userId,
      chapterId: { $in: publishedChapterIds },
      isCompleted: true,
    });

    const progressPercentage = (validCompletedChapters / publishedChapterIds.length) * 100;

    return progressPercentage;
  } catch (error) {
    console.log('[GET_PROGRESS]', error);
    return 0;
  }
}

// 2. Toggle Chapter Completion
export async function toggleChapterCompletion(chapterId, isCompleted, courseId) {
  try {
    const { userId } = await auth();
    if (!userId) return { error: 'Unauthorized' };

    await connectDB();

    await UserProgress.updateOne(
      { userId, chapterId },
      { isCompleted },
      { upsert: true } // Create if doesn't exist
    );

    // Refresh the page so the sidebar updates immediately
    revalidatePath(`/student/courses/${courseId}`);

    return { success: true };
  } catch (error) {
    console.log('[TOGGLE_PROGRESS]', error);
    return { error: 'Internal Error' };
  }
}

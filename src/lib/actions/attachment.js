'use server';

import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/db';
import Attachment from '@/models/Attachment';
import Course from '@/models/Course';

export async function createAttachment(courseId, url) {
  try {
    const { userId } = await auth();
    if (!userId) return { error: 'Unauthorized' };

    await connectDB();

    const name = url.split('/').pop();

    const attachment = await Attachment.create({
      url,
      name,
      courseId,
    });

    await Course.findByIdAndUpdate(courseId, {
      $push: { attachments: attachment._id },
    });

    // 🛠️ FIX: Convert Mongoose object to a plain JSON object
    // You can use .toObject() or JSON.parse(JSON.stringify(...))
    const plainAttachment = JSON.parse(JSON.stringify(attachment));

    return { success: true, attachment: plainAttachment };
  } catch (error) {
    console.log('Attachment Create Error', error);
    return { error: 'Something went wrong' };
  }
}

// ... existing deleteAttachment function ...

export async function deleteAttachment(attachmentId, courseId) {
  try {
    const { userId } = await auth();
    if (!userId) return { error: 'Unauthorized' };

    await connectDB();

    // 1. Remove from Course array
    await Course.findByIdAndUpdate(courseId, {
      $pull: { attachments: attachmentId },
    });

    // 2. Delete the Document
    await Attachment.findByIdAndDelete(attachmentId);

    return { success: true };
  } catch (error) {
    console.log('Attachment Delete Error', error);
    return { error: 'Something went wrong' };
  }
}

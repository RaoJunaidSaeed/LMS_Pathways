'use server';

import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/db';
import Purchase from '@/models/Purchase';

export async function checkout(courseId) {
  try {
    const { userId } = await auth();
    if (!userId) return { error: 'Unauthorized' };

    await connectDB();

    // Create the purchase record
    await Purchase.create({
      userId,
      courseId,
    });

    return { success: true };
  } catch (error) {
    console.log('[CHECKOUT_ERROR]', error);
    return { error: 'Internal Error' };
  }
}

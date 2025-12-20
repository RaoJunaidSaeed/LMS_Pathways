'use server';

import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';

import connectDB from '@/lib/db';
import User from '@/models/User';

export async function completeOnboarding(formData) {
  const { userId } = await auth();

  const user = await currentUser();

  if (!userId || !user) {
    console.log('No userId or user found');
    return;
  }

  const role = formData.get('role');
  try {
    // 1. Connect to DB
    await connectDB();

    // 2. Save to MongoDB First
    await User.findOneAndUpdate(
      { clerkId: userId },
      {
        clerkId: userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
        role: role,
      },
      { upsert: true, new: true }
    );

    // 3. Update Clerk Metadata (for Middleware/Frontend)
    const client = await clerkClient();

    await client.users.updateUserMetadata(userId, {
      publicMetadata: { role },
    });
  } catch (err) {
    console.error('Onboarding Error:', err);
    return { error: 'Failed to create account' };
  }

  console.log('Onboarding completed successfully');
  // 4. Redirect to Dashboard
  return { success: true, role };
}

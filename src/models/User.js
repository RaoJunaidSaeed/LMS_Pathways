import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true }, // The link between Clerk and Mongo
    email: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    imageUrl: { type: String },
    role: {
      type: String,
      enum: ['student', 'teacher', 'admin'],
      default: 'student',
    },
  },
  { timestamps: true }
);

// Prevent recompilation error in Next.js
export default mongoose.models.User || mongoose.model('User', UserSchema);

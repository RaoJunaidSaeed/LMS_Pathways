import mongoose from 'mongoose';

const UserProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Ensure a user has only one progress record per chapter
UserProgressSchema.index({ userId: 1, chapterId: 1 }, { unique: true });

export default mongoose.models.UserProgress || mongoose.model('UserProgress', UserProgressSchema);

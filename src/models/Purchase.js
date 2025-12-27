import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 🔒 Unique Compound Index:
// This ensures a user cannot purchase the same course twice.
PurchaseSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.models.Purchase || mongoose.model('Purchase', PurchaseSchema);

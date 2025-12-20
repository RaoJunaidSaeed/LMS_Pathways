import mongoose from 'mongoose';

const ChapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },

  // --- VIDEO LOGIC ---
  // Store the full YouTube URL here (e.g. "https://www.youtube.com/watch?v=...")
  videoUrl: { type: String },

  // --- ORDERING LOGIC ---
  // Use this to sort chapters (1, 2, 3...) regardless of creation date
  position: { type: Number },

  isPublished: { type: Boolean, default: false },
  isFree: { type: Boolean, default: false }, // "Free Preview" chapter

  // Link back to the parent Course
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexing for faster sorting by position
ChapterSchema.index({ courseId: 1, position: 1 });

export default mongoose.models.Chapter || mongoose.model('Chapter', ChapterSchema);

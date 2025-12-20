import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // The Clerk User ID of the teacher
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  price: { type: Number },
  isPublished: { type: Boolean, default: false },

  // --- CATEGORY LOGIC ---
  // We store it as a simple string, but force it to lowercase for easy searching.
  // Example: "Computer Science" saves as "computer science"
  category: {
    type: String,
    lowercase: true,
    trim: true,
  },

  // --- RELATIONS ---
  // These arrays hold the IDs of the children.
  attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' }],
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// INDEXING: specific optimizations for faster searching
CourseSchema.index({ category: 1 });
CourseSchema.index({ title: 'text' }); // Allows text search on the title

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);

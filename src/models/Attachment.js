import mongoose from 'mongoose';

const AttachmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true }, // The link to the file (e.g., UploadThing or S3 url)

  // Link back to the parent Course
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Attachment || mongoose.model('Attachment', AttachmentSchema);

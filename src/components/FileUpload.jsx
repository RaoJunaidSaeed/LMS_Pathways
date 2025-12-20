'use client';

import { CldUploadButton } from 'next-cloudinary';

export const FileUpload = ({ onChange, endpoint }) => {
  return (
    <CldUploadButton
      // 1. Replace with the "Unsigned" preset name you created in Step 1
      uploadPreset="lms_preset"
      // 2. Handle the successful upload
      onSuccess={(result) => {
        onChange(result?.info?.secure_url);
      }}
    >
      <div className="p-4 border-2 border-dashed border-slate-300 rounded-md hover:bg-slate-50 transition cursor-pointer flex flex-col items-center justify-center gap-y-2 text-slate-500">
        <span className="text-2xl">☁️</span>
        <span className="text-sm font-medium">Click to upload</span>
      </div>
    </CldUploadButton>
  );
};

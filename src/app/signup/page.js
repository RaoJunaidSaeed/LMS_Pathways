import React from 'react';
import { SignUpButton } from '@clerk/nextjs';

export default function Signup() {
  return (
    <div className="flex flex-col gap-10 mt-20 justify-center items-center">
      <h2>This is signup Button to continue signup</h2>
      <SignUpButton mode="modal" forceRedirectUrl="/onboarding">
        <button className="bg-blue-600 text-white px-5 py-2  cursor-pointer rounded-full font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
          Sign Up
        </button>
      </SignUpButton>
    </div>
  );
}

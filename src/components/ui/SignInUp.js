'use client';

import React from 'react';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  ClerkLoading,
  ClerkLoaded,
} from '@clerk/nextjs';
import LinkTag from './LinkTag';
import { useUserRole } from '@/utils/context/UserRoleContext.js';

export default function SignInUp() {
  const { dashboardUrl } = useUserRole();
  return (
    <>
      <ClerkLoading>
        <div className="flex items-center gap-6">
          <button className="text-gray-600 hover:text-gray-700 cursor-pointer text-lg font-medium transition-all transform hover:-translate-y-0.5">
            Log in
          </button>

          <button className="bg-blue-600 text-white px-5 py-2 cursor-pointer rounded-full font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Sign Up
          </button>
        </div>
      </ClerkLoading>

      <ClerkLoaded>
        <SignedOut>
          <div className="flex items-center gap-6">
            {/* Login Popup */}
            <SignInButton mode="modal">
              <button className="text-gray-600 hover:text-gray-700 cursor-pointer text-lg font-medium transition-all transform hover:-translate-y-0.5">
                Log in
              </button>
            </SignInButton>

            {/* Signup Popup */}
            <SignUpButton mode="modal" forceRedirectUrl="/onboarding">
              <button className="bg-blue-600 text-white px-5 py-2 cursor-pointer rounded-full font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="flex items-center gap-4">
            <LinkTag path={dashboardUrl}>
              <span className="text-gray-600 hover:text-blue-600 font-medium cursor-pointer transition">
                Dashboard
              </span>
            </LinkTag>
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </ClerkLoaded>
    </>
  );
}

// 'use client';

// import React from 'react';
// import {
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
//   ClerkLoading,
//   ClerkLoaded,
// } from '@clerk/nextjs';
// import LinkTag from './LinkTag';
// import { useUserRole } from '@/utils/context/UserRoleContext.js';

// export default function SignInUp() {
//   const { dashboardUrl } = useUserRole();
//   return (
//     <>
//       {' '}
//       <ClerkLoading>
//         <div className="flex items-center gap-6">
//           <button className="text-gray-600 hover:text-gray-700 cursor-pointer text-lg font-medium transition-all transform hover:-translate-y-0.5">
//             Log in
//           </button>

//           <button className="bg-blue-600 text-white px-5 py-2 cursor-pointer rounded-full font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
//             Sign Up
//           </button>
//         </div>
//       </ClerkLoading>
//       <ClerkLoaded>
//         <SignedOut>
//           <SignInButton mode="modal">
//             <button className="text-gray-600 hover:text-gray-700 cursor-pointer text-lg font-medium transition-all transform hover:-translate-y-0.5">
//               Log in
//             </button>
//           </SignInButton>

//           <SignUpButton mode="modal" forceRedirectUrl="/onboarding">
//             <button className="bg-blue-600 text-white px-5 py-2 cursor-pointer rounded-full font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
//               Sign Up
//             </button>
//           </SignUpButton>
//         </SignedOut>

//         <SignedIn>
//           <div className="flex items-center gap-4">
//             <LinkTag path={dashboardUrl}>Dashboard</LinkTag>
//             <UserButton afterSignOutUrl="/" />
//           </div>
//         </SignedIn>
//       </ClerkLoaded>
//     </>
//   );
// }

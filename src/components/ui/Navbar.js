'use client';

import React from 'react';
import LinkTag from './LinkTag';
import MobileMenu from './MobileMenu';
// 1. Import Clerk Components
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

// 2. Remove Login/Signup from here (Clerk handles them now)
const navLinks = [
  { path: '/courses', label: 'Courses' },
  // { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  return (
    <>
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 items-center">
        {/* Standard Links */}
        {navLinks.map((link) => (
          <LinkTag key={link.path} path={link.path}>
            {link.label}
          </LinkTag>
        ))}

        {/* --- AUTHENTICATION SECTION --- */}

        {/* A. If user is NOT logged in: Show Login / Signup buttons */}
        <SignedOut>
          {/* Sign In (Opens Modal) */}
          <SignInButton mode="modal">
            <button className="text-gray-600 hover:text-gray-700 cursor-pointer text-lg font-medium   transition-all  transform hover:-translate-y-0.5">
              Log in
            </button>
          </SignInButton>

          {/* Sign Up (Opens Modal -> Redirects to Onboarding) */}
          <SignUpButton mode="modal" forceRedirectUrl="/onboarding">
            <button className="bg-blue-600 text-white px-5 py-2  cursor-pointer rounded-full font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>

        {/* B. If user IS logged in: Show User Profile */}
        <SignedIn>
          <div className="flex items-center gap-4">
            {/* Optional: Add a Dashboard link for logged-in users */}
            <LinkTag path="/dashboard">Dashboard</LinkTag>
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </div>

      {/* Mobile Menu (Pass links) */}
      <MobileMenu links={navLinks} />
    </>
  );
}

// import React from 'react';
// import LinkTag from './LinkTag';
// import MobileMenu from './MobileMenu';

// const navLinks = [
//   // { path: '/', label: 'Home' },
//   { path: '/courses', label: 'Courses' },
//   { path: '/contact', label: 'Contact' },
//   { path: '/login', label: 'Login' },
//   { path: '/signup', label: 'Signup' },
// ];

// export default function Navbar() {
//   return (
//     <>
//       <div className="hidden md:flex gap-8 items-center">
//         {navLinks.map((link) => (
//           <LinkTag key={link.path} path={link.path}>
//             {link.label}
//           </LinkTag>
//         ))}
//       </div>
//       <MobileMenu links={navLinks} />
//     </>
//   );
// }

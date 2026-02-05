'use client';

import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';
import SignInUp from './SignInUp';

export default function Navbar() {
  const pathname = usePathname();

  // 1. Define Routes
  const teacherRoutes = [
    { path: '/teacher/courses', label: 'Courses' },
  ];

  const studentRoutes = [
    { path: '/student/dashboard', label: 'My Learning' },
    { path: '/student/search', label: 'Browse Courses' },
  ];

  // 2. Decide which links to show based on URL
  const isTeacherPage = pathname?.startsWith('/teacher');
  const isStudentPage = pathname?.startsWith('/student');

  let currentLinks = [];

  if (isTeacherPage) {
    currentLinks = teacherRoutes;
  } else if (isStudentPage) {
    currentLinks = studentRoutes;
  } else {
    // Default / Home page links (Guest)
    currentLinks = [{ path: '/student/search', label: 'Browse' }];
  }

  return (
    <div className="h-full flex items-center justify-between px-4 md:px-8  bg-slate-950 shadow-sm">
      {/* Desktop Menu (Hidden on mobile) */}
      <div className="hidden md:flex gap-8 items-center">
        <SignInUp />
      </div>

      {/* Mobile Menu (Visible on mobile) */}
      {/* We pass the 'currentLinks' so mobile users get the correct navigation */}
      <MobileMenu links={currentLinks} SignInUp={<SignInUp />} />
    </div>
  );
}

// import React from 'react';
// import LinkTag from './LinkTag';
// import MobileMenu from './MobileMenu';
// import SignInUp from './SignInUp';

// const navLinks = [{ path: '/teacher/courses', label: 'Courses' }];

// export default function Navbar() {
//   return (
//     <>
//       <div className="hidden md:flex gap-8 items-center">
//         {navLinks.map((link) => (
//           <LinkTag key={link.path} path={link.path}>
//             {link.label}
//           </LinkTag>
//         ))}

//         <SignInUp />
//       </div>

//       <MobileMenu links={navLinks} SignInUp={<SignInUp />} />
//     </>
//   );
// }

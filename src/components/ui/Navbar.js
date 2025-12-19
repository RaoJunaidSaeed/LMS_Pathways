import React from 'react';
import LinkTag from './LinkTag';
import MobileMenu from './MobileMenu';
import SignInUp from './SignInUp';

const navLinks = [{ path: '/courses', label: 'Courses' }];

export default function Navbar() {
  return (
    <>
      <div className="hidden md:flex gap-8 items-center">
        {navLinks.map((link) => (
          <LinkTag key={link.path} path={link.path}>
            {link.label}
          </LinkTag>
        ))}

        <SignInUp />
      </div>

      <MobileMenu links={navLinks} SignInUp={<SignInUp />} />
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

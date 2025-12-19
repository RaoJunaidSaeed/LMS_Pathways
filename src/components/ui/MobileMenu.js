'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import LinkTag from './LinkTag';

export default function MobileMenu({ links, SignInUp }) {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const menuRef = useRef(null);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="md:hidden ">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-700 focus:outline-none">
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-100 shadow-md flex flex-col items-center gap-4 py-4 z-50">
          {links.map((link) => (
            <div key={link.path} onClick={() => setIsOpen(false)}>
              <LinkTag path={link.path}>{link.label}</LinkTag>
            </div>
          ))}
          {SignInUp}
        </div>
      )}
    </div>
  );
}

// 'use client';

// import { useState } from 'react';
// import LinkTag from './LinkTag';

// export default function MobileMenu({ links }) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="md:hidden">
//       <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-700 focus:outline-none">
//         {isOpen ? (
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         ) : (
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         )}
//       </button>

//       {isOpen && (
//         <div className="absolute top-16 left-0 w-full bg-blue-100 shadow-md flex flex-col items-center gap-4 py-4 z-50">
//           {links.map((link) => (
//             <div key={link.path} onClick={() => setIsOpen(false)}>
//               <LinkTag path={link.path}>{link.label}</LinkTag>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { searchAction } from '@/lib/actions';

export default function SearchBar() {
  return (
    <form action={searchAction} className="hidden justify-center items-center   md:block">
      <input
        className="border-2 px-2 mr-2 h-10 border-blue-950 rounded-2xl"
        type="text"
        name="searchedCourse"
        placeholder="Search Valuable Courses"
      />
      <button
        className=" text-gray-600 hover:text-gray-700 transition-all  transform hover:-translate-y-0.5 cursor-pointer text-lg font-medium "
        type="submit"
      >
        Search
      </button>
    </form>
  );
}

// 'use client';

// import React, { useState } from 'react';

// export default function SearchBar() {
//   const [searchedCourse, setSearchedCourse] = useState('');

//   return (
//     <form action={searchAction} className="hidden justify-center items-center gap-2  md:block">
//       <input
//         className="border-2 px-2 h-10 border-blue-950 rounded-2xl"
//         type="text"
//         name="searchedCourse"
//         placeholder="Search Valuable Courses"
//         value={searchedCourse}
//         onChange={(e) => setSearchedCourse(e.target.value)}
//       />
//       <button
//         className=" font-bold text-blue-900 hover:text-black  hover:cursor-pointer text-xl"
//         type="submit"
//       >
//         Search
//       </button>
//     </form>
//   );
// }

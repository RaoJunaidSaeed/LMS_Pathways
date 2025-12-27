'use client';

import { searchAction } from '@/lib/actions/search';

export default function SearchBar() {
  return (
    <form action={searchAction} className="hidden justify-center items-center   md:block">
      <input
        className="border-2 text-slate-400 px-2 mr-2 h-10 border-blue-950 rounded-2xl"
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

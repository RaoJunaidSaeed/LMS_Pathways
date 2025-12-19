import React from 'react';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import LinkTag from './LinkTag';
import Logo from './Logo';

export default function Header() {
  return (
    <div className="flex sticky top-0 z-50 w-full px-3 py-1.5 justify-between items-center bg-blue-100">
      <LinkTag path={'/'}>
        <Logo />
      </LinkTag>
      <SearchBar />
      <Navbar />
    </div>
  );
}

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import LinkTag from '@/components/ui/LinkTag';
import Logo from '@/components/ui/Logo';
import SearchInput from '@/components/search/SearchInput';

export default function Header() {
  return (
    // 🛠️ FIX: Updated colors to match Dark Theme (slate-950) instead of blue-100
    <div className="flex sticky top-0 z-50 w-full px-4 py-3 justify-between items-center bg-slate-950 border-b border-slate-800 shadow-sm">
      <LinkTag path={'/'}>
        <Logo />
      </LinkTag>

      <div className="hidden md:block">
        <SearchInput />
      </div>

      <Navbar />
    </div>
  );
}

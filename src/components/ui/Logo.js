import React from 'react';
import Image from 'next/image';
import logo4 from '@public/logo4.png';

export default function Logo() {
  return (
    <div className="flex justify-center items-center">
      <div className="relative h-16 aspect-square rounded-full overflow-hidden">
        <Image src={logo4} alt="logo" fill className="object-cover rounded-full blur-[0.5px] " />
      </div>
      <h2 className="pl-2 text-xl font-bold text-slate-500">
        Pathways
        <span>v2.0</span>
      </h2>
    </div>
  );
}

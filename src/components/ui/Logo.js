import React from 'react';
import Image from 'next/image';
import logo4 from '@public/logo4.png';

export default function Logo() {
  return (
    <div className="flex justify-center items-center">
      <div className="relative h-16 aspect-square rounded-full">
        <Image src={logo4} alt="logo" fill className="object-cover rounded-full " />
      </div>
      <h2 className="text-xl font-bold text-blue-950">Pathways</h2>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';
import { HiHome } from 'react-icons/hi';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { shuffle } from 'lodash';

interface HeaderProps {
  children: ReactNode;
}

export const colors: string[] = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
  'from-sky-500',
  'from-orange-500',
];

const Header = ({ children }: HeaderProps) => {
  const router = useRouter();
  const [color, setColor] = useState('');

  useEffect(() => {
    setColor(shuffle(colors).pop()!);
  }, []);

  return (
    <header className={`h-fit bg-gradient-to-b ${color} p-6`}>
      <div className='w-full mb-4 flex items-center justify-between'>
        <div className='hidden md:flex gap-x-2 items-center'>
          <button
            onClick={() => {
              router.back();
            }}
            className='rounded-full bg-black flex items-center hover:opacity-75 transition'
          >
            <RxCaretLeft size={35} className='text-white' />
          </button>
          <button
            onClick={() => {
              router.forward();
            }}
            className='rounded-full bg-black flex items-center hover:opacity-75 transition'
          >
            <RxCaretRight size={35} className='text-white' />
          </button>
        </div>
        <div className='flex md:hidden gap-x-2 items-center'>
          <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
            <HiHome size={20} className='text-black' />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

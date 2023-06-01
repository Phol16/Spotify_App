'use client';

import React, { useEffect } from 'react';
import { FaSpotify } from 'react-icons/fa';
import { signOut, useSession } from 'next-auth/react';
import { AiFillSetting } from 'react-icons/ai';
import Lottie from 'lottie-react';

import robot from '../../public/assets/lightRobot.json';
import Button from './Button';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.push('/home');
    } else {
      router.push('/');
    }
  }, [session.status]);

  const handleSettings = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className='fixed py-2 px-8 bg-transparent w-full flex justify-between items-center'>
      <FaSpotify size={32} className='text-green-500' />
      {session && session.data?.user ? (
        <div className='flex items-center gap-5'>
          <Button secondary onClick={handleSettings}>
            <AiFillSetting size={28} />
          </Button>
        </div>
      ) : (
        <a href='https://phol.vercel.app/' target='_blank'>
          <Button secondary>
            <Lottie animationData={robot} className='w-[50px] h-auto' />
            <p className='text-base'>Phol</p>
          </Button>
        </a>
      )}
    </div>
  );
};

export default Navbar;

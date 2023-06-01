'use client';

import React from 'react';
import { signIn } from 'next-auth/react';

import Button from '@/components/Button';
import waves from '../../../../public/assets/4031-voice-recognition.json'
import Lottie from 'lottie-react'

const LogIn = () => {

  const handleLogIn = () => {
    signIn('spotify', { callbackUrl: '/home' });
  };

  return (
    <div className='shadow-md shadow-black rounded-full relative'>
      <Button onClick={handleLogIn} primary={true}>
        LogIn with Spotify
      </Button>
      <Lottie animationData={waves} className='w-full h-auto absolute'/>
    </div>
  );
};

export default LogIn;

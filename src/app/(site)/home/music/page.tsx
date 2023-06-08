import clsx from 'clsx';
import React from 'react';
import { BiTimeFive } from 'react-icons/bi';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';

export const MusicHeader = () => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='px-1 flex items-center gap-2'>
        <div
          className={
            'cursor-pointer bottom-2 right-2 w-[40px] h-[40px] bg-green-500 rounded-full flex justify-center items-center'
          }
        >
          <FaPlay className='text-black relative'/>
        </div>
        <AiOutlineHeart className='text-xl'/>
      </div>
      <div className='px-4'>
      <div className='flex items-center p-4 border-b-[1px] border-neutral-500 text-sm font-medium'>
        <p className='flex-[1]'>Title</p>
        <p className='flex-[0.8]'>Album</p>
        <p className='flex-[0.3]'>
          <BiTimeFive className='m-auto text-base' />
        </p>
      </div>
      </div>
    </div>
  );
};

const Music = () => {
  return (
    <div className='p-2 h-[calc(100dvh_-_335px)]'>
      <MusicHeader />
    </div>
  );
};

export default Music;


import React from 'react';
import { TbPlaylist } from 'react-icons/tb';


import ArtistLibrary from './ArtistLibrary';

const Library = () => {

  return (
    <div className='flex flex-col gap-2 '>
      <div className='inline-flex items-center gap-x-2'>
        <TbPlaylist size={26} />
        <p className='text-neutral-400 font-medium text-xs lg:text-base'>Your Library</p>
      </div>
      <div className='flex flex-col gap-5'>
        <h1 className='text-neutral-300 bg-neutral-500 w-fit px-3 py-1 rounded-full textShadow font-semibold bg-opacity-40 text-xs lg:text-sm'>Artist</h1>
        <ArtistLibrary/>
      </div>
    </div>
  );
};

export default Library;

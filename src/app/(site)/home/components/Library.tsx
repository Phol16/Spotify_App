
import React from 'react';
import { TbPlaylist } from 'react-icons/tb';


import ArtistLibrary from './ArtistLibrary';

const Library = () => {

  return (
    <div className='flex flex-col gap-3 '>
      <div className='inline-flex items-center gap-x-2'>
        <TbPlaylist size={26} />
        <p className='text-neutral-400 font-medium text-md'>Your Library</p>
      </div>
      <div className='flex flex-col gap-5'>
        <h1 className='text-neutral-300 bg-neutral-500 w-fit px-3 py-1 rounded-full textShadow font-semibold bg-opacity-40'>Artist</h1>
        <ArtistLibrary/>
      </div>
    </div>
  );
};

export default Library;

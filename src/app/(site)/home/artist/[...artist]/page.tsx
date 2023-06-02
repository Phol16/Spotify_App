'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BsFillPlayFill,BsPauseFill,BsStopFill } from 'react-icons/bs'

import useSpotify from '@/hooks/useSpotify';

import { useSelector } from 'react-redux';
import type { RootState } from '@/libs/store';

const ArtistDetails = () => {
  const [topTracks, setTopTracks] = useState([]);
  const audio = useRef(null);

  const pathname = usePathname();
  const spotifyApi = useSpotify();
  const artist = useSelector((state: RootState) => state.artist.value);

  if (pathname === `/home/artist/${artist}/album`) {
    return (
      <div className='flex justify-center items-center h-full'> Not yet developed </div>
    );
  }

  useEffect(() => {
    spotifyApi.getArtistTopTracks(artist, 'ES').then((data) => {
      if (artist) {
        //@ts-ignore
        setTopTracks(data.body.tracks);
      }
    });
  }, [artist, spotifyApi]);
  console.log(topTracks);

  return (
    <div className='flex flex-col gap-4'>
      {topTracks.map((track, index) => (
        <div
          key={track?.id}
          className='flex items-center p-2 hover:bg-neutral-400 hover:bg-opacity-10 rounded-lg cursor-pointer'
        >
          <p className='flex-[0.1]'>{index + 1}</p>
          <section className='flex gap-x-2 flex-[3]'>
            <Image
              src={track?.album?.images?.[0].url}
              alt='TrackPhoto'
              width={50}
              height={0}
              className='h-auto rounded-lg object-cover'
            />
            <div>
              <h1>{track?.name}</h1>
              <p className='text-xs text-neutral-400'>
                Duration: {Math.floor(track?.duration_ms / 60000)}:
                {Math.round((track?.duration_ms % 60000) / 1000)} mins
              </p>
            </div>
          </section>
          {track?.preview_url && (
            <div>
              <p className='text-xs text-neutral-400 text-center'>Preview</p>
              <audio
                ref={audio}
                controls
                controlsList='nodownload noplaybackrate'
                src={track?.preview_url}
                className='hidden'
              />
              <div className='flex gap-2'>
              <button onClick={()=>{audio.current.play()}}><BsFillPlayFill/></button>
              <button onClick={()=>{audio.current.pause()}}><BsPauseFill/></button>
              <button onClick={()=>{audio.current.pause(), audio.current.currentTime = 0}}><BsStopFill/></button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ArtistDetails;

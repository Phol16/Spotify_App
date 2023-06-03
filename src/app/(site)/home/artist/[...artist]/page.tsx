'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import useSpotify from '@/hooks/useSpotify';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/libs/store';
import { storeSelectedTrack } from '@/libs/store/slice/selectedTrackSlice';
import PreviewTrack from './components/PreviewTrack';
import Album from './components/Album';

const ArtistDetails = () => {
  const [topTracks, setTopTracks] = useState([]);

  const pathname = usePathname();
  const spotifyApi = useSpotify();
  const artist = useSelector((state: RootState) => state.artist.value);

  const dispatch = useDispatch();

  useEffect(() => {
    if (artist) {
      spotifyApi.getArtistTopTracks(artist, 'ES').then((data) => {
        //@ts-ignore
        setTopTracks(data.body.tracks);
      });
    }
  }, [artist, spotifyApi]);

  if (pathname === `/home/artist/${artist}/album`) {
    return (
      <Album info={artist}/>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      {topTracks.map((track, index) => (
        <div className='flex items-center gap-x-3'>
        <div
          key={track?.id}
          onClick={() => {
            dispatch(storeSelectedTrack(track?.id));
          }}
          className='flex-[1] flex items-center p-2 hover:bg-neutral-400 hover:bg-opacity-10 rounded-lg cursor-pointer'
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
        </div>
        {track?.preview_url && <PreviewTrack url={track?.preview_url} />}
        </div>
      ))}
    </div>
  );
};

export default ArtistDetails;

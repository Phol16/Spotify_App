'use client';

import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { HiHome } from 'react-icons/hi';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { shuffle } from 'lodash';

import { useSelector } from 'react-redux';
import type { RootState } from '@/libs/store';

import useSpotify from '@/hooks/useSpotify';
import Image from 'next/image';
import PlayTrack from './PlayTrack';

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
  const [color, setColor] = useState('');
  const [artistDetail, setArtistDetail] = useState<{} | null>(null);

  const router = useRouter();
  const spotifyApi = useSpotify();
  const pathname = usePathname();

  const artist = useSelector((state: RootState) => state.artist.value);

  useEffect(() => {
    setColor(shuffle(colors).pop()!);
  }, [artist, spotifyApi]);

  useEffect(() => {
    if (artist) {
      spotifyApi.getArtist(artist).then((data) => {
        if (pathname === '/home') {
          setArtistDetail(null);
        } else {
          setArtistDetail(data.body);
        }
      });
    }
  }, [artist, pathname]);

  return (
    <header className={`h-fit bg-gradient-to-b ${color} p-6`}>
      <div className='w-full mb-4 flex items-center justify-between'>
        <div className='hidden md:flex gap-x-2 items-center'>
          <button
            onClick={() => {
              // router.back();
            }}
            className='rounded-full bg-black flex items-center hover:opacity-75 transition'
          >
            <RxCaretLeft size={35} className='text-white' />
          </button>
          <button
            onClick={() => {
              // router.forward();
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
        <div>
          <PlayTrack/>
        </div>
      </div>
      <div className='px-2 py-4'>
        {artistDetail ? (
          <div className='flex items-center gap-x-3'>
            <Image
              src={artistDetail?.images?.[1].url}
              alt='Artist Image'
              width={130}
              height={0}
              className='max-h-[130px] object-cover object-center rounded-lg'
            />
            <section className='flex flex-col gap-2'>
              <h1 className='text-4xl'>{artistDetail?.name}</h1>
              <div className='px-2'>
                <p className='text-xs text-neutral-400'>
                  {artistDetail?.type[0].toUpperCase() + artistDetail.type.substring(1)}
                </p>
                <p className='text-sm text-neutral-400'>
                  Followers: {artistDetail?.followers.total}
                </p>
              </div>
            </section>
          </div>
        ) : (
          <h1 className='text-lg font-semibold'>Spotify App</h1>
        )}
      </div>
    </header>
  );
};

export default Header;

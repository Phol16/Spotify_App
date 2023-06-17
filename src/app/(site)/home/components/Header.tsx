'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { HiHome } from 'react-icons/hi';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { shuffle } from 'lodash';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/libs/store';
import { storedashboardTrack } from '@/libs/store/slice/dashboardTrackSlice';
import { storefollowedArtist } from '@/libs/store/slice/followedArtistSlice';

import useSpotify from '@/hooks/useSpotify';
import Image from 'next/image';
import PlayTrack from './PlayTrack';

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

const Header = () => {
  const [color, setColor] = useState('');
  const [artistDetail, setArtistDetail] = useState<
    SpotifyApi.SingleArtistResponse | SpotifyApi.SinglePlaylistResponse | null
  >(null);

  const spotifyApi = useSpotify();
  const pathname = usePathname();
  const router = useRouter();

  let artist = useSelector((state: RootState) => state.artist.value);
  let musicList = useSelector((state: RootState) => state.dashboardTrack.value);
  const dispatch = useDispatch();

  useEffect(() => {
    setColor(shuffle(colors).pop()!);
  }, [spotifyApi, pathname]);

  useEffect(() => {
    if (pathname === '/home') {
      setArtistDetail(null);
      dispatch(storedashboardTrack(null));
      dispatch(storefollowedArtist(null));
    } else {
      if (artist) {
        musicList = '';
        spotifyApi.getArtist(artist).then((data) => {
          if (
            pathname === `/home/artist/${artist}` ||
            pathname === `/home/artist/${artist}/album`
          ) {
            setArtistDetail(data.body);
          } else {
            setArtistDetail(null);
          }
        });
      }
      if (musicList) {
        artist = '';
        spotifyApi.getPlaylist(musicList).then((data) => {
          if (pathname === '/home/music') {
            setArtistDetail(data.body);
          } else {
            setArtistDetail(null);
            dispatch(storedashboardTrack(null));
          }
        });
      }
    }
  }, [pathname]);

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
          <button onClick={()=>{router.push('/home')}} className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
            <HiHome size={20} className='text-black' />
          </button>
        </div>
        <div>
          <PlayTrack />
        </div>
      </div>
      <div className='px-2 py-4'>
        {artistDetail ? (
          <div className='flex items-center gap-x-3'>
            <Image
              src={artistDetail?.images?.[0].url}
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

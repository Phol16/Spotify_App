'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/libs/store';
import useSpotify from '@/hooks/useSpotify';
import Image from 'next/image';
import MusicHeader from './components/MusicHeader';


const Music = () => {
  const [musicListData, setMusicListData] = useState<{} | null>(null);

  const musicList = useSelector((state: RootState) => state.dashboardTrack.value);
  const spotifyApi = useSpotify();

  useEffect(() => {
    if (musicList) {
      spotifyApi.getPlaylist(musicList).then((data) => {
        setMusicListData(data.body.tracks);
      });
    }
  }, [musicList, spotifyApi]);
  return (
    <div className='p-2 h-[calc(100dvh_-_290px)]'>
      <MusicHeader />
      <div className='h-[calc(100dvh_-_410px)] px-5 overflow-y-auto scrollbar-hide'>
        <div className='flex flex-col gap-2 py-2'>
          {
            //@ts-ignore
            musicListData?.items.map((data, index) => (
              <div
                key={data.id}
                className='flex items-center text-sm rounded-lg text-neutral-400 p-1 hover:bg-neutral-700 bg-opacity-20 cursor-pointer'
              >
                <div className='flex-[1] flex gap-x-2 items-center'>
                  <p>{index + 1}</p>
                  <Image
                    src={data?.track?.album.images?.[0]?.url}
                    width={100}
                    height={0}
                    alt='Photo'
                    className='h-auto w-[50px]'
                  />
                  <div>
                    <p className='text-neutral-300'>{data?.track?.name}</p>
                    <p className='text-neutral-400 text-xs'>
                      {data?.track?.artists
                        //@ts-ignore
                        .map((artist) => {
                          return artist.name;
                        })
                        .join(', ')}
                    </p>
                  </div>
                </div>
                <div className='flex-[0.8] '>
                  <p className='text-xs hover:border-b-[1px] hover:text-neutral-300 cursor-pointer w-fit'>
                    {data?.track?.album?.name}
                  </p>
                </div>
                <div className='flex-[0.1]'>{`${Math.floor(
                  data?.track?.duration_ms / 60000
                )}:${Math.round((data?.track?.duration_ms % 60000) / 1000)} `}</div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Music;

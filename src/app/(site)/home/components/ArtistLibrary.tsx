import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import useSpotify from '@/hooks/useSpotify';
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';

import { useDispatch } from 'react-redux';
import { storefollowedArtist } from '@/libs/store/slice/followedArtistSlice';

const ArtistLibrary = () => {
  const [followedArtist, setfollowedArtist] = useState<Record<any, any>[]>([]);

  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getFollowedArtists().then((data) => {
        //@ts-ignore
        setfollowedArtist(data.body.artists.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className=' flex flex-col gap-2 h-[calc(100dvh_-_330px)] overflow-y-auto scrollbar-hide border-b-[1px] border-neutral-700 py-1'>
      {followedArtist.length ? (
        followedArtist.map((followedArtist) => (
          <div
            key={followedArtist.id}
            onClick={() => {
              dispatch(storefollowedArtist(followedArtist.id));
              router.push(`/home/artist/${followedArtist.id}`);
            }}
            className='flex gap-x-2 items-center justify-center lg:justify-start cursor-pointer hover:bg-neutral-800 px-2 py-1 rounded-lg'
          >
            <Image
              src={followedArtist?.images?.[0].url}
              alt='ArtistPhoto'
              width={50}
              height={0}
              className='w-[60px] h-[60px] lg:w-[40px] lg:h-[40px] rounded-full object-cover'
            />
            <section className='hidden lg:flex flex-col justify-center'>
              <h1 className='text-sm'>{followedArtist.name}</h1>
              <p className='text-xs text-neutral-500'>
                {followedArtist?.type[0].toUpperCase() + followedArtist.type.substring(1)}
              </p>
            </section>
          </div>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ArtistLibrary;

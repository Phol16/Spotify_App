import React, { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { shuffle } from 'lodash';

import { useDispatch } from 'react-redux';
import { storefollowedArtist } from '@/libs/store/slice/followedArtistSlice';
import useSpotify from '@/hooks/useSpotify';
import Loading from '@/components/Loading';

const ArtistLibrary = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [followedArtist, setfollowedArtist] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getFollowedArtists().then((data) => {
        //@ts-ignore
        setfollowedArtist(data.body.artists.items);
      });
    }
  }, [session, spotifyApi]);

  const handleImage = useCallback(
    (image: string[]) => {
      const selectedImage = shuffle(image).pop();
      return selectedImage?.url;
    },
    [session]
  );
  return (
    <div className=' flex flex-col gap-2 h-[calc(100dvh_-_390px)] overflow-y-auto scrollbar-hide border-b-[1px] border-neutral-700 py-2'>
      {followedArtist.length ? (
        followedArtist.map((followedArtist) => (
          <div
            key={followedArtist.id}
            onClick={() => {
              dispatch(storefollowedArtist(followedArtist.id));
            }}
            className='flex gap-x-2 items-center cursor-pointer hover:bg-neutral-800 px-2 py-1 rounded-lg'
          >
            <Image
              src={handleImage(followedArtist.images)}
              alt='ArtistPhoto'
              width={50}
              height={0}
              className='w-[50px] h-[50px] rounded-full object-cover'
            />
            <section className='flex flex-col justify-center'>
              <p>{followedArtist.name}</p>
              <p className='text-xs text-neutral-500'>{followedArtist.type}</p>
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

'use client';

import useSpotify from '@/hooks/useSpotify';
import React, { useEffect, useState } from 'react';
import Category from './Category';
import Loading from '@/components/Loading';
import { useSession } from 'next-auth/react';

const Categories = () => {
  const [categories, setCategories] = useState<SpotifyApi.CategoryObject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  useEffect(() => {
    setIsLoading(true);
    spotifyApi
      .getCategories()
      .then((data) => {
        setCategories(data?.body?.categories?.items);
      })
      .catch((error) => {
        console.log('Something went wrong @ categories', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [spotifyApi, session]);

  return (
    <div className='flex flex-col gap-4 h-full'>
      {!isLoading ? (
        categories.map((data) => <Category data={data} key={data?.id} />)
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Categories;

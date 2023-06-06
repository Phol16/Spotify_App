import useSpotify from '@/hooks/useSpotify';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa';

interface CategoryProps {
  href: string;
  icons: Record<any, string>;
  id: string;
  name: string;
}
export const CategoryItem = ({ id }: { id: string }) => {
  const [categoryPlaylist, setCategoryPLaylist] = useState<Record<any,any>[]>();
  const [hidden, setHidden] = useState(null);
  const spotifyApi = useSpotify();

  useEffect(() => {
    spotifyApi
      .getPlaylistsForCategory(id)
      .then((data) => {
        setCategoryPLaylist(data?.body?.playlists?.items);
      })
      .catch((error) => {
        console.log('Something went wrong');
      });
  }, [spotifyApi, categoryPlaylist]);

  return (
    <div className='flex gap-2 overflow-x-auto scrollbar-hide '>
      {categoryPlaylist &&
        categoryPlaylist.map((data, index) => (
          <div
            key={data.id + index}
            onMouseOver={() => {
              //@ts-ignore
              setHidden(index);
            }}
            onMouseOut={() => {
              setHidden(null);
            }}
            className='bg-neutral-500 bg-opacity-10 flex flex-col gap-1 items-center p-5 rounded-lg w-fit hover:bg-neutral-700 cursor-pointer'
          >
            <div className='w-[200px] h-[200px] bg-white relative'>
              <Image
                src={data?.images?.[0]?.url}
                alt='Photo'
                width={200}
                height={0}
                className='w-full h-full object-cover'
              />
              <div
                className={clsx(
                  'absolute bottom-2 right-2 w-[40px] h-[40px] bg-green-500 rounded-full flex justify-center items-center',
                  hidden !== index && 'hidden'
                )}
              >
                <FaPlay className='text-black relative ' />
              </div>
            </div>
            <section className='flex flex-col gap-2'>
              <h1 className='text-sm'>{data.name}</h1>
              <p className='text-xs text-neutral-400 max-w-sm'>{data.description}</p>
            </section>
          </div>
        ))}
    </div>
  );
};

const Category = ({ data }: { data: CategoryProps }) => {
  return (
    <div className=''>
      <h1 className='text-xl font-semibold'>{data.name}</h1>
      <section className='overflow-hidden p-2 relative'>
        <CategoryItem id={data.id} />
      </section>
    </div>
  );
};

export default Category;

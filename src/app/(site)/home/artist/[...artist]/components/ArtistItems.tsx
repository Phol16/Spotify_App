'use client';

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { MdAlbum, MdAudiotrack } from 'react-icons/md';

import { useSelector } from 'react-redux';
import type { RootState } from '@/libs/store';
import Link from 'next/link';
import clsx from 'clsx';

const ArtistItems = () => {
  const pathname = usePathname();
  const artist = useSelector((state: RootState) => state.artist.value);

  const routes = useMemo(
    () => [
      {
        icon: MdAudiotrack,
        label: 'Top Tracks',
        active: pathname !== `/home/artist/${artist}/album`,
        href: `/home/artist/${artist}`,
      },
      {
        icon: MdAlbum,
        label: 'Album',
        active: pathname === `/home/artist/${artist}/album`,
        href: `/home/artist/${artist}/album`,
      },
    ],
    [pathname, artist]
  );

  return (
    <section className='flex items-center gap-x-2 p-1'>
      {routes.map((Item) => (
        <Link
          key={Item.label}
          href={Item.href}
          className={clsx(
            `
          flex flex-row h-auto items-center w-full gap-x-2 text-md p-1 font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1
          `,
            Item.active && 'text-white bg-neutral-400 bg-opacity-20 rounded-lg'
          )}
        >
          <Item.icon size={26} />
          <p>{Item.label}</p>
        </Link>
      ))}
    </section>
  );
};

export default ArtistItems;

'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import ProfileSidebarItem from './ProfileSidebarItem';
import Loading from '@/components/Loading';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (session) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [session]);

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: 'Home',
        active: pathname !== '/search',
        href: '/home',
      },
      {
        icon: BiSearch,
        label: 'Search',
        active: pathname === '/search',
        href: '/search',
      },
    ],
    [pathname]
  );

  return (
    <div className='flex flex-col justify-center gap-2 h-full overflow-hidden'>
      <section className='flex items-center gap-2'>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Image
              src={session?.user!.image!}
              alt='Profile'
              width={50}
              height={0}
              className='rounded-full w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] object-cover object-center'
            />
            <h1 className='text-base font-semibold'>{session?.user!.name}</h1>
          </>
        )}
      </section>
      <section>
        {routes.map((item) => (
          <ProfileSidebarItem key={item.label} {...item} />
        ))}
      </section>
    </div>
  );
};

export default Profile;

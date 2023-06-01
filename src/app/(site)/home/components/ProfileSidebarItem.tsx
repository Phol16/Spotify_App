import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons/lib';
import clsx from 'clsx';

interface ProfileSidebarItemProps {
  icon: IconType;
  label: string;
  active: boolean;
  href: string;
}

const ProfileSidebarItem = ({
  icon: Icon,
  label,
  active,
  href,
}: ProfileSidebarItemProps) => {
  return (
    <Link
      href={href}
      className={clsx(
        `
  flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1
  `,
        active && 'text-white'
      )}
    >
      <Icon size={26} />
      <p>{label}</p>
    </Link>
  );
};

export default ProfileSidebarItem;

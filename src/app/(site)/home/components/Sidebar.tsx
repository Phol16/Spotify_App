'use client';

import React from 'react';

import Profile from './Profile';
import Library from './Library';

const Sidebar = () => {
  return (
    <div className=' flex flex-col h-full'>
      <section className='bg-zinc-700 my-4 rounded-lg p-5 flex-[1] bg-opacity-20'>
        <Library />
      </section>
      <section className='bg-zinc-700 rounded-lg h-full p-5 flex-[0.2] bg-opacity-20 '>
        <Profile />
      </section>
    </div>
  );
};

export default Sidebar;

import ArtistItems from './components/ArtistItems';

export default function ArtistDetailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=' h-[calc(100dvh_-_365px)] p-3'>
      <ArtistItems />
      <div className='bg-neutral-700 p-2 rounded-lg h-full bg-opacity-20 overflow-y-auto scrollbar-hide'>
      {children}
      </div>
    </div>
  );
}

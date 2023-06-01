import LogIn from './components/LogIn';
import { FaSpotify } from 'react-icons/fa';

export default function Intro() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-10 p-12'>
      <FaSpotify size={52} className='text-white'/>
      <h1 className='text-xl text-center textShadow'>
        Welcome to {' '}
        <span className='text-green-500 uppercase font-semibold'>Spotify App</span>
      </h1>
      <LogIn />
    </main>
  );
}

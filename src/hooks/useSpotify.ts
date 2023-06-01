import spotifyApi from '@/libs/spotify';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function useSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      //@ts-ignore
      if (session.error === 'refresh access token error') {
        signIn();
      }
      //@ts-ignore
      spotifyApi.setAccessToken(session.user!.accessToken);
    }
  }, [session]);

  return spotifyApi;
}

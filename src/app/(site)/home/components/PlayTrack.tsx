import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import type { RootState } from '@/libs/store';
import useSpotify from '@/hooks/useSpotify';

const PlayTrack = () => {
  const track = useSelector((state: RootState) => state.track.value);
  const spotifyApi = useSpotify();

  useEffect(() => {
    if (track) {
      spotifyApi.getTrack(track).then((data) => {});
    }
  }, [track, spotifyApi]);

  return <div>{/* Play Track */}</div>;
};

export default PlayTrack;

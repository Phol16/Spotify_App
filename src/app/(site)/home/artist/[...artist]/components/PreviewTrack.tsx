import React, { useRef, useState } from 'react';

import { BsFillPlayFill, BsPauseFill, BsStopFill } from 'react-icons/bs';


const PreviewTrack = ({ url }: { url: string }) => {
  const [playstate, setPlayState] = useState(false);
  const audio = useRef<any>(null);

  return (
      <div className='bg-neutral-700 p-2 rounded-lg bg-opacity-20'>
        <p className='text-xs text-neutral-400 text-center'>Preview</p>
        <audio
          ref={audio}
          controls
          controlsList='nodownload noplaybackrate'
          src={url}
          className='hidden'
        />
        <div className='flex gap-2 items-center justify-center'>
          {!playstate && (
            <button
              onClick={() => {
                audio.current!.play();
                audio.current!.volume = 0.4;
                setPlayState(true);
              }}
            >
              <BsFillPlayFill />
            </button>
          )}
          {playstate && (
            <button
              onClick={() => {
                audio.current!.pause();
                setPlayState(false);
              }}
            >
              <BsPauseFill />
            </button>
          )}
          <button
            onClick={() => {
              audio.current!.pause();
              audio.current!.currentTime = 0;
              setPlayState(false);
            }}
          >
            <BsStopFill />
          </button>
        </div>
      </div>
  );
};

export default PreviewTrack;

import useSpotify from '@/hooks/useSpotify'
import React, { useEffect } from 'react'

const Album = ({info}:{info:string}) => {
  const spotifyApi = useSpotify();

  return (
    <div className='flex justify-center items-center h-[calc(100dvh_-_330px)]'> Not yet developed </div>
  )
}

export default Album
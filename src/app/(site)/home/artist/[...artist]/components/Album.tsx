import useSpotify from '@/hooks/useSpotify'
import React, { useEffect } from 'react'

const Album = ({info}:{info:string}) => {
  const spotifyApi = useSpotify();

  useEffect(()=>{
    spotifyApi.getArtistAlbums(info).then((data)=>{
      console.log(data)
    })
    },[info])

  return (
    <div className='flex justify-center items-center h-full'> Not yet developed </div>
  )
}

export default Album
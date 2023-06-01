
import SpotifyWebApi from 'spotify-web-api-node'

const scopes = [
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-read-email',
  'streaming',
  'user-read-private',
  'user-library-read',
  'user-top-read',
  // 'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-recently-played',
  'user-follow-read',
].join(' ')

const params = {
  scope:scopes,
}

const queryParamsString = new URLSearchParams(params);

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamsString.toString()}`

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENTID,
  clientSecret: process.env.SPOTIFY_SECRETID,
})

export default spotifyApi

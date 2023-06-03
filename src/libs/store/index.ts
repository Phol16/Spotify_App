import { configureStore } from '@reduxjs/toolkit'

import followedArtist from './slice/followedArtistSlice'
import selectedTrack from './slice/selectedTrackSlice'

export const store = configureStore({
  reducer: {
    artist: followedArtist,
    track: selectedTrack,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
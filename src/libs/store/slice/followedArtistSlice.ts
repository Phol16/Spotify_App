import { createSlice } from '@reduxjs/toolkit'

export interface FollowedArtistState {
  value: string
}

const initialState: FollowedArtistState = {
  value: '',
}

export const followedArtistSlice = createSlice({
  name: 'followedArtist',
  initialState,
  reducers: {
    storefollowedArtist:(state,action)=>{
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { storefollowedArtist } = followedArtistSlice.actions

export default followedArtistSlice.reducer
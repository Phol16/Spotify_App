import { createSlice } from '@reduxjs/toolkit'

export interface FollowedArtistState {
  value: string
}

const initialState: FollowedArtistState = {
  value: '',
}

export const selectedTrackSlice = createSlice({
  name: 'selectedTrack',
  initialState,
  reducers: {
    storeSelectedTrack:(state,action)=>{
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { storeSelectedTrack } = selectedTrackSlice.actions

export default selectedTrackSlice.reducer
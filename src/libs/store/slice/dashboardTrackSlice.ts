import { createSlice } from '@reduxjs/toolkit'

export interface dashboardTrackState {
  value: string
}

const initialState: dashboardTrackState = {
  value: '',
}

export const dashboardTrackSlice = createSlice({
  name: 'dashboardTrack',
  initialState,
  reducers: {
    storedashboardTrack:(state,action)=>{
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { storedashboardTrack } = dashboardTrackSlice.actions

export default dashboardTrackSlice.reducer
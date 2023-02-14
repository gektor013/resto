import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rooms: []
};

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setAllRoomsData: (state, action) => {
      console.log('ROOMS');
      state.rooms = action.payload
    }
  }
});

export const {
  setAllRoomsData
} = roomsSlice.actions;

export default roomsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rooms: []
};

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setAllRoomsData: (state, action) => {
      state.rooms = action.payload
    },
    createRoomSlice: (state, action) => {
      state.rooms = [...state.rooms, action.payload]
    },
    patchRoomSlice: (state, action) => {
      const index = state.rooms.findIndex(
        room => room.id === action.payload.id,
      );

      if (index === -1) {
        state.rooms = [
          ...state.rooms, { ...action.payload }
        ];
      } else {
        state.rooms[index] = { ...action.payload }
      }
    },
  }
});

export const {
  setAllRoomsData,
  createRoomSlice,
  patchRoomSlice,
} = roomsSlice.actions;

export default roomsSlice.reducer;

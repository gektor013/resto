import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  allRooms: [],

  createdRooms: [],
  editedRooms: [],
  deletedRooms: []
};

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setAllRoomsData: (state, action) => {
      state.allRooms = action.payload
    },
    createRoomSlice: (state, action) => {
      state.createdRooms.push(action.payload)
    },
    editedRoomsSlice: (state, action) => {
      const oneRoomToAllRoomsIndex = state.allRooms.findIndex(
        room => room.id === action.payload.id,
      );

      const unsyncCreatedIndex = state.createdRooms.findIndex(
        room => room.internalID === action.payload.internalID,
      );


      // console.log(oneRoomToAllRoomsIndex, 'oneRoomToAllRoomsIndex');
      if (oneRoomToAllRoomsIndex === -1) {

        if (unsyncCreatedIndex === -1) {
          return
        } else {
          state.createdRooms[unsyncCreatedIndex] = action.payload
        }
      } else {
        state.allRooms[oneRoomToAllRoomsIndex] = action.payload
        state.editedRooms.push(action.payload)
      }
    },
  }
});

const selectRooms = state => state.rooms;

export const allRoomsDataCS = createSelector(
  selectRooms,
  state => state.allRooms
);

export const createdRoomsDataCS = createSelector(
  selectRooms,
  state => state.createdRooms
);

export const editedRoomsDataCS = createSelector(
  selectRooms,
  state => state.editedRooms
);

export const {
  setAllRoomsData,
  createRoomSlice,
  patchRoomSlice,
  editedRoomsSlice
} = roomsSlice.actions;

export default roomsSlice.reducer;

import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  allRooms: [],
  createdRooms: [{ internalID: "8ccae2da-cfa3-4b47-a5b3-afbbd5f84124", name: "Gvg", tables: [] }],
  editedRooms: [],
  deletedRooms: [],

  tables: {
    createdTables: [],
    editedTables: [],
    deletedTables: []
  }
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

      const unsyncCreatedRoomIndex = state.createdRooms.findIndex(
        room => room.internalID === action.payload.internalID,
      );

      if (oneRoomToAllRoomsIndex === -1) {

        if (unsyncCreatedRoomIndex === -1) {
          return
        } else {
          state.createdRooms[unsyncCreatedRoomIndex] = action.payload
        }
      } else {
        state.allRooms[oneRoomToAllRoomsIndex] = action.payload
        state.editedRooms.push(action.payload)
      }
    },

    deletedRoomsSlice: (state, action) => {

      const oneRoomToAllRoomsIndex = state.allRooms.findIndex(
        room => room.id === action.payload.id,
      );

      const unsyncCreatedRoomIndex = state.createdRooms.findIndex(
        room => room.internalID === action.payload.internalID,
      );

      if (oneRoomToAllRoomsIndex === -1) {

        if (unsyncCreatedRoomIndex === -1) {
          return
        } else {
          state.createdRooms = state.createdRooms.filter(room => room.internalID !== action.payload.internalID)
        }
      } else {
        state.allRooms = state.allRooms.filter(room => room.id !== action.payload.id)
        state.deletedRooms.push(action.payload)
      }
    },

    setNewTableToRoomSlice: (state, action) => {
      const oneRoomToAllRoomsIndex = state.allRooms.findIndex(
        room => room.id === action.payload.room.id,
      );

      const unsyncCreatedRoomIndex = state.createdRooms.findIndex(
        room => room.internalID === action.payload.room.internalID,
      );

      if (oneRoomToAllRoomsIndex === -1) {
        if (unsyncCreatedRoomIndex === -1) {
          return
        } else {
          state.createdRooms[unsyncCreatedRoomIndex].tables.push(action.payload)
        }

      } else {
        state.allRooms[oneRoomToAllRoomsIndex].tables.push(action.payload)
        state.tables.createdTables.push(action.payload)
      }
    },

    editTableSlice: (state, action) => {
      const oneRoomInAllRoomsIndex =
        state.allRooms.findIndex(room => room.id === action.payload.room.id)

      const oneRoomInCreatedRoomsIndex =
        state.createdRooms.findIndex(room => room.internalID === action.payload.room.internalID)

      if (oneRoomInAllRoomsIndex !== -1) {
        const oneTableOnAllRoomsIndex =
          state.allRooms[oneRoomInAllRoomsIndex].tables.findIndex(table => table.id === action.payload.id)

        if (oneTableOnAllRoomsIndex !== -1) {

          state.allRooms[oneRoomInAllRoomsIndex].tables[oneTableOnAllRoomsIndex] = action.payload
          state.tables.editedTables.push(action.payload)

        } else {
          console.log(oneTableOnAllRoomsIndex, 'oneTableOnAllRoomsIndex');
          return
        }
      }

      if (oneRoomInCreatedRoomsIndex !== -1) {
        const oneTableOnCreatedRoomsIndex =
          state.createdRooms[oneRoomInCreatedRoomsIndex].tables.findIndex(table => table.internalID === action.payload.internalID)

        if (oneTableOnCreatedRoomsIndex !== -1) {
          state.createdRooms[oneRoomInCreatedRoomsIndex].tables[oneTableOnCreatedRoomsIndex] = action.payload
        } else {
          console.log(oneTableOnCreatedRoomsIndex, 'oneTableOnCreatedRoomsIndex');
          return
        }
      }



    }
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

export const deletedRoomsDataCS = createSelector(
  selectRooms,
  state => state.deletedRooms
);

export const {
  setAllRoomsData,
  createRoomSlice,
  editedRoomsSlice,
  deletedRoomsSlice,
  setNewTableToRoomSlice,
  editTableSlice,
} = roomsSlice.actions;

export default roomsSlice.reducer;

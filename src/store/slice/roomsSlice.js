import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  allRooms: [],
  createdRooms: [],
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
    //updates the table data in the redux when successfully sent to the server
    updateTableDataSlice: (state, action) => {
      const { internalID, name, id, seatQuantity } = action.payload

      const removalTable =
        state.tables.createdTables.find(table => table.internalID === internalID)

      const searchTableInCreatedRooms =
        state.createdRooms.findIndex(room => room.internalID === action.payload.room.internalID)

      if (removalTable) {
        state.tables.createdTables =
          state.tables.createdTables.filter(table => table.internalID !== removalTable.internalID)
      }

      if (searchTableInCreatedRooms !== -1) {
        const oneTableOnCreatedRooms =
          state.createdRooms[searchTableInCreatedRooms].tables.findIndex(table => table.internalID === internalID)

        state.createdRooms[searchTableInCreatedRooms].tables[oneTableOnCreatedRooms] = { id, name, seatQuantity }
      } else {
        return
      }
    },

    // updates the data on the first render
    setAllRoomsData: (state, action) => {
      state.allRooms = action.payload
    },
    createRoomSlice: (state, action) => {
      state.createdRooms.push(action.payload)
    },

    // searches in synced and unsynced and updates the room data
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

    // searches in synced and unsynced and deleted the room data
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

    // searches in synced and unsynced roms and added the table data 
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
          state.tables.createdTables.push(action.payload)
        }

      } else {
        state.allRooms[oneRoomToAllRoomsIndex].tables.push(action.payload)
        state.tables.createdTables.push(action.payload)
      }
    },

    // searches in synced and unsynced tables and updated the data
    editTableSlice: (state, action) => {
      const oneRoomInAllRoomsIndex =
        state.allRooms.findIndex(room => room.id === action.payload.room.id)

      const oneRoomInCreatedRoomsIndex =
        state.createdRooms.findIndex(room => room.internalID === action.payload.room.internalID)

      if (oneRoomInAllRoomsIndex !== -1) {
        const keyName = action.payload?.id ? 'id' : 'internalID'

        const oneTableOnAllRoomsIndex =
          state.allRooms[oneRoomInAllRoomsIndex].tables.findIndex(table => table[keyName] === action.payload[keyName])


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
    },

    // searches in synced and unsynced tables and deleted the data
    deletedTableSlice: (state, action) => {
      const oneRoomInAllRoomsIndex =
        state.allRooms.findIndex(room => room.id === action.payload.room.id)

      const oneRoomInCreatedRoomsIndex =
        state.createdRooms.findIndex(room => room.internalID === action.payload.room.internalID)

      if (oneRoomInAllRoomsIndex !== -1) {
        const oneTableOnAllRooms = state.allRooms[oneRoomInAllRoomsIndex].tables.find(table => table.id === action.payload.id)

        if (oneTableOnAllRooms) {
          state.allRooms[oneRoomInAllRoomsIndex].tables = state.allRooms[oneRoomInAllRoomsIndex].tables.filter(table => table.id !== oneTableOnAllRooms.id)
          state.tables.deletedTables.push(oneTableOnAllRooms)
        } else {
          return
        }
      }


      if (oneRoomInCreatedRoomsIndex !== -1) {
        const oneTableOnCreatedRooms =
          state.createdRooms[oneRoomInCreatedRoomsIndex].tables.find(table => table.internalID === action.payload.internalID)

        if (oneTableOnCreatedRooms) {
          state.createdRooms[oneRoomInCreatedRoomsIndex].tables =
            state.createdRooms[oneRoomInCreatedRoomsIndex].tables.filter(table => table.internalID !== oneTableOnCreatedRooms.internalID)
        } else {
          return
        }
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

export const deletedRoomsDataCS = createSelector(
  selectRooms,
  state => state.deletedRooms
);

export const createdTablesDataCS = createSelector(
  selectRooms,
  state => state.tables.createdTables
);

export const {
  setAllRoomsData,
  createRoomSlice,
  editedRoomsSlice,
  deletedRoomsSlice,
  setNewTableToRoomSlice,
  editTableSlice,
  deletedTableSlice,
  updateTableDataSlice,
} = roomsSlice.actions;

export default roomsSlice.reducer;

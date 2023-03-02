import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  allRooms: [],
  createdRooms: [],
  editedRooms: [],
  deletedRooms: [],

  tables: {
    createdTables: [],
    editedTables: [],
    deletedTables: [],
  },
};

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    // updates the data on the first render
    setAllRoomsData: (state, action) => {
      state.allRooms = action.payload;
    },
    createRoomSlice: (state, action) => {
      state.createdRooms.push(action.payload);
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
          return;
        } else {
          state.createdRooms[unsyncCreatedRoomIndex] = action.payload;
        }
      } else {
        state.allRooms[oneRoomToAllRoomsIndex] = action.payload;
        state.editedRooms.push(action.payload);
      }
    },

    updateRoomSlice: (state, action) => {
      const searchRoomInCreadetRooms = state.createdRooms.find(
        room => room.internalID === action.payload.internalID)

      // set room id
      if (searchRoomInCreadetRooms) {
        state.createdRooms = state.createdRooms.filter(room =>
          room.internalID !== action.payload.internalID)

        state.allRooms.push(action.payload)
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
          return;
        } else {
          state.createdRooms = state.createdRooms.filter(
            room => room.internalID !== action.payload.internalID,
          );
        }
      } else {
        state.allRooms = state.allRooms.filter(
          room => room.id !== action.payload.id,
        );
        state.deletedRooms.push(action.payload);
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
          return;
        } else {
          state.createdRooms[unsyncCreatedRoomIndex].tables.push(
            action.payload,
          );
          state.tables.createdTables.push(action.payload);
        }
      } else {
        state.allRooms[oneRoomToAllRoomsIndex].tables.push(action.payload);
        state.tables.createdTables.push(action.payload);
      }
    },

    // searches in synced and unsynced tables and updated the data
    editTableSlice: (state, action) => {
      const keyName = action.payload?.id ? 'id' : 'internalID';

      const oneRoomInAllRoomsIndex = state.allRooms.findIndex(
        room => room.id === action.payload.room.id,
      );

      const oneRoomInCreatedRoomsIndex = state.createdRooms.findIndex(
        room => room.internalID === action.payload.room.internalID,
      );

      state.tables.createdTables.forEach((table, index) => {
        if (
          table.internalID &&
          table.internalID === action.payload.internalID
        ) {
          state.tables.createdTables[index] = action.payload;
        }
      });

      if (oneRoomInAllRoomsIndex !== -1) {
        // find element in room with index
        const oneTableOnAllRoomsIndex = state.allRooms[
          oneRoomInAllRoomsIndex
        ].tables.findIndex(table => table[keyName] === action.payload[keyName]);

        // find element in editable
        const oneTableInEditTables = state.tables.editedTables.findIndex(
          table => table[keyName] === action.payload[keyName],
        );

        if (oneTableOnAllRoomsIndex !== -1) {
          state.allRooms[oneRoomInAllRoomsIndex].tables[
            oneTableOnAllRoomsIndex
          ] = action.payload;
        } else if (oneTableInEditTables !== -1) {
          state.tables.editedTables[oneTableInEditTables] = action.payload;
        } else {
          state.tables.editedTables.push(action.payload);
        }
      }

      if (oneRoomInCreatedRoomsIndex !== -1) {
        const oneTableOnCreatedRoomsIndex = state.createdRooms[
          oneRoomInCreatedRoomsIndex
        ].tables.findIndex(
          table => table.internalID === action.payload.internalID,
        );

        if (oneTableOnCreatedRoomsIndex !== -1) {
          state.createdRooms[oneRoomInCreatedRoomsIndex].tables[
            oneTableOnCreatedRoomsIndex
          ] = action.payload;
        }
      }
    },

    // searches in synced and unsynced tables and deleted the data
    deletedTableSlice: (state, action) => {
      const oneRoomInAllRoomsIndex = state.allRooms.findIndex(
        room => room.id === action.payload.room.id,
      );

      const oneRoomInCreatedRoomsIndex = state.createdRooms.findIndex(
        room => room.internalID === action.payload.room.internalID,
      );

      if (oneRoomInAllRoomsIndex !== -1) {
        const oneTableOnAllRooms = state.allRooms[
          oneRoomInAllRoomsIndex
        ].tables.find(table => table.id === action.payload.id);

        if (oneTableOnAllRooms) {
          state.allRooms[oneRoomInAllRoomsIndex].tables = state.allRooms[
            oneRoomInAllRoomsIndex
          ].tables.filter(table => table.id !== oneTableOnAllRooms.id);
          state.tables.deletedTables.push(oneTableOnAllRooms);
        } else {
          return;
        }
      }

      if (oneRoomInCreatedRoomsIndex !== -1) {
        const oneTableOnCreatedRooms = state.createdRooms[
          oneRoomInCreatedRoomsIndex
        ].tables.find(table => table.internalID === action.payload.internalID);

        if (oneTableOnCreatedRooms) {
          state.createdRooms[oneRoomInCreatedRoomsIndex].tables =
            state.createdRooms[oneRoomInCreatedRoomsIndex].tables.filter(
              table => table.internalID !== oneTableOnCreatedRooms.internalID,
            );
        } else {
          return;
        }
      }
    },

    //updates the table data in the redux when successfully sent to the server
    updateTableDataSlice: (state, action) => {
      // createdTables: [],
      //  editedTables: [],

      const { internalID, name, id, seatQuantity } = action.payload;

      const removeTableFromCreated = state.tables.createdTables.find(
        table => table.internalID === internalID,
      );

      const searchTableInCreatedRooms = state.createdRooms.findIndex(
        room => room.internalID === action.payload.room.internalID,
      );

      const searchUnsyncTableInEditedTables =
        state.tables.editedTables.findIndex(
          table => table.internalID === internalID,
        );

      if (removeTableFromCreated) {
        state.tables.createdTables = state.tables.createdTables.filter(
          table => table.internalID !== removeTableFromCreated.internalID,
        );
      }

      if (searchTableInCreatedRooms !== -1) {
        const oneTableOnCreatedRooms = state.createdRooms[
          searchTableInCreatedRooms
        ].tables.findIndex(table => table.internalID === internalID);

        state.createdRooms[searchTableInCreatedRooms].tables[
          oneTableOnCreatedRooms
        ] = { id, name, seatQuantity };
      }

      if (searchUnsyncTableInEditedTables !== -1) {
        state.tables.editedTables[searchUnsyncTableInEditedTables].id = id;
      }
    },

    removeTableInDeletedTables: (state, action) => {
      const findDeletedTablse = state.tables.deletedTables.find(
        table => table.id === action.payload.id,
      );

      if (findDeletedTablse) {
        state.tables.deletedTables = state.tables.deletedTables.filter(
          table => table.id !== findDeletedTablse.id,
        );
      }
    },

    removeTableInEditTables: (state, action) => {
      const keyName = action.payload?.id ? 'id' : 'internalID';

      const findDeletedTablse = state.tables.editedTables.find(
        table => table[keyName] === action.payload[keyName],
      );
    },
  },
});

const selectRooms = state => state.rooms;

export const allRoomsDataCS = createSelector(
  selectRooms,
  state => state.allRooms,
);

export const createdRoomsDataCS = createSelector(
  selectRooms,
  state => state.createdRooms,
);

export const editedRoomsDataCS = createSelector(
  selectRooms,
  state => state.editedRooms,
);

export const deletedRoomsDataCS = createSelector(
  selectRooms,
  state => state.deletedRooms,
);

export const createdTablesDataCS = createSelector(
  selectRooms,
  state => state.tables.createdTables,
);

export const deletedTablesDataCS = createSelector(
  selectRooms,
  state => state.tables.deletedTables,
);

export const editedTablesDataCS = createSelector(
  selectRooms,
  state => state.tables.editedTables,
);

export const {
  setAllRoomsData,
  createRoomSlice,
  editedRoomsSlice,
  updateRoomSlice,
  deletedRoomsSlice,
  setNewTableToRoomSlice,
  editTableSlice,
  deletedTableSlice,
  updateTableDataSlice,
  removeTableInDeletedTables,
} = roomsSlice.actions;

export default roomsSlice.reducer;

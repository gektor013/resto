import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: []
};

export const employeesSlice = createSlice({
  name: 'emplooyes',
  initialState,
  reducers: {
    setAllEmployeesData: (state, action) => {
      state.employees = action.payload
    },
    deleteEmployeesData: (state, action) => {
      const filterElement = state.employees.filter(elem => elem.id !== action.payload)
      state.employees = filterElement
    },
    createEmployeeData: (state, action) => {
      state.employees = [...state.employees, action.payload]
    }
    // createRoomSlice: (state, action) => {
    //   state.rooms = [...state.rooms, action.payload]
    // },
    // patchRoomSlice: (state, action) => {
    //   const index = state.rooms.findIndex(
    //     room => room.id === action.payload.id,
    //   );

    //   if (index === -1) {
    //     state.rooms = [
    //       ...state.rooms, { ...action.payload }
    //     ];
    //   } else {
    //     state.rooms[index] = { ...action.payload }
    //   }
    // },

  }
});

export const {
  setAllEmployeesData,
  deleteEmployeesData,
  createEmployeeData
} = employeesSlice.actions;

export default employeesSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allEmployees: [],

  unsyncEmployees: [],
  deletedEmployees: []
};

export const employeesSlice = createSlice({
  name: 'emplooyes',
  initialState,
  reducers: {
    setAllEmployeesData: (state, action) => {
      state.allEmployees = action.payload
    },
    setToUnsynchronized: (state, action) => {
      state.unsyncEmployees.push(action.payload)
    },

    deleteEmployeesData: (state, action) => {

      const employeeWithId = state.allEmployees.find(
        employee => employee.id === action.payload,
      );

      if (employeeWithId) {
        state.allEmployees = state.allEmployees.filter(employee => employee.id !== employeeWithId.id)

      } else {
        state.unsyncEmployees = state.unsyncEmployees.filter(employee => employee.internalID !== action.payload)
      }
    },

    removeUnsyncEmployee: (state, action) => {
      // const employeeWithInternalID = state.unsyncEmployees.find(
      //   employee => employee.internalID === action.payload.internalID,
      // );

      // if (employeeWithInternalID) {
      //   state.unsyncEmployees = state.unsyncEmployees.filter(employee => employee.internalID !== employeeWithInternalID.internalID)
      // }
      state.unsyncEmployees = []
    }
  }
});

export const {
  setAllEmployeesData,
  deleteEmployeesData,
  setToUnsynchronized,
  removeUnsyncEmployee,
} = employeesSlice.actions;

export default employeesSlice.reducer;

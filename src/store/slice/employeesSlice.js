import { createSlice, createSelector } from '@reduxjs/toolkit';

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
        state.deletedEmployees.push(employeeWithId)
      } else {
        state.unsyncEmployees = state.unsyncEmployees.filter(employee => employee.internalID !== action.payload)
      }

    },

    clearDeletedEmployee: (state) => {
      state.deletedEmployees = []
    },

    removeUnsyncEmployee: (state, action) => {
      const employeeWithInternalID = state.unsyncEmployees.find(
        employee => employee.internalID === action.payload.internalID,
      );

      if (employeeWithInternalID) {
        state.unsyncEmployees = state.unsyncEmployees.filter(employee => employee.internalID !== employeeWithInternalID.internalID)
      }
      // state.unsyncEmployees = []
      // return () => initialState
    }
  }
});

const selectEmployees = state => state.employees;

export const allEmployeesCS = createSelector(
  selectEmployees,
  employees => employees.allEmployees
);

export const unsyncEmployeesDataCS = createSelector(
  selectEmployees,
  employees => employees.unsyncEmployees
);

export const deletedEmployeesCS = createSelector(
  selectEmployees,
  employees => employees.deletedEmployees
);

export const {
  setAllEmployeesData,
  deleteEmployeesData,
  clearDeletedEmployee,
  setToUnsynchronized,
  removeUnsyncEmployee,
} = employeesSlice.actions;

export default employeesSlice.reducer;

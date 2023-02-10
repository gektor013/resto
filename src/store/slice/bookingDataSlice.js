import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  date: '',
  startTime: '11:00',
  endTime: '12:00',
  prefixName: 0,
  name: 'TEST',
  email: null,
  phone: '',
  numberOfGuestsAdult: 0,
  numberOfGuestsChild: 0,
  numberOfGuestsBaby: 0,
  status: 2,
  tables: [''],
  commentByGuest: '',
  commentByAdminForGuest: '',
  commentByAdminForAdmin: '',
};

export const bookingDataSlice = createSlice({
  name: 'bookingData',
  initialState,
  reducers: {
    setBookingData: (state, action) => {
      if (action.payload.id === 'tables') {
        state.tables = [action.payload.data]
      } else {
        state[action.payload.id] = action.payload.data
      }
    },

    resetBookingData: (state) => {
      for (const key in state) {
        if (typeof state[key] === 'string') {
          state[key] = ''
        }
        if (typeof state[key] === 'object') {
          state[key] = []
        }
        if (typeof state[key] === 'number') {
          state[key] = 0
        }
        if (state[key] === null) {
          state[key] = null
        }

      }
    }
  }
});

export const {
  setBookingData,
  resetBookingData,
} = bookingDataSlice.actions;

export default bookingDataSlice.reducer;

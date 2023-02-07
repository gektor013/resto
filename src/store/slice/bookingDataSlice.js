import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  date: '',
  startTime: '13:00',
  endTime: '13:30',
  prefixName: 0,
  name: '',
  email: null,
  phone: '',
  numberOfGuestsAdult: 0,
  numberOfGuestsChild: 0,
  numberOfGuestsBaby: 0,
  status: 0,
  commentByGuest: '',
  commentByAdminForGuest: '',
  commentByAdminForAdmin: '',
};

export const bookingDataSlice = createSlice({
  name: 'bookingData',
  initialState,
  reducers: {
    setBookingData: (state, action) => {
      state[action.payload.id] = action.payload.data
      // console.log(state);
    },

    resetBookingData: (state) => {
      // state = initialState
      for (const key in state) {
        if (typeof state[key] === 'string') {
          state[key] = ''
        }
        if (typeof state[key] === 'number') {
          state[key] = 0
        }
        if (state[key] === null) {
          state[key] = null
        }
      }
      // console.log(typeof state.date, 'state.date');
      // console.log(typeof state.prefixName, 'state.prefixName');
      // console.log(typeof state.email, 'state.email');

    }
  }
});

export const {
  setBookingData,
  resetBookingData
} = bookingDataSlice.actions;

export default bookingDataSlice.reducer;

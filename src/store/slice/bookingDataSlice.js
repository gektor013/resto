import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  date: '',
  startTime: '',
  endTime: '',
  prefixName: 0,
  name: '',
  email: null,
  phone: '',
  numberOfGuestsAdult: 0,
  numberOfGuestsChild: 0,
  numberOfGuestsBaby: 0,
  status: 2,
  table: null,
  commentByGuest: '',
  commentByAdminForGuest: '',
  commentByAdminForAdmin: '',
  employee: null
};

export const bookingDataSlice = createSlice({
  name: 'bookingData',
  initialState,
  reducers: {
    setBookingData: (state, action) => {
      state[action.payload.id] = action.payload.data
    },
    resetBookingData: () => initialState,
  }
});

export const {
  setBookingData,
  resetBookingData,
} = bookingDataSlice.actions;

export default bookingDataSlice.reducer;

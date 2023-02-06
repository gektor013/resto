import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todays: {
    allBooking: [],
    waitingBooking: [],
    cancelBookings: []
  },
  unsynchronized: {
    created: [],
    edited: [],
  },
  // selected: {
  //   booked: [],
  //   canceled: [],
  //   confirmed: [],
  //   waiting: [],
  //   arived: [],
  //   deleted: [],
  // },
  // all_booked: [],
};

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setTodaysAllBookings: (state, action) => {
      state.todays.allBooking = action.payload
    }
  }
});

export const {
  setTodaysAllBookings
} = bookingsSlice.actions;

export default bookingsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // these bookings show if there is no internet
  todays: {
    allBooking: [],
    waitingBooking: [],
    cancelBookings: []
  },

  // created bookings when there is no internet
  unsynchronized: {
    created: [],
    edited: [],
  },

  // bookings of other days
  other: {
    allOtherDayBooking: [],
    // waitingBooking: [],
    // cancelBookings: []
  },
};

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setTodaysAllBookings: (state, action) => {
      state.todays.allBooking = action.payload
    },
    setUnsynchronizedBookings: (state, action) => {
      state.unsynchronized.created = action.payload
    },

    // other bookings reducers
    setOtherDayAllBookings: (state, action) => {
      state.other.allOtherDayBooking = action.payload
    },

  }
});

export const {
  setTodaysAllBookings,
  setOtherDayAllBookings,
  setUnsynchronizedBookings
} = bookingsSlice.actions;

export default bookingsSlice.reducer;

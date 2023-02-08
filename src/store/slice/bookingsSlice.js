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
    allEditedBookings: []
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
    setAllEditedBookings: (state, action) => {
      state.other.allEditedBookings = [...state.other.allEditedBookings, action.payload]
    },
    clearAllEditBookings: (state) => {
      state.other.allEditedBookings = []
    },
  }
});

export const {
  setTodaysAllBookings,
  setOtherDayAllBookings,
  setUnsynchronizedBookings,
  setAllEditedBookings,
  clearAllEditBookings,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;

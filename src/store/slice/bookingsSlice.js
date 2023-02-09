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

    // unsync bookings reducersr
    setUnsynchronizedCreateBookings: (state, action) => {
      state.unsynchronized.created = [...state.unsynchronized.created, action.payload]
    },
    clearUnsynchronizedCreateBookings: (state) => {
      state.unsynchronized.created = []
    },
    setUnsynchronizedEditedBookings: (state, action) => {
      state.unsynchronized.edited = [...state.unsynchronized.edited, action.payload]
    },
    clearUnsynchronizedEditedBookings: (state) => {
      state.unsynchronized.edited = []
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
  //today reducers
  setTodaysAllBookings,
  setOtherDayAllBookings,

  // unsynchronized reducers
  setUnsynchronizedCreateBookings,
  clearUnsynchronizedCreateBookings,
  setUnsynchronizedEditedBookings,
  clearUnsynchronizedEditedBookings,

  // ohter day reducers
  setAllEditedBookings,
  clearAllEditBookings,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;

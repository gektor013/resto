import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // these bookings show if there is no internet
  todays: {
    allBooking: []
  },

  // created bookings when there is no internet
  unsynchronized: {
    created: [],
    edited: [],
  },

  // bookings of other days
  other: {
    allOtherDayBooking: [],
    allOtherDayWaitingBooking: [],
    allOtherDayCancelBookings: []
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
      const index = state.unsynchronized.created.findIndex(
        booking => booking.internalID === action.payload.internalID,
      );

      if (index === -1) {
        state.unsynchronized.edited = [
          ...state.unsynchronized.edited,
          { ...action.payload, status: 0 },
        ];
      } else {
        state.unsynchronized.created[index] = { ...action.payload, status: 0 }
      }

    },

    clearUnsynchronizedEditedBookings: (state) => {
      state.unsynchronized.edited = []
    },

    // other bookings reducers
    setOtherDayAllBookings: (state, action) => {
      state.other.allOtherDayBooking = action.payload
    },

    setOtherDayWaitBookings: (state, action) => {
      state.other.allOtherDayWaitingBooking = action.payload
    },

    setOtherDayCancelBookings: (state, action) => {
      state.other.allOtherDayCancelBookings = action.payload
    },


  }
});

export const {
  //today reducers
  setTodaysAllBookings,


  // unsynchronized reducers
  setUnsynchronizedCreateBookings,
  clearUnsynchronizedCreateBookings,
  setUnsynchronizedEditedBookings,
  clearUnsynchronizedEditedBookings,

  // ohter day reducers
  setOtherDayAllBookings,
  setOtherDayWaitBookings,
  setOtherDayCancelBookings
} = bookingsSlice.actions;

export default bookingsSlice.reducer;

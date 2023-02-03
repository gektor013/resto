import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todays: {
    booked: [],
    canceled: [],
    confirmed: [],
    waiting: [],
    arived: [],
    deleted: [],
  },
  unsynchronized: {
    created: [],
    edited: [],
  },
  selected: {
    booked: [],
    canceled: [],
    confirmed: [],
    waiting: [],
    arived: [],
    deleted: [],
  },
  all_booked: [],
};

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    // TODAYS BOOKED
    setTodaysBookedBookings: (state, action) => {
      state.todays.booked = action.payload;
    },

    // TODAYS CANCELED
    setTodaysCanceledBookings: (state, action) => {
      state.todays.canceled = action.payload;
    },

    // TODAYS CONFIRMED
    setTodaysConfirmedBookings: (state, action) => {
      state.todays.confirmed = action.payload;
    },

    // TODAYS DELETED
    setTodaysDeletedBookings: (state, action) => {
      state.todays.deleted = action.payload;
    },

    // TODAYS ARIVED
    setTodaysArivedBookings: (state, action) => {
      state.todays.deleted = action.payload;
    },

    // TODAYS WAITINGS
    setTodaysWaitingsBookings: (state, action) => {
      state.todays.waiting = action.payload;
    },

    // UNSYNC CREATED
    setUnsyncCreatedBookings: (state, action) => {
      state.unsynchronized.created = action.payload;
    },

    putOrUpdateUnsyncCreatedBooking: (state, action) => {
      const index = state.unsynchronized.created.findIndex(
        booking => booking.internalID === action.payload.internalID,
      );
      if (index === -1) {
        state.unsynchronized.created = [
          ...state.unsynchronized.created,
          action.payload,
        ];
      } else {
        state.unsynchronized.created[index] = action.payload
      }
    },
    deleteUnsyncCreatedBooking: (state, action) => {
      const updated = state.unsynchronized.created.filter(
        booking => booking.internalID !== action.payload.internalID
      );
      state.unsynchronized.created = updated;
    },

    // UNSYNC EDITED
    setUnsyncEditedBookings: (state, action) => {
      state.unsynchronized.edited = action.payload;
    },

    putOrUpdateUnsyncEditedBooking: (state, action) => {
      const index = state.unsynchronized.edited.findIndex(
        booking => booking.internalID === action.payload.internalID,
      );
      if (index === -1) {
        state.unsynchronized.edited = [
          ...state.unsynchronized.edited,
          action.payload,
        ];
      } else {
        state.unsynchronized.edited[index] = action.payload;
      }
    },
    deleteUnsyncEditedBooking: (state, action) => {
      const updated = state.unsynchronized.edited.filter(
        booking => booking.internalID !== action.payload.internalID,
      );
      state.unsynchronized.edited = updated;
    },

    //SELECTED BOOKED
    setSelectedBookedBookings: (state, action) => {
      state.selected.booked = action.payload;
    },

    //SELECTED CANCELED
    setSelectedCanceledBookings: (state, action) => {
      state.selected.canceled = action.payload;
    },

    //SELECTED CONFIRMED
    setSelectedConfirmedBookings: (state, action) => {
      state.selected.confirmed = action.payload;
    },

    //SELECTED WAITINGS
    setSelectedWaitingBookings: (state, action) => {
      state.selected.waiting = action.payload;
    },

    setSelectedArivedsBookings: (state, action) => {
      state.selected.arived = action.payload;
    },

    //ALL BOOKED
    setAllBookedBookings: (state, action) => {
      state.all_booked = action.payload;
    },
  },
});

export const {
  setTodaysBookedBookings,
  setTodaysCanceledBookings,
  setTodaysConfirmedBookings,
  setTodaysWaitingsBookings,
  setUnsyncCreatedBookings,
  putOrUpdateUnsyncCreatedBooking,
  deleteUnsyncCreatedBooking,
  setUnsyncEditedBookings,
  putOrUpdateUnsyncEditedBooking,
  deleteUnsyncEditedBooking,
  setSelectedBookedBookings,
  setSelectedCanceledBookings,
  setSelectedConfirmedBookings,
  setSelectedWaitingBookings,
  setSelectedArivedsBookings,
  setAllBookedBookings,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;

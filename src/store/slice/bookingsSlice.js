import {createSelector, createSlice} from '@reduxjs/toolkit';

const initialState = {
  // these bookings show if there is no internet
  todays: {
    allBooking: [], //0, 1, 2, 3, 4
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
    allOtherDayDeletedBookings: [],
  },
};

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    updateBookingTable: (state, action) => {
      const createdBookingIndex = state.unsynchronized.created.findIndex(
        book =>
          (book.table.internalID &&
            book.table.internalID === action.payload.internalID) ||
          (book.table.id && book.table.id === action.payload.id),
      );

      const editBookingIndex = state.unsynchronized.edited.findIndex(
        book =>
          (book.table.internalID &&
            book.table.internalID === action.payload.internalID) ||
          (book.table.id && book.table.id === action.payload.id),
      );

      if (createdBookingIndex !== -1) {
        state.unsynchronized.created[createdBookingIndex].table.id =
          action.payload.id;
      }
      if (editBookingIndex !== -1) {
        state.unsynchronized.edited[editBookingIndex].table.id =
          action.payload.id;
      }
    },

    setTodaysAllBookings: (state, action) => {
      state.todays.allBooking = action.payload;
    },

    // unsync bookings reducersr
    setUnsynchronizedCreateBookings: (state, action) => {
      const index = state.unsynchronized.created.findIndex(
        booking => booking.internalID === action.payload.internalID,
      );

      if (index === -1) {
        state.unsynchronized.created = [
          ...state.unsynchronized.created,
          action.payload,
        ];
      } else {
        state.unsynchronized.created[index] = action.payload;
      }
    },

    setUnsyncEmployeeToUnsyncCreated: (state, action) => {
      const index = state.unsynchronized.created.findIndex(booking => {
        return booking.employee.internalID === action.payload.internalID;
      });

      if (index === -1) {
        return;
      } else {
        state.unsynchronized.created[index] = {
          ...state.unsynchronized.created[index],
          employee: action.payload,
        };
      }
    },

    clearUnsynchronizedCreateBookings: (state, action) => {
      // const updated = state.unsynchronized.created.filter(
      //   booking => booking.internalID !== action.payload.internalID
      // );

      const bookingWithInternalID = state.unsynchronized.created.find(
        booking => booking.internalID === action.payload.internalID,
      );

      if (bookingWithInternalID) {
        state.unsynchronized.created = state.unsynchronized.created.filter(
          booking => booking.internalID !== bookingWithInternalID.internalID,
        );
      }
      // state.unsynchronized.created = [];
    },

    setUnsynchronizedEditedBookings: (state, action) => {
      const unsyncCreatedIndex = state.unsynchronized.created.findIndex(
        booking => booking.internalID === action.payload.internalID,
      );

      const unsyncEditedIndex = state.unsynchronized.edited.findIndex(
        booking => booking.internalID === action.payload.internalID,
      );

      if (unsyncCreatedIndex === -1) {
        if (unsyncEditedIndex === -1) {
          state.unsynchronized.edited = [
            ...state.unsynchronized.edited,
            action.payload,
          ];
        } else {
          state.unsynchronized.edited[unsyncEditedIndex] = action.payload;
        }
      } else {
        state.unsynchronized.created[unsyncCreatedIndex] = action.payload;
      }
    },

    removeUnsynchronizedEditedBookingsById: (state, action) => {
      state.unsynchronized.edited = state.unsynchronized.edited.filter(
        booking => booking.id !== action.payload,
      );
    },

    clearUnsynchronizedEditedBookings: (state, action) => {
      const updated = state.unsynchronized.edited.filter(
        booking => booking.internalID !== action.payload.internalID,
      );
      state.unsynchronized.edited = updated;
    },

    // other bookings reducers
    setOtherDayAllBookings: (state, action) => {
      state.other.allOtherDayBooking = action.payload;
    },

    setOtherDayWaitBookings: (state, action) => {
      state.other.allOtherDayWaitingBooking = action.payload;
    },

    setOtherDayDeletedBookings: (state, action) => {
      state.other.allOtherDayDeletedBookings = action.payload;
    },
  },
});

const selectEmployees = state => state.bookings;

export const todayAllBookingsCS = createSelector(
  selectEmployees,
  bookings => bookings.todays.allBooking,
);

export const otherDayBookingsCS = createSelector(
  selectEmployees,
  bookings => bookings.other.allOtherDayBooking,
);

export const createdUnsyncBookingCS = createSelector(
  selectEmployees,
  bookings => bookings.unsynchronized,
);

export const {
  //today reducers
  setTodaysAllBookings,

  // unsynchronized reducers
  setUnsynchronizedCreateBookings,
  clearUnsynchronizedCreateBookings,
  setUnsyncEmployeeToUnsyncCreated,
  setUnsynchronizedEditedBookings,
  clearUnsynchronizedEditedBookings,
  removeUnsynchronizedEditedBookingsById,

  // ohter day reducers
  setOtherDayAllBookings,
  setOtherDayWaitBookings,
  setOtherDayDeletedBookings,

  updateBookingTable,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;

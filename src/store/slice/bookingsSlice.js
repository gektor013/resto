import { createSelector, createSlice } from '@reduxjs/toolkit';

const init = [
  {
    "id": 877,
    "date": "14 Apr 2023",
    "startTime": "11:00",
    "endTime": "12:00",
    "prefixName": 0,
    "name": "Тест1",
    "phone": "",
    "numberOfGuests": "",
    "numberOfGuestsAdult": 9,
    "numberOfGuestsChild": 0,
    "numberOfGuestsBaby": 0,
    "status": 2,
    "commentByGuest": "",
    "commentByAdminForGuest": "",
    "commentByAdminForAdmin": "",
    "uuid": "4cdfebb3-edf9-4cdf-b066-f9114caa7ba4",
    "createdAt": "2023-04-13T14:00:08+00:00",
    "employee": { "id": 709, "name": "Uh" }
  },
  {
    "id": 878,
    "date": "15 Apr 2023",
    "startTime": "12:22",
    "prefixName": 0,
    "name": "Test 2",
    "phone": "",
    "numberOfGuests": "",
    "numberOfGuestsAdult": 0,
    "numberOfGuestsChild": 0,
    "numberOfGuestsBaby": 0,
    "status": 4,
    "commentByGuest": "",
    "commentByAdminForGuest": "",
    "commentByAdminForAdmin": "",
    "uuid": "0a7d9822-99a9-4d5b-afa8-c8b49da5f287",
    "createdAt": "2023-04-13T14:20:00+00:00",
    "table": {
      "id": 18,
      "name": "6c",
      "seatQuantity": "14",
      "room": {
        "id": 70,
        "name": "Alex",
        "createdAt": "2023-03-16T09:12:49+00:00",
        "updatedAt": "2023-03-16T09:12:49+00:00",
        "createdBy": "/api/users/1"
      },
      "createdAt": "2023-02-14T09:07:12+00:00",
      "updatedAt": "2023-03-16T09:12:49+00:00",
      "createdBy": "/api/users/1",
      "updatedBy": "/api/users/1"
    },
    "employee": { "id": 698, "name": "Sergey" }
  },
  {
    "id": 879,
    "date": "16 Apr 2023",
    "startTime": "12:22",
    "prefixName": 0,
    "name": "Test 3",
    "phone": "",
    "numberOfGuests": "",
    "numberOfGuestsAdult": 0,
    "numberOfGuestsChild": 0,
    "numberOfGuestsBaby": 0,
    "status": 4,
    "commentByGuest": "",
    "commentByAdminForGuest": "",
    "commentByAdminForAdmin": "",
    "uuid": "0a7d9822-99a9-4d5b-afa8-c8b49da5f287",
    "createdAt": "2023-04-13T14:20:00+00:00",
    "table": {
      "id": 18,
      "name": "6c",
      "seatQuantity": "14",
      "room": {
        "id": 70,
        "name": "Alex",
        "createdAt": "2023-03-16T09:12:49+00:00",
        "updatedAt": "2023-03-16T09:12:49+00:00",
        "createdBy": "/api/users/1"
      },
      "createdAt": "2023-02-14T09:07:12+00:00",
      "updatedAt": "2023-03-16T09:12:49+00:00",
      "createdBy": "/api/users/1",
      "updatedBy": "/api/users/1"
    },
    "employee": { "id": 698, "name": "Sergey" }
  },
  {
    "id": 880,
    "date": "16 Apr 2023",
    "startTime": "12:22",
    "prefixName": 0,
    "name": "Test 3",
    "phone": "",
    "numberOfGuests": "",
    "numberOfGuestsAdult": 0,
    "numberOfGuestsChild": 0,
    "numberOfGuestsBaby": 0,
    "status": 4,
    "commentByGuest": "",
    "commentByAdminForGuest": "",
    "commentByAdminForAdmin": "",
    "uuid": "0a7d9822-99a9-4d5b-afa8-c8b49da5f287",
    "createdAt": "2023-04-13T14:20:00+00:00",
    "table": {
      "id": 18,
      "name": "6c",
      "seatQuantity": "14",
      "room": {
        "id": 70,
        "name": "Alex",
        "createdAt": "2023-03-16T09:12:49+00:00",
        "updatedAt": "2023-03-16T09:12:49+00:00",
        "createdBy": "/api/users/1"
      },
      "createdAt": "2023-02-14T09:07:12+00:00",
      "updatedAt": "2023-03-16T09:12:49+00:00",
      "createdBy": "/api/users/1",
      "updatedBy": "/api/users/1"
    },
    "employee": { "id": 698, "name": "Sergey" }
  }
]


const initialState = {
  // these bookings show if there is no internet
  todays: {
    allBooking: init, //0, 1, 2, 3, 4
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

    // tables section

    updateBookingTable: (state, action) => {
      const actionId = action.payload.id;
      const actionInternalID = action.payload.internalID;
      let tableId, tableInternalId;

      [
        ...state.todays.allBooking,
        ...state.unsynchronized.created,
        ...state.unsynchronized.edited,
        ...state.other.allOtherDayBooking,
        ...state.other.allOtherDayDeletedBookings,
        ...state.other.allOtherDayWaitingBooking,
      ].forEach(booking => {
        tableId = booking?.table?.id;
        tableInternalId = booking?.table?.internalID;

        if (tableId && tableId === actionId) {
          booking.table = action.payload;
          console.log('update table by id => ', booking);
        } else if (tableInternalId && tableInternalId === actionInternalID) {
          booking.table = action.payload;
          console.log('update table by internalID => ', booking);
        }
      });
    },

    // removeTable
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

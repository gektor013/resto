import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  dates: []
};

export const datesSlice = createSlice({
  name: 'bookingDates',
  initialState,
  reducers: {
    setBookingDates: (state, action) => {
      state.dates = action.payload
    },
    setOneDate: (state, action) => {
      state.dates.push(action.payload)
    }
  },
});

const selectControl = state => state.dates;

export const bookingDatesCS = createSelector(
  selectControl,
  state => state.dates
);


export const { setBookingDates, setOneDate } = datesSlice.actions;

export default datesSlice.reducer;

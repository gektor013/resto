import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  date: new Date().toString(),
  isLoading: false,
  isNeedUpdate: false,
};

export const controlSlice = createSlice({
  name: 'control',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.date = action.payload.toString();
    },
    setIsNeedUpdate: (state, action) => {
      state.isNeedUpdate = action.payload;
    },
    setIsChekingsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

const selectControl = state => state.control;

export const isNeedUpdateCS = createSelector(
  selectControl,
  state => state.isNeedUpdate
);

export const dateCS = createSelector(
  selectControl,
  state => state.date
);


export const {
  setSelectedDate,
  setIsNeedUpdate,
  setIsChekingsLoading,
} = controlSlice.actions;

export default controlSlice.reducer;

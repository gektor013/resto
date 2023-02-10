import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  date: new Date().toString(),
  isLoading: false,
  isNeedUpdate: false,
  isNeedCheckUpdates: false,
  isUpdateAvailable: false,
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
    setIsNeedCheckUpdates: (state, action) => {
      state.isNeedCheckUpdates = action.payload;
    },
    setIsChekingsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsUpdateAvailable: (state, action) => {
      state.isUpdateAvailable = action.payload;
    },
  },
});

export const {
  setSelectedDate,
  setIsNeedUpdate,
  setIsNeedCheckUpdates,
  setIsChekingsLoading,
  setIsUpdateAvailable,
} = controlSlice.actions;

export default controlSlice.reducer;

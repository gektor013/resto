import { createSlice } from '@reduxjs/toolkit';

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

export const {
  setSelectedDate,
  setIsNeedUpdate,
  setIsChekingsLoading,
} = controlSlice.actions;

export default controlSlice.reducer;

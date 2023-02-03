import {createSlice} from '@reduxjs/toolkit';

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
      return {
        ...state,
        date: action.payload.toString(),
        isUpdateAvailable: false,
      };
    },
    setIsNeedUpdate: (state, action) => {
      return {
        ...state,
        isNeedUpdate: action.payload,
      };
    },
    setIsNeedCheckUpdates: (state, action) => {
      return {
        ...state,
        isNeedCheckUpdates: action.payload,
      };
    },
    setIsChekingsLoading: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    setIsUpdateAvailable: (state, action) => {
      return {
        ...state,
        isUpdateAvailable: action.payload,
      };
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

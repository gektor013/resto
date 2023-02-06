import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  token: null,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.token = initialState.token;
    },
  },
});

export const { login, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;

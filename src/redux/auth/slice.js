import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, getUserInfo } from './operations';

const initialState = {
  isLoading: false,
  error: null,
  user: { username: null, email: null, balance: null },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      // *Register
      .addCase(register.pending, state => {
        state.isLoading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = { ...action.payload.user };
        state.token = action.payload.token;
        state.isLoading = false;
        state.error = null;
      })

      // *Login
      .addCase(logIn.pending, state => {
        state.isLoading = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = { ...action.payload.user };
        state.isLoading = false;
        state.error = null;
      })

      // *Logout
      .addCase(logOut.pending, state => {
        state.isLoading = true;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, state => {
        state.isLoggedIn = false;
        state.token = null;
        state.user = { username: null, email: null, balance: null };
        state.isLoading = false;
        state.error = null;
      })

      // *Get user info
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;

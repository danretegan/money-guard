import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosConfig from '../axiosConfig';

axiosConfig.setAxiosBaseURL();

const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/auth/sign-up', { ...userData });
      axiosConfig.setAxiosHeader(response.data.token);

      toast.success('Your account has been successfully created!');

      return response.data;
    } catch (error) {
      const errorNotify =
        error.response.data.message ??
        `Register failed. We are facing some technical problems with our servers! `;

      toast.error(errorNotify);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const logIn = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await axios.post('/auth/sign-in', { ...userData });
    axiosConfig.setAxiosHeader(response.data.token);

    toast.success('Logged in successfully !');
    return response.data;
  } catch (error) {
    const errorNotify =
      error.response.data.message ??
      `Log in failed. We are facing some technical problems with our servers! `;

    toast.error(errorNotify);
    return thunkAPI.rejectWithValue(error.message);
  }
});

const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.delete('/auth/sign-out');

    axiosConfig.clearAxiosHeader();
    toast.success(`You're logged out!`);
    return;
  } catch (error) {
    toast.error('Logged out failed. Please, try again!');
    return thunkAPI.rejectWithValue(error.message);
  }
});

const getUserInfo = createAsyncThunk(
  'auth/getUserInfo',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/users/current');

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export { register, logIn, logOut, getUserInfo };

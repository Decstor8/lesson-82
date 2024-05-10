import {createAsyncThunk} from '@reduxjs/toolkit';
import {LoginMutation, RegisterMutation, RegisterResponse, ValidationError, MainError} from '../../types';
import axiosApi from '../../axiosApi.ts';
import {isAxiosError} from 'axios';

export const newUserRegister = createAsyncThunk<RegisterResponse, RegisterMutation, {rejectValue: ValidationError}>(
  'users/register',
  async (registerMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post('/users', registerMutation);
      return response.data;
    } catch (err) {
      if (isAxiosError(err) && err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data);
      }

      throw err;
    }
  }
);

export const newsLoginUser = createAsyncThunk<RegisterResponse, LoginMutation, {rejectValue: MainError}>(
  'users/login',
  async (loginMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('users/sessions', loginMutation);
      return response.data;
    } catch (err) {
      if (isAxiosError(err) && err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data);
      }

      throw err;
    }
  },
);

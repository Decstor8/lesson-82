import {createAsyncThunk} from '@reduxjs/toolkit';
import {MainError, LoginMutation, RegisterMutation, RegisterResponse, ValidationError} from '../../types';
import axiosApi from '../../axiosApi.ts';
import {isAxiosError} from 'axios';
import {unsetUser} from './usersSlice.ts';
import {RootState} from '../../App/store.ts';

export const newUser = createAsyncThunk<RegisterResponse, RegisterMutation, {rejectValue: ValidationError}>(
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

export const loginUser = createAsyncThunk<RegisterResponse, LoginMutation, {rejectValue: MainError}>(
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

export const googleLogin = createAsyncThunk<RegisterResponse, string, {rejectValue: MainError}>(
  'google/login',
  async (credential, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post('/users/google', {credential});
      return response.data;
    } catch (err) {
      if (isAxiosError(err) && err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data);
      }

      throw err;
    }
  },
);

export const logout = createAsyncThunk<void, undefined, {state: RootState}>(
  'users/logout',
  async (_, {getState, dispatch},) => {
    const token = getState().users.user?.token;

    axiosApi.delete('users/sessions', {headers: {'Authorization': 'Bearer ' + token}});
    dispatch(unsetUser());
  },
);
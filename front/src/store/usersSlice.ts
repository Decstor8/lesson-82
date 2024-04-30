import {UserTypes} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {newUser} from './userThunks.ts';
import {RootState} from '../App/store.ts';

export interface  Register {
  user: UserTypes | null;
  isLoadingRegister: boolean;
}

const initialState: Register = {
  user: null,
  isLoadingRegister: false,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(newUser.pending, (state) => {
      state.isLoadingRegister = true;
    });
    builder.addCase(newUser.fulfilled, (state, {payload: items}) => {
      state.isLoadingRegister = true;
      state.user = items.user;
    });
    builder.addCase(newUser.rejected, (state) => {
      state.isLoadingRegister = false;
    });
  },
});

export const userReducer = userSlice.reducer;
export const selectUsers = (state: RootState) => state.users.isLoadingRegister;
export const selectRegisterLoading = (state: RootState) => state.users.isLoadingRegister;
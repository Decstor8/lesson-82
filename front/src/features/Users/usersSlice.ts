import {UserTypes, ValidationError} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {newUserRegister} from './userThunks.ts';
import {RootState} from '../../App/store.ts';

export interface  Register {
  user: UserTypes | null;
  isLoadingRegister: boolean;
  registerError: ValidationError | null;
}

const initialState: Register = {
  user: null,
  isLoadingRegister: false,
  registerError: null,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(newUserRegister.pending, (state) => {
      state.isLoadingRegister = true;
      state.registerError = null;
    });
    builder.addCase(newUserRegister.fulfilled, (state, {payload: items}) => {
      state.isLoadingRegister = true;
      state.user = items.user;
    });
    builder.addCase(newUserRegister.rejected, (state, {payload: error}) => {
      state.isLoadingRegister = false;
      state.registerError = error || null;
    });
  },
});

export const userReducer = userSlice.reducer;
export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.isLoadingRegister;
export const selectRegisterError = (state: RootState) => state.users.registerError;
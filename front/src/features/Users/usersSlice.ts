import {MainError, UserTypes, ValidationError} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {newUserRegister, newsLoginUser} from './userThunks.ts';
import {RootState} from '../../App/store.ts';

export interface  Register {
  user: UserTypes | null;
  isLoadingRegister: boolean;
  registerError: ValidationError | null;
  isLoginLoading: boolean;
  loginError: MainError | null;
}

const initialState: Register = {
  user: null,
  isLoadingRegister: false,
  registerError: null,
  isLoginLoading: false,
  loginError: null,
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
    builder.addCase(newsLoginUser.pending, (state) => {
      state.isLoginLoading = true;
      state.loginError = null;
    });
    builder.addCase(newsLoginUser.fulfilled, (state, {payload: items}) => {
      state.isLoginLoading = false;
      state.user = items.user;
    });
    builder.addCase(newsLoginUser.rejected, (state, {payload: error}) => {
      state.isLoginLoading = false;
      state.loginError = error || null;
    });
  },
});

export const usersReducer = userSlice.reducer;
export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.isLoadingRegister;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginLoading = (state: RootState) => state.users.isLoginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
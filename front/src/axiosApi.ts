import axios from 'axios';
import {Store} from '@reduxjs/toolkit';
import {RootState} from './App/store.ts';
import {apiUrl} from './constants.ts';

const axiosApi = axios.create({
  baseURL: apiUrl,
});

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config) => {
    const token = store.getState().users.user?.token;
    config.headers.set('Authorization', token ? 'Bearer ' + token : undefined);

    return config;
  });
};

export default axiosApi;
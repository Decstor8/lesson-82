import {AlbumsTypes} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {getAlbums} from '../../store/asynсThunks.ts';
import {RootState} from '../../App/store.ts';

export interface Albums {
  albums: AlbumsTypes[];
  isLoading: boolean;
}

const initialState: Albums = {
  albums: [],
  isLoading: false,
};

export const albumsSlice = createSlice({
  name: 'albums/slice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAlbums.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAlbums.fulfilled, (state, {payload: items}) => {
      state.isLoading = false;
      state.albums = items;
    });
    builder.addCase(getAlbums.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectIsLoading = (state: RootState) => state.albums.isLoading;
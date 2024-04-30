import {configureStore} from '@reduxjs/toolkit';
import {artistsReducer} from '../store/artistsSlice.ts';
import {albumsReducer} from '../store/albumsSlice.ts';
import {tracksReducer} from '../store/tracksSlice.ts';
import {userReducer} from '../features/Users/usersSlice.ts';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
    users: userReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
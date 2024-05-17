export interface ArtistsTypes {
  _id: string;
  name: string;
  image: string | null;
  info: string;
  isPublished: boolean;
}

export interface AlbumsTypes {
  _id: string;
  artist: string;
  name: string;
  release: string;
  image: string | null;
  isPublished: boolean;
}

export interface TracksTypes {
  _id: string;
  album: string;
  name: string;
  duration: string;
  number: number;
  isPublished: boolean;
}

export interface RegisterMutation {
  email: string;
  password: string;
}

export interface  LoginMutation {
  email: string;
  password: string;
}

export interface UserTypes {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  image: string | null;
}

export interface RegisterResponse {
  message: string;
  user: UserTypes;
}
export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface MainError{
  err: string;
}

export interface tracksHistoryTypes {
  token: string;
  track: string;
}

export interface History {
  _id: string;
  user: string;
  track: {
    album: {
      artist: string;
    };
    name: string;
  };
  datetime: string;
}

export type ArtistWithoutId = Omit<ArtistsTypes, '_id'>;
export type AlbumWithoutId = Omit<AlbumsTypes, '_id'>;
export type TrackWithoutId = Omit<TracksTypes, '_id'>;

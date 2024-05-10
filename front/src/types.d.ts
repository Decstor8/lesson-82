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
}

export interface TracksTypes {
  _id: string;
  album: string;
  name: string;
  duration: string;
  number: number;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface  LoginMutation {
  username: string;
  password: string;
}

export interface UserTypes {
  _id: string;
  username: string;
  token: string;
  role: string;
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

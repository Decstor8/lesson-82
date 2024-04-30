export interface ArtistsTypes {
  _id: string;
  name: string;
  image: string | null;
  info: string;
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

export interface RegisterUsers {
  username: string;
  password: string;
}

export interface UserTypes {
  _id: string;
  username: string;
  token: string;
}
export interface RegisterResponse {
  message: string;
  user: UserTypes;
}


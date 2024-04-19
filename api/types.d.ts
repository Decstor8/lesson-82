import { Model } from "mongoose";

export interface Artist {
    name: string;
    images: string | null;
    info: string;
  }

  export interface UserFields {
    username: string;
    password: string;
    token: string;
  }

  interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
  }

  type UserModel = Model<UserFields, {}, UserMethods>;
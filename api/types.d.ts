import {Model} from "mongoose";

export interface ArtistTypes {
    name: string;
    image: string | null;
    info: string;
    isPublished: boolean;
}

export interface UserTypes {
    email: string;
    password: string;
    token: string;
    role: string;
    googleID: string;
    displayName: string;
    image: string | null;
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserTypes, {}, UserMethods>;
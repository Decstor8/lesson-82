import {Model} from "mongoose";

export interface ArtistTypes {
    name: string;
    image: string | null;
    info: string;
    isPublished: boolean;
}

export interface UserTypes {
    username: string;
    password: string;
    token: string;
    role: string;
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserTypes, {}, UserMethods>;
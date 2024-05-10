import bcrypt from 'bcrypt';
import mongoose, {HydratedDocument} from "mongoose";
import {UserMethods, UserModel, UserTypes} from "../types";
import { randomUUID } from 'crypto';

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema<UserTypes, UserModel, UserMethods>({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function(this: HydratedDocument<UserTypes>, value: string): Promise<Boolean> {
                if (!this.isModified('username')) return true;

                const user: HydratedDocument<UserTypes> | null = await User.findOne({username: value});
                return !user;
            },
            message: 'Этот пользователь уже зарегистрирован!'
        }
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user',
    }
});

UserSchema.methods.checkPassword = function(password: string) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function() {
    this.token = randomUUID();
}

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash ;
    next();
});

UserSchema.set('toJSON', {
    transform: (_doc, ret, _options) => {
        delete ret.password;
        return ret;
    },
});

const User = mongoose.model<UserTypes, UserModel>('User', UserSchema);
export default User;
import { Model } from 'mongoose';

export interface IUser {
    id?: string;
    role: string;
    password?: string;
}

export interface IUserMethods {
    demo: () => string;
}

export interface IUserStatics extends Model<IUser, object, IUserMethods> {
    demo: () => string;
}

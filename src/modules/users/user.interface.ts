import { Document, Model } from 'mongoose';

export interface IUser extends Document {
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

import { model } from 'mongoose';
import { IUser, IUserStatics } from './user.interface';
import { UserSchema } from './user.schema';

export const User = model<IUser, IUserStatics>('User', UserSchema);

import { Model, model } from 'mongoose'
import { IUser } from './user.interface'
import { UserSchema } from './user.schema'
type UserModel = Model<IUser, object>

export const User = model<IUser, UserModel>('User', UserSchema)

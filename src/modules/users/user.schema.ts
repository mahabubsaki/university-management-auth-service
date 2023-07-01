import { Schema } from 'mongoose'
import { IUser, IUserMethods, IUserStatics } from './user.interface'

export const UserSchema = new Schema<IUser, IUserStatics, IUserMethods>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

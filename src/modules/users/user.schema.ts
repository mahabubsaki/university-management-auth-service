import bcrypt from 'bcrypt';
import { Schema } from 'mongoose';
import { IUser, IUserMethods, IUserStatics } from './user.interface';

export const UserSchema = new Schema<IUser, IUserStatics, IUserMethods>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['student', 'faculty', 'admin'] },
    password: { type: String, required: true },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student'
    },
    // faculty: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Faculty'
    // },
    // admin: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Admin'
    // }
  },
  {
    timestamps: true, toJSON: {
      virtuals: true
    }
  }
);


UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password as string, 12);
  next();
});

import bcrypt from 'bcrypt';
import { Schema } from 'mongoose';
import { IUser, IUserMethods, IUserStatics } from './user.interface';
import { User } from './user.model';

export const UserSchema = new Schema<IUser, IUserStatics, IUserMethods>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['student', 'faculty', 'admin'] },
    password: { type: String, required: true, select: 0 },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student'
    },
    needsPasswordChange: {
      type: Boolean, default: true,
    }
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


UserSchema.methods.isUserExist = async function (id: string) {
  const exist = await User.findById(id, { id: 1, password: 1, needsPasswordChange: 1, role: 1 }).lean();
  return exist;
};

UserSchema.methods.isPasswordMatched = async function (currentPass, actualPass) {
  const match = await bcrypt.compare(currentPass, actualPass as string);
  return match;
};

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password as string, 12);
  next();
});

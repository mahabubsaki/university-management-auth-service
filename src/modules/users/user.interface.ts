import { Document, Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';

export interface IUser extends Document {
    id?: string;
    role: string;
    password?: string;
    student?: Types.ObjectId | IStudent;
    needsPasswordChange: boolean;
    // faculty?: Types.ObjectId | IFaculty;
    // admin?: Types.ObjectId | IAdmin;

}
export interface IUserMethods {
    isUserExist(id: string): Promise<Partial<IUser> | null>,
    isPasswordMatched(givenPass: string, actualPass: string): Promise<boolean>;
}

export interface IUserStatics extends Model<IUser, object, IUserMethods> {
    demo: () => string;
}

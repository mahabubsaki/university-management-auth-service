import { InferSchemaType, Model } from "mongoose";
import { studentSchema } from "./student.schema";

export type IStudent = InferSchemaType<typeof studentSchema>;



export interface IStudentMethods {
    demo: () => string;
}

export interface IStudentStatics extends Model<IStudent, object, IStudentMethods> {
    demo: () => string;
}
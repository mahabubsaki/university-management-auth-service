import { model } from "mongoose";
import { IStudent, IStudentStatics } from "./student.interface";
import { studentSchema } from "./student.schema";

export const Student = model<IStudent, IStudentStatics>('Student', studentSchema);
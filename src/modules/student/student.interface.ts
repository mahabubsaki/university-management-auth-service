import { InferSchemaType, Model } from "mongoose";
import { studentSchema } from "./student.schema";

export type IStudent = InferSchemaType<typeof studentSchema>;

export interface IPaginationOptions {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

export interface IGenericStudentResponse<T> {
    meta: {
        page: number;
        limit: number;
        total: number;
    };
    data: T;
}
export interface IFilterOptions {
    searchTerm?: string;
    id?: string;
    gender?: 'Male' | 'Female',
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-',
    email?: string,
    contactNo?: string;
    emergencyContactNo?: string;
}
export interface IStudentMethods {
    demo: () => string;
}

export interface IStudentStatics extends Model<IStudent, object, IStudentMethods> {
    demo: () => string;
}
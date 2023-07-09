import { Document, Model } from "mongoose";

export interface IAcademicDepartment extends Document {
    title: string;
    academicFaculty: string;
}

export interface IPaginationOptions {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

export interface IFilterOptions {
    searchTerm?: string;
    title?: string;
}

export interface IGenericAcademicDepartmentResponse<T> {
    meta: {
        page: number;
        limit: number;
        total: number;
    };
    data: T;
}

export interface IAcademicDepartmentMethods {
    demo: () => string;
}

export interface IAcademicDepartmentStatics extends Model<IAcademicDepartment, IAcademicDepartmentMethods> {
    demo: () => string;
}

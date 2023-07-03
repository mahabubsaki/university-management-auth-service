import { Document, Model } from "mongoose";

export interface IAcademicFaculty extends Document {
    title: string;
}

export interface IPaginationOptions {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface IFilterOptions {
    searchTerm?: string;
    title?: string;
}

export interface IGenericAcademicFacultyResponse<T> {
    meta: {
        page: number;
        limit: number;
        total: number;
    };
    data: T;
}

export interface IAcademicFacultyMethods {
    demo: () => string;
}

export interface IAcademicFacultyStatics extends Model<IAcademicFaculty, object, IAcademicFacultyMethods> {
    demo: () => string;
}

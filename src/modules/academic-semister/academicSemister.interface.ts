import { Document, Model } from "mongoose";

export interface IAcademicSemester extends Document {
    title: 'Autumn' | 'Summer' | 'Fall',
    year: string,
    code: '01' | '02' | '03',
    startMonth: 'January' | 'May' | 'September';
    endMonth: 'April' | 'August' | 'December';
}
export interface IPaginationOptions {
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc';
};
export interface IFilterOptions {
    searchTerm?: string;
}
export interface IGenericAcademicSemesterResponse<T> {
    meta: {
        page: number,
        limit: number,
        total: number;
    },
    data: T;
}

export interface IAcademicSemesterMethods {
    demo: () => string;
}

export interface IAcademicSemesterStatics extends Model<IAcademicSemester, object, IAcademicSemesterMethods> {
    demo: () => string;
}

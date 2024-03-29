import httpStatus from "http-status";
import { z } from "zod";
import { ApiError } from "../../errors/ApiError";
import { IAcademicSemester } from "./academicSemister.interface";

export const createAcademicSemisterZodSchema = z.object({
    body: z.object({
        title: z.enum(['Autumn', 'Summer', 'Fall'], {
            required_error: "Title is required",
            invalid_type_error: "Title type should be string",

        }).refine((value) => {
            return ['Autumn', 'Summer', 'Fall'].includes(value);
        }, { message: "Title must be one of 'Autumn', 'Summer', or 'Fall'", path: ['title'] }),
        year: z.string({ required_error: "Year is required for creating semister", invalid_type_error: "Year should be number" }).refine(((value: string) => {
            const val = Number(value);
            const currentYear = new Date().getFullYear();
            const minYear = 1900;
            const maxYear = currentYear + 10;

            return val >= minYear && val <= maxYear;
        }), {
            message: "Invalid Year",
            path: ['year']
        }),
        code: z.enum(['01', '02', '03'], {
            required_error: "Code is required",
            invalid_type_error: "Code type should be string",
        }).refine((value) => {
            return ['01', '02', '03'].includes(value);
        }, { message: "Code must be one of '01', '02', '03'", path: ['code'] }),
        startMonth: z.enum(['January', 'May', 'September'], {
            required_error: "Start Month is required",
            invalid_type_error: "Start Month type should be string",
        }).refine((value) => {
            return ['January', 'May', 'September'].includes(value);
        }, { message: "startMonth must be one of 'January', 'May', 'September'", path: ['startMonth'] }),
        endMonth: z.enum(['April', 'August', 'December'], {
            required_error: "End Month is required",
            invalid_type_error: "End Month type should be string",
        }).refine((value) => {
            return ['April', 'August', 'December'].includes(value);
        }, { message: "endMonth must be one of 'April', 'August', 'December'", path: ['endMonth'] })
    })
});

export const validateSemisterObject = (obj: IAcademicSemester): void => {
    let error = false;
    if (obj.title === 'Autumn') {
        if (obj.code !== '01' || obj.startMonth !== 'January' || obj.endMonth !== 'April') {
            error = true;
        }
    } else if (obj.title === 'Summer') {
        if (obj.code !== '02' || obj.startMonth !== 'May' || obj.endMonth !== 'August') {
            error = true;
        }
    } else if (obj.title === 'Fall') {
        if (obj.code !== '03' || obj.startMonth !== 'September' || obj.endMonth !== 'December') {
            error = true;
        }
    }
    if (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid semester data");
    }
};

export const validateUpdateSemesterObject = (obj: Partial<IAcademicSemester>): void => {
    if (!obj.title || !obj.year || !obj.startMonth || !obj.endMonth || !obj.code) {
        throw new ApiError(httpStatus.BAD_REQUEST, "If You want to update a semester then, You have to give title,year,startMongth,endMongth,code");
    }

};


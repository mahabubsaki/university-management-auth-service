import httpStatus from "http-status";
import { z } from "zod";
import { ApiError } from "../../errors/ApiError";
import { IAcademicSemester } from "./academicSemister.interface";

export const createAcademicSemisterZodSchema = z.object({
    body: z.object({
        title: z.enum(['Autumn', 'Summer', 'Fall'], {
            required_error: "Title is required",
            invalid_type_error: "Title type should be string",
        }),
        year: z.string({ required_error: "Year is required for creating semister", invalid_type_error: "Year should be number" }).refine(((value: string) => {
            const val = Number(value);
            const currentYear = new Date().getFullYear();
            const minYear = 1900;
            const maxYear = currentYear + 10;

            return val >= minYear && val <= maxYear;
        }), {
            message: "Invalid Year"
        }),
        code: z.enum(['01', '02', '03'], {
            required_error: "Code is required",
            invalid_type_error: "Code type should be string",
        }),
        startMonth: z.enum(['January', 'May', 'September'], {
            required_error: "Start Month is required",
            invalid_type_error: "Start Month type should be string",
        }),
        endMonth: z.enum(['April', 'August', 'December'], {
            required_error: "End Month is required",
            invalid_type_error: "End Month type should be string",
        })
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
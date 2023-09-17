import httpStatus from "http-status";
import { z } from "zod";
import { ApiError } from "../../errors/ApiError";
import { IAcademicFaculty } from "./academicFaculty.interface";

export const createAcademicFacultyZodSchema = z.object({
    body: z.object({
        title: z.string({ required_error: "Title is required", invalid_type_error: "Title should be a string" }),
    })
});


export const validateUpdateFacultyObject = (obj: Partial<IAcademicFaculty>): void => {
    if (!obj.title) {
        throw new ApiError(httpStatus.BAD_REQUEST, "To update a faculty, name, department, and position are required");
    }
};



import httpStatus from "http-status";
import { z } from "zod";
import { ApiError } from "../../errors/ApiError";
import { IAcademicDepartment } from "./academicDepartment.interface";

export const createAcademicDepartmentZodSchema = z.object({
    body: z.object({
        title: z.string({ required_error: "Title is required", invalid_type_error: "Title should be a string" }),
        academicFaculty: z.string({ required_error: "Academic Faculty is required", invalid_type_error: "Academic Faculty should be a string" })
    }),
});

export const validateUpdateDepartmentObject = (obj: Partial<IAcademicDepartment>): void => {
    if (!obj.title) {
        throw new ApiError(httpStatus.BAD_REQUEST, "To update a department, title is required");
    }
    if (!obj.academicFaculty) {
        throw new ApiError(httpStatus.BAD_REQUEST, "To update a department, Academic Faculty is required");
    }
};



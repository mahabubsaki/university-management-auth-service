import { RequestHandler } from "express";
import { createAcademicDepartmentZodSchema } from "./academicDepartment.validator";

export const validateAcademicDepartment: RequestHandler = async (req, _, next): Promise<void> => {
    try {
        await createAcademicDepartmentZodSchema.parseAsync(req);
        next();
    } catch (err) {
        next(err);
    }
};

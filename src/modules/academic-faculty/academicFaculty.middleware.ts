import { RequestHandler } from "express";
import { createAcademicFacultyZodSchema } from "./academicFaculty.validator";

export const validateAcademicFaculty: RequestHandler = async (req, _, next): Promise<void> => {
    try {
        await createAcademicFacultyZodSchema.parseAsync(req);
        next();
    } catch (err) {
        next(err);
    }
};
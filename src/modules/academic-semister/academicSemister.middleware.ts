import { RequestHandler } from "express";
import { createAcademicSemisterZodSchema } from "./academicSemister.validator";

export const validateAcademicSemister: RequestHandler = async (req, _, next): Promise<void> => {
    try {
        await createAcademicSemisterZodSchema.parseAsync(req);
        next();
    }
    catch (err) {
        next(err);
    }
}


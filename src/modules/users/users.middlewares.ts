import { RequestHandler } from "express";
import { createUserZodSchema } from "./user.validator";

export const validateCreateUser: RequestHandler = async (req, _, next): Promise<void> => {
    try {
        await createUserZodSchema.parseAsync(req);
        next();
    }
    catch (err) {
        next(err);
    }
}



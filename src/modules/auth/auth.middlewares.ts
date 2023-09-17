import { RequestHandler } from "express";
import { authZodSchema } from "./auth.validator";


export const validateLogin: RequestHandler = async (req, _, next): Promise<void> => {
    try {
        await authZodSchema.parseAsync(req);
        next();
    }
    catch (err) {
        next(err);
    }
};
import { RequestHandler } from "express";
import { authZodSchema, refreshTokenZodSchema } from "./auth.validator";


export const validateLogin: RequestHandler = async (req, _, next): Promise<void> => {
    try {
        await authZodSchema.parseAsync(req);
        next();
    }
    catch (err) {
        next(err);
    }
};

export const validateRefreshToken: RequestHandler = async (req, _, next): Promise<void> => {
    try {
        await refreshTokenZodSchema.parseAsync(req);
        next();
    }
    catch (err) {
        next(err);
    }
};
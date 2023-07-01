import { RequestHandler } from "express";
import { createUserZodSchema } from "../../schemas/zod/createUser.schema";

export const validateCreateUser: RequestHandler = async (req, _, next): Promise<void> => {
    try {
        await createUserZodSchema.parseAsync(req);
        next();
    }
    catch (err) {
        next(err);
    }
}



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
};
// export const validateCreateAdmin: RequestHandler = async (req, _, next): Promise<void> => {
//     try {
//         await createAdminZodSchema.parseAsync(req);
//         next();
//     }
//     catch (err) {
//         next(err);
//     }
// };
// export const validateCreateFaculty: RequestHandler = async (req, _, next): Promise<void> => {
//     try {
//         await createFacultyZodSchema.parseAsync(req);
//         next();
//     }
//     catch (err) {
//         next(err);
//     }
// }



import { z } from "zod";

export const createUserZodSchema = z.object({
    body: z.object({
        user: z.object({
            role: z.enum(['student', 'admin', 'faculty'], {
                required_error: "Role is required",
                invalid_type_error: "Role type should be string",
            }).refine((value) => {
                return ['student', 'admin', 'faculty'].includes(value);
            }, { message: "role must be one of 'student','admin','faculty'", path: ['role'] }),
            password: z.string().optional()
        })
    })
});
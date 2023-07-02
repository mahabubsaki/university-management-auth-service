import { z } from "zod";

export const createUserZodSchema = z.object({
    body: z.object({
        role: z.string({
            required_error: "Role is required for creating user",
            invalid_type_error: "Role should be string"
        }),
        password: z.string().optional()
    })
});
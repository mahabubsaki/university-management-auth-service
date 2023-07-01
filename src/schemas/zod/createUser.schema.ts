import { z } from "zod";

export const createUserZodSchema = z.object({
    body: z.object({
        role: z.string({
            required_error: "Role is required for creating user"
        }),
        password: z.string().optional()
    })
});
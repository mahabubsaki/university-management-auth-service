import { z } from "zod";

export const authZodSchema = z.object({
    body: z.object({
        id: z.string({
            required_error: 'ID is required'
        }),
        password: z.string({
            required_error: 'Passwored is required'
        })
    })

});
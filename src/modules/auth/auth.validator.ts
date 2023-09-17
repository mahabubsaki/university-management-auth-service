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

export const refreshTokenZodSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: 'Refresh token is required'
        })
    })
});
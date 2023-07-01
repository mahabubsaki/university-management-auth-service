import { Request, Response } from "express";
import { createUser } from "./user.service";

export const createUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user } = req.body;
        const result = await createUser(user);
        res.send(result);
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'Failed to create user'
        });
    }
};
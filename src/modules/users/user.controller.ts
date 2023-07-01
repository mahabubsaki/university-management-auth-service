import { NextFunction, Request, Response } from "express";
import { createUser } from "./user.service";

export const createUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { user } = req.body;
        const result = await createUser(user);
        res.send(result);
    }
    catch (err) {
        next(err);
    }
};
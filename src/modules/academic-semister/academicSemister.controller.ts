import { RequestHandler } from "express";
import { createSemester } from "./academicSemister.service";

export const createSemesterController: RequestHandler = async (req, res, next) => {
    try {
        const { ...academicSemisterData } = req.body;
        const result = await createSemester(academicSemisterData);
        res.status(200).json({
            success: true,
            message: "Academic semester is created successfully",
            data: result
        });
    }
    catch (err) {
        next(err);
    }

};
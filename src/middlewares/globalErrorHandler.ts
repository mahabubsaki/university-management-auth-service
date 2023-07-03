import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { ZodError } from "zod";
import { ApiError } from "../errors/ApiError";
import handleCastError from "../errors/handleCastError";
import handleValidationError from "../errors/handleValidationError";
import handleZodError from "../errors/handleZodError";
import { IGenericErrorResponse } from "../interfaces/common";
import { errorLogger } from "../shared/logger";

const globalErrorHandler: ErrorRequestHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    let responseObj: IGenericErrorResponse = {
        statusCode: 500,
        message: "Something went wrong!",
        errorMessages: []
    };
    errorLogger.error(err);
    if (err?.name === 'ValidationError' && err instanceof Error.ValidationError) {
        const simplifiedError = handleValidationError(err);
        responseObj = { ...simplifiedError };
    }
    else if (err?.name === 'CastError' && err instanceof Error.CastError) {
        const simplifiedError = handleCastError(err);
        responseObj = { ...simplifiedError };
    }
    else if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        responseObj = { ...simplifiedError };
    }
    else if (err instanceof Error) {
        responseObj = { ...responseObj, message: err.message, errorMessages: err?.message ? [{ path: '', message: err?.message }] : [] };
    } else if (err instanceof ApiError) {
        responseObj = { statusCode: err.statusCode, message: err.message, errorMessages: err?.message ? [{ path: '', message: err?.message }] : [] };
    }


    if (process.env.NODE_ENV === 'development') {
        responseObj.stack = err.stack;
    }
    res.status(responseObj.statusCode).json({ ...responseObj });
    next();
};

export default globalErrorHandler;
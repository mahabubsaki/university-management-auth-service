import { Error } from "mongoose";
import { IGenericErrorResponse } from "../interfaces/common";
import { IGenericError } from "../interfaces/error";

export default function handleCastError(err: Error.CastError): IGenericErrorResponse {
    const errors: IGenericError[] = [
        { path: err.path, message: "Invalid object id given" }
    ];
    return {
        message: 'MongoDB Cast Error',
        statusCode: 400,
        errorMessages: errors
    };
}
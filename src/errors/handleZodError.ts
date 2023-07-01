import { ZodError, ZodIssue } from "zod";
import { IGenericErrorResponse } from "../interfaces/common";
import { IGenericError } from "../interfaces/error";

export default function handleZodError(err: ZodError): IGenericErrorResponse {
    const errors: IGenericError[] = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue.message
        };
    });
    return {
        statusCode: 400,
        errorMessages: errors,
        message: "Zod Schema Error"
    };
}
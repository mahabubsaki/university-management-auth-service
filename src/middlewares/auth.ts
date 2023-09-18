import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../config";
import { ApiError } from "../errors/ApiError";
import { verifyToken } from "../helpers/jwtTokenCreate";
//role based controller protection
const auth = (...roles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "you are not authorized");
        }
        const verifiedUser = verifyToken(token as string, config.jwt_secret as Secret);
        req.user = verifiedUser;
        if (roles.length && !roles.includes(verifiedUser.role)) {
            throw new ApiError(httpStatus.FORBIDDEN, "you do not have access to this");
        }
        next();
    } catch (err) {
        next(err);
    }
};
export default auth;
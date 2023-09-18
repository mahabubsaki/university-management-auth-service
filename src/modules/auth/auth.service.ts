import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import { ENUM_JWT_EXPIRATION } from "../../enums/user.enum";
import { ApiError } from "../../errors/ApiError";
import { createToken, verifyToken } from "../../helpers/jwtTokenCreate";
import { User } from "../users/user.model";
import { ILoginCreds } from "./auth.interface";


export const authLogin = async (payload: ILoginCreds) => {

    const { id, password } = payload;
    // we will do this on instance method
    // const isUserExist = await User.findById(id, { id: 1, password: 1, needsPasswordChange: 1 }).lean();
    // const isPasswordMatch = await bcrypt.compare(password, isUserExist.password as string);

    const userInstance = new User();
    const userInfo = await userInstance.isUserExist(id);
    if (!userInfo) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not exist with the given id");
    }
    if (!userInstance.isPasswordMatched(password, userInfo.password as string)) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
    }
    const needsPasswordChange = userInfo.needsPasswordChange as boolean;
    const accessToken = createToken({ id: userInfo.id, role: userInfo.role }, config.jwt_refresh_secret as Secret, {
        expiresIn: ENUM_JWT_EXPIRATION.JWT_EXIPIRES_IN
    });
    const refreshToken = createToken({ id: userInfo.id, role: userInfo.role }, config.jwt_refresh_secret as Secret, {
        expiresIn: ENUM_JWT_EXPIRATION.JWT_REFRESH_EXIPIRES_IN
    });
    return { accessToken, refreshToken, needsPasswordChange };
};

export const createRefreshToken = async (token: string) => {
    const { id, role } = verifyToken(token, config.jwt_refresh_secret as Secret);
    const userInstance = new User();
    const exist = await userInstance.isUserExist(id);
    if (!exist) {
        throw new ApiError(httpStatus.NOT_FOUND, "Account does not exist");
    }
    const newAccessToken = createToken({ id, role }, config.jwt_refresh_secret as Secret, {
        expiresIn: ENUM_JWT_EXPIRATION.JWT_EXIPIRES_IN
    });
    return { accessToken: newAccessToken };
};
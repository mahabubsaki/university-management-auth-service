import httpStatus from "http-status";
import { ApiError } from "../../errors/ApiError";
import { User } from "../users/user.model";
import { ILoginCreds } from "./auth.interface";

export const authLogin = async (payload: ILoginCreds) => {

    const { id, password } = payload;
    // we will do this on instance method
    // const isUserExist = await User.findById(id, { id: 1, password: 1, needsPasswordChange: 1 }).lean();
    // const isPasswordMatch = await bcrypt.compare(password, isUserExist.password as string);

    const user = new User();
    const userInfo = await user.isUserExist(id);
    if (!userInfo) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not exist with the given id");
    }
    if (!user.isPasswordMatched(password, userInfo.password as string)) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
    }
};
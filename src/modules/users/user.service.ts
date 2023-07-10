import config from "../../config";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateUserId } from "./user.utils";


export const createUser = async (user: IUser): Promise<IUser | null> => {
    if (!user.password) {
        user.password = config.default_user_password as string;
    }
    const id = await generateUserId({ year: '2025', code: '01' }, user.role);
    user.id = id;
    const createdUser = await User.create(user);
    if (!createdUser) {
        throw new Error("Failed to create user!");
    }
    return createdUser;
};

import { JwtPayload } from "jsonwebtoken";
import { Document } from "mongoose";

export interface ILoginCreds extends Document {
    id: string;
    password: string;
}
export interface MyJwtPayload extends JwtPayload {
    id: string,
    role: string;
}
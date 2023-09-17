import { Document } from "mongoose";

export interface ILoginCreds extends Document {
    id: string;
    password: string;
}
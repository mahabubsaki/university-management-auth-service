import jwt, { Secret } from "jsonwebtoken";

const createToken = (payload: Record<string, unknown>, secret: Secret, options: Record<string, unknown>): string => {
    return jwt.sign(payload, secret, options);
};
export default createToken;
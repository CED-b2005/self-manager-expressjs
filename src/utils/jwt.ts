import jwt, { SignOptions } from "jsonwebtoken";

// jwt payload (to make token)
export interface JwtPayload {
    userId: string;
    email: string;
    role: string;
}

// generate token
export const generateToken = (payload: JwtPayload): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) { throw new Error("JWT_SECRET is not defined"); }

    const options: SignOptions = { expiresIn: (process.env.JWT_EXPIRES_IN as any) || "7d", };

    return jwt.sign(payload, secret, options);
};

// verify user
export const verifyToken = (token: string): JwtPayload => {
    const secret = process.env.JWT_SECRET;
    if (!secret) { throw new Error("JWT_SECRET is not defined"); }

    return jwt.verify(token, secret) as JwtPayload;
};
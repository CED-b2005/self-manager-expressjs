import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../configs/prisma.config";
import { User } from "@prisma/client";
import { AppError } from "./error.middleware";

export interface AuthRequest extends Request {
    user?: User;
}

/* check header(get toker) -> check token(get userId) -> check user(Query user) -> next */
export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) { throw new AppError("Authentication required", 401); }

        /* discard "Bearer " by delete 7 first characters */
        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : authHeader.trim();

        if (!process.env.JWT_SECRET) { throw new Error("JWT_SECRET is not defined"); }

        /* Verify token by JWT_SECRET */
        /* Save userId to payload */
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string; };

        /* Query user in database */
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId,
                isActive: true,
            },
        });

        if (!user) { throw new AppError("User not found or inactive", 401, "USER_NOT_FOUND"); }

        /*push user (from database) to request*/
        req.user = user;

        next();
    } catch (error) {
        if (error instanceof AppError) { next(error); }
        else { next(new AppError("Invalid or expired token", 401, "INVALID_TOKEN")); }
    }
};

// check login (after auth) -> check role(valid role?) -> next
export const authorize = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.user) { throw new AppError("Authentication required", 401, "AUTH_REQUIRED"); }

        if (!roles.includes(req.user.role)) { throw new AppError("Insufficient permissions", 403, "INSUFFICIENT_PERMISSIONS"); }

        next();
    };
};

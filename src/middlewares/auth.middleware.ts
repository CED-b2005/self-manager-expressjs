import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import { AppError } from "./error.middleware";

const prisma = new PrismaClient();

export interface AuthRequest extends Request {
    user?: User;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new AppError("Authentication required", 401);
        }

        const token = authHeader.startsWith("Bearer ")
            ? authHeader.slice(7).trim()
            : authHeader.trim();

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
            userId: string;
        };

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId,
                isActive: true,
            },
        });

        if (!user) {
            throw new AppError("User not found or inactive", 401, "USER_NOT_FOUND");
        }

        req.user = user;
        next();
    } catch (error) {
        if (error instanceof AppError) {
            next(error);
        } else {
            next(new AppError("Invalid or expired token", 401, "INVALID_TOKEN"));
        }
    }
};

export const authorize = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.user) {
            throw new AppError("Authentication required", 401, "AUTH_REQUIRED");
        }

        if (!roles.includes(req.user.role)) {
            throw new AppError(
                "Insufficient permissions",
                403,
                "INSUFFICIENT_PERMISSIONS"
            );
        }

        next();
    };
};

import { Request, Response, NextFunction } from "express";
// import { logger } from "../utils/logger";

export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    errorCode: string;

    constructor(message: string, statusCode: number = 500, errorCode: string = "INTERNAL_ERROR") {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction): void => {
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    const message = err.message || "Internal Server Error";
      /*logger */console.error("Error occurred:", {
        error: err.message,
        path: req.path,
        method: req.method,
        stack: err.stack,
    });

    const errorResponse = {
        status: "error",
        message,
        statusCode,
        data: null,
    };

    res.status(statusCode).json(errorResponse);
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    res.status(404).json({
        status: "error",
        message: `Route ${req.originalUrl} not found`,
        statusCode: 404,
        data: null,
    });
};
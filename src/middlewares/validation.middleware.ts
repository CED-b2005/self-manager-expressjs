import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import { AppError } from "./error.middleware";

export const validate = (validations: ValidationChain[]) => {

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        if (!validations.length) {
            next()
            return;
        }

        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) { next(); return; }

        const error = new AppError("Validation failed", 400, "VALIDATION_ERROR");
        next(error);
    };
};

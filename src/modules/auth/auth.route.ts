import { Router } from "express";
import { Request, Response } from "express";
import { AuthController } from "./auth.controller";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/auth/register", authController.register)

authRouter.post("/auth/login", authController.login)

export default authRouter;
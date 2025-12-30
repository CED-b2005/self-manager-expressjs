import { Request, Response } from "express";
export class AuthController {
    register(req: Request, res: Response) {
        const data = req.body;
        console.log("register");
        return res.json({
            route: "api/auth/register",
            controller: "auth controller",
            data: data
        });
    }

    login(req: Request, res: Response) {
        const data = req.body;
        console.log("login");
        return res.json({
            route: "api/auth/login",
            controller: "auth controller",
            data: data
        });
    }
}
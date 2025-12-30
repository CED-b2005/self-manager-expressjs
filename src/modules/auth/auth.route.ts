import router from "@/routes";
import { Router } from "express";
import { Request, Response } from "express";

const authRouter = Router();

router.post("/auth/register", (req: Request, res: Response) => {
    const data = req.body;
    console.log("register");
    return res.json({
        route: "api/auth/register",
        data: data
    });
})

router.post("auth/login",(req: Request, res: Response) => {
    const data = req.body;
    console.log("login");
    return res.json({
        route: "api/auth/login",
        data: data
    });
})

export default authRouter;
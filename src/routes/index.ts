import { Router } from 'express';
import userRouter from "../modules/user/user.route";
import authRouter from '../modules/auth/auth.route';

const router = Router();    // using node.js route

router.use("/", userRouter); //using User Routes
router.use("/", authRouter); // using Auth Route

export default router;


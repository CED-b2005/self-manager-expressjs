import { Router } from 'express';
import userRouter from "../modules/user/user.route";

const router = Router();    // using node.js route

router.use("/", userRouter); //using User Routes

export default router;


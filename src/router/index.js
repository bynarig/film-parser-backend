import { Router } from "express";
import searchRouter from "#router/searchRouter.js";
import userRouter from "#router/userRouter.js";

const allRouter = new Router;
allRouter.use("/search", searchRouter);
allRouter.use("/user", userRouter);

export default allRouter;
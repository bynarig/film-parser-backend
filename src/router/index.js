import { Router } from "express";
import searchRouter from "#router/searchRouter.js";

const allRouter = new Router;
allRouter.use("/search", searchRouter);

export default allRouter;
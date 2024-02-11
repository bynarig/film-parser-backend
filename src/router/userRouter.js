import { Router } from "express";
import UserController from "#controllers/userController.js";

const searchRouter = Router();

searchRouter.post("/register", UserController.register);

export default searchRouter;
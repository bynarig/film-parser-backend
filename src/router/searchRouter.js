import { Router } from "express";
import SearchController from "#controllers/searchController.js";

const searchRouter = Router();

searchRouter.get("/byTitle/:title", SearchController.omdbSearchByTitle);

export default searchRouter;
import express from "express";
const categoryRouter = express.Router();

import {createCategory,getAllCategories} from "../controllers/categoryController.js";

categoryRouter.post("/new",createCategory);
categoryRouter.get("/all",getAllCategories);

export default categoryRouter;
import express from "express";
const brandRouter = express.Router();

import {createBrand,getAllBrands} from "../controllers/brandController.js";

brandRouter.post("/new",createBrand);
brandRouter.get("/all",getAllBrands);

export default brandRouter;
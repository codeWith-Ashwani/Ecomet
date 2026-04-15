import express from "express";
const categoryRouter = express.Router();

import {createCategory,getAllCategories} from "../controllers/categoryController.js";
import Category from "../models/categoryModel.js";

categoryRouter.post("/new",createCategory);
categoryRouter.get("/all",getAllCategories);

// GET /api/categories/sub/:parentId
// GET sub-categories by parentId
categoryRouter.get("/sub/:parentId", async (req, res) => {
  try {
    const { parentId } = req.params;

    // Validate parentId
    if (!parentId || parentId === "null" || parentId === "undefined") {
      return res.status(400).json({
        success: false,
        message: "Invalid parentId",
      });
    }

    const subCategories = await Category.find({ parentId });

    res.status(200).json({
      success: true,
      data: subCategories,
    });

  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching subcategories",
    });
  }
});


// GET main categories
categoryRouter.get("/main", async (req, res) => {
  try {
    const categories = await Category.find({ parentId: null });

    res.status(200).json({
      success: true,
      data: categories,
    });

  } catch (error) {
    console.error("Error fetching main categories:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching categories",
    });
  }
});

export default categoryRouter;
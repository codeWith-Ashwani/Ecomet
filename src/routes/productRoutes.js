import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getSubCategoryProduct,
  createMultipleProduct
} from "../controllers/productController.js";

const productRouter = express.Router();


productRouter.post("/", createProduct);
productRouter.post("/bulk", createMultipleProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/sub-category/:id", getSubCategoryProduct);

export default productRouter;

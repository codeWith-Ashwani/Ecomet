import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getSubCategoryProduct,
  createMultipleProduct,
  addProductProperties,
  searchProducts,
  getProductsByCategory
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", createProduct);

productRouter.post("/bulk", createMultipleProduct);

productRouter.get("/search", searchProducts);

productRouter.get("/sub-category/:id", getSubCategoryProduct);

productRouter.get("/", getAllProducts);

productRouter.get("/:id", getProductById);

productRouter.get("/category/:categoryId", getProductsByCategory);

productRouter.put("/:id", updateProduct);

productRouter.patch("/:id", addProductProperties);

productRouter.delete("/:id", deleteProduct);


export default productRouter;

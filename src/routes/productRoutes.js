import express from "express";
const router = express.Router();
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductReview,
} from "../controllers/productController.js";

import { protect, admin } from "../middlewares/authMiddleware.js";

// Public GET, but Private/Admin POST
router.route('/').get(getAllProducts).post(protect, admin, createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

const productRouter = express.Router();
router.route('/:id/reviews').post(protect, createProductReview);

productRouter.post("/", createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);


export default productRouter;

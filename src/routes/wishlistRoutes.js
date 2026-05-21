import express from "express";

const wishlistRouter = express.Router();

import {addToWishlist, removeFromWishlist, getWishlist} from "../controllers/wishlistController.js"

import {protect} from "../middlewares/authMiddleware.js";

// Add to wishlist
wishlistRouter.post(
  "/add",
  protect,
  addToWishlist
);

// Remove from wishlist
wishlistRouter.delete(
  "/remove/:productId",
  protect,
  removeFromWishlist
);

// Get logged-in user's wishlist
wishlistRouter.get(
  "/",
  protect,
  getWishlist
);

export default wishlistRouter;
// routes/orderRoutes.js

import express from "express";

const router = express.Router();

import {
  createOrder,

  getMyOrders,

  getOrderById,

  updateOrderToPaid,

  updateOrderToDelivered,

  cancelOrder,

  getAllOrders,

  updateOrderStatus,

  deleteOrder,
} from "../controllers/orderController.js";

import {
  protect,
  admin,
} from "../middlewares/authMiddleware.js";


// ==========================================
// USER ROUTES
// ==========================================


// CREATE ORDER
router.post("/", protect, createOrder);


// GET LOGGED IN USER ORDERS
router.get("/myorders", protect, getMyOrders);


// GET SINGLE ORDER
router.get("/:id", protect, getOrderById);


// UPDATE ORDER PAYMENT STATUS
router.put("/:id/pay", protect, updateOrderToPaid);


// CANCEL ORDER
router.put("/:id/cancel", protect, cancelOrder);



// ==========================================
// ADMIN ROUTES
// ==========================================


// GET ALL ORDERS
router.get("/", protect, admin, getAllOrders);


// UPDATE ORDER STATUS
router.put(
  "/:id/status",
  protect,
  admin,
  updateOrderStatus
);


// MARK AS DELIVERED
router.put(
  "/:id/deliver",
  protect,
  admin,
  updateOrderToDelivered
);


// DELETE ORDER
router.delete(
  "/:id",
  protect,
  admin,
  deleteOrder
);


export default router;
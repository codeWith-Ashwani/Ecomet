// controllers/orderController.js

import Order from "../models/orderModel.js";


// ==========================================
// CREATE ORDER
// POST /api/orders
// PRIVATE
// ==========================================

export const createOrder = async (
  req,
  res
) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      discountPrice,
      totalPrice,
    } = req.body;

    if (
      !orderItems ||
      orderItems.length === 0
    ) {
      return res.status(400).json({
        message: "No order items",
      });
    }

    const order = new Order({
      user: req.user._id,

      orderItems,

      shippingAddress,

      paymentMethod,

      itemsPrice,

      taxPrice,

      shippingPrice,

      discountPrice,

      totalPrice,
    });

    const createdOrder =
      await order.save();

    res.status(201).json(
      createdOrder
    );

  } catch (error) {
    res.status(500).json({
      message:
        error.message ||
        "Failed to create order",
    });
  }
};


// ==========================================
// GET MY ORDERS
// GET /api/orders/myorders
// PRIVATE
// ==========================================

export const getMyOrders = async (
  req,
  res
) => {
  try {
    const orders =
      await Order.find({
        user: req.user._id,
      }).sort({
        createdAt: -1,
      });

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message:
        error.message ||
        "Failed to fetch orders",
    });
  }
};


// ==========================================
// GET ORDER BY ID
// GET /api/orders/:id
// PRIVATE
// ==========================================

export const getOrderById = async (
  req,
  res
) => {
  try {
    const order =
      await Order.findById(
        req.params.id
      ).populate(
        "user",
        "name email"
      );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // SECURITY CHECK
    if (
      order.user._id.toString() !==
        req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    res.json(order);

  } catch (error) {
    res.status(500).json({
      message:
        error.message ||
        "Failed to fetch order",
    });
  }
};


// ==========================================
// UPDATE ORDER TO PAID
// PUT /api/orders/:id/pay
// PRIVATE
// ==========================================

export const updateOrderToPaid =
  async (req, res) => {
    try {
      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          message:
            "Order not found",
        });
      }

      order.isPaid = true;

      order.paymentStatus =
        "paid";

      order.paidAt = Date.now();

      order.orderStatus =
        "confirmed";

      order.paymentResult = {
        id: req.body.id,

        orderId:
          req.body.orderId,

        signature:
          req.body.signature,

        status:
          req.body.status,

        update_time:
          req.body.update_time,

        email_address:
          req.body.email_address,
      };

      const updatedOrder =
        await order.save();

      res.json(updatedOrder);

    } catch (error) {
      res.status(500).json({
        message:
          error.message ||
          "Payment update failed",
      });
    }
  };


// ==========================================
// CANCEL ORDER
// PUT /api/orders/:id/cancel
// PRIVATE
// ==========================================

export const cancelOrder = async (
  req,
  res
) => {
  try {
    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // ONLY OWNER CAN CANCEL
    if (
      order.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // CANNOT CANCEL DELIVERED
    if (
      order.orderStatus ===
      "delivered"
    ) {
      return res.status(400).json({
        message:
          "Delivered order cannot be cancelled",
      });
    }

    order.orderStatus =
      "cancelled";

    order.cancelReason =
      req.body.reason ||
      "Cancelled by user";

    const updatedOrder =
      await order.save();

    res.json({
      message:
        "Order cancelled successfully",

      order: updatedOrder,
    });

  } catch (error) {
    res.status(500).json({
      message:
        error.message ||
        "Failed to cancel order",
    });
  }
};


// ==========================================
// GET ALL ORDERS
// GET /api/orders
// ADMIN
// ==========================================

export const getAllOrders =
  async (req, res) => {
    try {
      const orders =
        await Order.find({})
          .populate(
            "user",
            "id name"
          )
          .sort({
            createdAt: -1,
          });

      res.json(orders);

    } catch (error) {
      res.status(500).json({
        message:
          error.message ||
          "Failed to fetch orders",
      });
    }
  };


// ==========================================
// UPDATE ORDER STATUS
// PUT /api/orders/:id/status
// ADMIN
// ==========================================

export const updateOrderStatus =
  async (req, res) => {
    try {
      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          message:
            "Order not found",
        });
      }

      order.orderStatus =
        req.body.status;

      // AUTO DELIVERY
      if (
        req.body.status ===
        "delivered"
      ) {
        order.isDelivered =
          true;

        order.deliveredAt =
          Date.now();
      }

      const updatedOrder =
        await order.save();

      res.json(updatedOrder);

    } catch (error) {
      res.status(500).json({
        message:
          error.message ||
          "Failed to update order status",
      });
    }
  };


// ==========================================
// UPDATE ORDER TO DELIVERED
// PUT /api/orders/:id/deliver
// ADMIN
// ==========================================

export const updateOrderToDelivered =
  async (req, res) => {
    try {
      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          message:
            "Order not found",
        });
      }

      order.isDelivered = true;

      order.deliveredAt =
        Date.now();

      order.orderStatus =
        "delivered";

      const updatedOrder =
        await order.save();

      res.json(updatedOrder);

    } catch (error) {
      res.status(500).json({
        message:
          error.message ||
          "Failed to update delivery",
      });
    }
  };


// ==========================================
// DELETE ORDER
// DELETE /api/orders/:id
// ADMIN
// ==========================================

export const deleteOrder =
  async (req, res) => {
    try {
      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          message:
            "Order not found",
        });
      }

      await order.deleteOne();

      res.json({
        message:
          "Order deleted successfully",
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message ||
          "Failed to delete order",
      });
    }
  };
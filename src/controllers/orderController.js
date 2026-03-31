import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  // --- 1. STOCK VALIDATION  ---
  for (const item of orderItems) {
    const product = await Product.findById(item.product || item._id);
    
    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${item.name}`);
    }

    if (product.countInStock < item.qty) {
      res.status(400);
      throw new Error(`Insufficient stock for ${product.name}. Available: ${product.countInStock}`);
    }
  }

  // --- 2. CREATE ORDER ---
  const order = new Order({
    orderItems: orderItems.map((x) => ({
      ...x,
      product: x.product || x._id, 
      _id: undefined,
    })),
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  // --- 3. UPDATE STOCK (Decrease countInStock after successful order) ---
  for (const item of orderItems) {
    const product = await Product.findById(item.product || item._id);
    product.countInStock -= item.qty;
    await product.save();
  }

  res.status(201).json(createdOrder);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});
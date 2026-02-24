import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';


// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Needs the protect middleware!)
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
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id, // Map frontend ID to backend model field
        _id: undefined,
      })),
      user: req.user._id, // Taken from the protect middleware
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});  

import Product from '../models/productModel.js';

// Helper function to update stock
const updateProductStock = async (orderItems) => {
  for (const item of orderItems) {
    const product = await Product.findById(item.product);

    if (product) {
      product.countInStock = product.countInStock - item.qty;
      await product.save();
    }
  }
};


// Stock Validation
for (const item of orderItems) {
  const product = await Product.findById(item.product);
  
  if (product.countInStock < item.qty) {
    res.status(400);
    throw new Error(`Insufficient stock for ${product.name}`);
  }
}
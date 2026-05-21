import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    // USER
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    // PRODUCTS
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },

        qty: {
          type: Number,
          required: true,
        },

        image: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],

    // SHIPPING ADDRESS
    shippingAddress: {
      fullName: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      postalCode: {
        type: String,
        required: true,
      },

      country: {
        type: String,
        required: true,
        default: "India",
      },
    },

    // PAYMENT METHOD
    paymentMethod: {
      type: String,
      required: true,

      enum: [
        "UPI",
        "CARD",
        "NET_BANKING",
        "WALLET",
        "COD",
        "RAZORPAY",
      ],
    },

    // PAYMENT STATUS
    paymentStatus: {
      type: String,

      enum: [
        "pending",
        "paid",
        "failed",
        "refunded",
      ],

      default: "pending",
    },

    // PAYMENT DETAILS
    paymentResult: {
      id: {
        type: String,
      },

      orderId: {
        type: String,
      },

      signature: {
        type: String,
      },

      status: {
        type: String,
      },

      update_time: {
        type: String,
      },

      email_address: {
        type: String,
      },
    },

    // ORDER STATUS
    orderStatus: {
      type: String,

      enum: [
        "processing",
        "confirmed",
        "packed",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],

      default: "processing",
    },

    // PRICE DETAILS
    itemsPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    taxPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    // PAYMENT FLAGS
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },

    paidAt: {
      type: Date,
    },

    // DELIVERY FLAGS
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },

    deliveredAt: {
      type: Date,
    },

    // EXTRA FEATURES
    couponCode: {
      type: String,
    },

    trackingId: {
      type: String,
    },

    estimatedDelivery: {
      type: Date,
    },

    cancelReason: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const Order = mongoose.model(
  "Order",
  orderSchema
);

export default Order;
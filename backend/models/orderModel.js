import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],

    totalAmount: { type: Number, required: true },
    paymentMode: { type: String, enum: ["COD", "Online"], default: "COD" },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },

    shippingAddress: {
      address: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },

    //RETURN SYSTEM
    isReturned: {
      type: Boolean,
      default: false,
    },
    returnStatus: {
      type: String,
      enum: ["none", "requested", "approved", "rejected"],
      default: "none",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);

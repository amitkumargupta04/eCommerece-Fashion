import { Order } from "../models/orderModel.js";
import { Product } from "../models/productModel.js";
import { Cart } from "../models/cartModel.js";

// ✅ User buys a single product from product details page
export const buyNow = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity, paymentMode, shippingAddress } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: "Requested quantity not available in stock",
      });
    }

    const totalAmount = (product.discountPrice || product.price) * quantity;
    const mode = paymentMode || "COD";

    // Create order
    const order = await Order.create({
      user: userId,
      items: [
        {
          product: productId,
          quantity,
          price: product.discountPrice || product.price,
        },
      ],
      totalAmount,
      paymentMode: mode,
      shippingAddress,
      paymentStatus: mode === "Online" ? "pending" : "paid",
    });

    // Reduce product stock
    product.stock -= quantity;
    await product.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log("Error in buyNow", error);
    res.status(500).json({
      success: false,
      message: "Error in buyNow",
    });
  }
};

// ✅ User places order for all items in cart
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { shippingAddress, paymentMode } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Calculate total
    const totalAmount = cart.items.reduce((sum, item) => {
      return (
        sum + (item.product.discountPrice || item.product.price) * item.quantity
      );
    }, 0);

    // Create order with price
    const order = await Order.create({
      user: userId,
      items: cart.items.map((i) => ({
        product: i.product._id,
        quantity: i.quantity,
        price: i.product.discountPrice || i.product.price, // ✅ attach price
      })),
      shippingAddress,
      paymentMode: paymentMode || "COD",
      totalAmount,
      paymentStatus: paymentMode === "Online" ? "pending" : "paid",
    });

    // Clear cart after order
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log("Error in placeOrder", error);
    res.status(500).json({
      success: false,
      message: "Error in placeOrder",
    });
  }
};

// user geta all orders
export const getUserAllOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId }).populate("items.product");
    res.json({ success: true, total: orders.length, orders });
  } catch (error) {
    console.log("Error in getUserAllOrders", error);
    res.status(500).json({
      success: false,
      message: "Error in getUserAllOrders",
    });
  }
};
// admin get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.product")
      .populate("user", "fullname email") // populate user info
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: orders.length,
      orders,
    });
  } catch (error) {
    console.log("Error in getAllOrders", error);
    res.status(500).json({
      success: false,
      message: "Error fetching all orders",
    });
  }
};

// Admin → Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { orderStatus } = req.body; // processing/shipped/delivered/cancelled

    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.log("Error in updateOrderStatus", error);
    res.status(500).json({
      success: false,
      message: "Error updating order status",
    });
  }
};

// User → Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const orderId = req.params.id;

    const order = await Order.findOne({ _id: orderId, user: userId }).populate(
      "items.product"
    );
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    if (order.orderStatus !== "processing") {
      return res
        .status(400)
        .json({ success: false, message: "Order cannot be cancelled now" });
    }

    // Update order status
    order.orderStatus = "cancelled";

    // Optional: stock return
    order.items.forEach((item) => {
      item.product.stock += item.quantity;
      item.product.save();
    });

    await order.save();

    res
      .status(200)
      .json({ success: true, message: "Order cancelled successfully", order });
  } catch (error) {
    console.log("Error in cancelOrder", error);
    res.status(500).json({ success: false, message: "Error cancelling order" });
  }
};

export const getOrderDetals = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user._id;
    const order = await Order.findOne({ _id: orderId, user: userId }).populate(
      "items.product",
      "name images, price, discountPrice"
    );
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("Error in getOrderDetals", error);
    res.status(500).json({
      success: false,
      message: "Error in getOrderDetals",
    });
  }
};

export const returnOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user._id;

    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.orderStatus !== "delivered") {
      return res.status(400).json({
        success: false,
        message: "Only delivered orders can be returned",
      });
    }

    order.isReturned = true;
    order.returnStatus = "requested";

    await order.save();

    res.json({
      success: true,
      message: "Return request sent successfully",
    });
  } catch (error) {
    console.log("Error in returnOrder", error);
    res.status(500).json({ success: false, message: "Error in returnOrder" });
  }
};


export const approveReturn = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Order must be requested
    if (order.returnStatus !== "requested") {
      return res.status(400).json({
        success: false,
        message: "This order is not requested for return",
      });
    }

    // Update fields
    order.returnStatus = "approved";
    order.isReturned = true;
    order.paymentStatus = "refunded";
    order.orderStatus = "cancelled";

    // Add stock back
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Return approved successfully",
      order,
    });

  } catch (error) {
    console.log("Error in approveReturn", error);
    res.status(500).json({
      success: false,
      message: "Error in approveReturn",
    });
  }
};

export const rejectReturn = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.returnStatus !== "requested") {
      return res.status(400).json({
        success: false,
        message: "This order is not requested for return",
      });
    }

    // Reject return
    order.returnStatus = "rejected";
    order.isReturned = false;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Return rejected successfully",
      order,
    });
  } catch (error) {
    console.log("Error in rejectReturn", error);
    res.status(500).json({ success: false, message: "Error in rejectReturn" });
  }
};





import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.body.productId;

    const quantity = req.body.quantity || 1;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const item = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (item) {
        item.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();

    res.status(201).json({
      success: true,
      message: "Added to cart successfully",
      cart,
    });
  } catch (error) {
    console.log("Error in addtocart", error);
    res.status(500).json({
      success: false,
      message: "Error in addToCart",
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return res.json({ success: true, cart: { items: [] } });
    }

    res.json({ success: true, total: cart.items.length, cart });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const userId = req.user._id;
    const productId = req.params.productId;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ success:false, message:"Quantity must be >= 1" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ success:false, message:"Cart not found" });

    const item = cart.items.find(i => i.product.toString() === productId);
    if (!item) return res.status(404).json({ success: false, message: "Product not in cart" });

    item.quantity = quantity;

    await cart.save();
    res.json({ success: true, message: "Update cart successfull", cart });

  } catch (error) {
    res.status(500).json({ success: false });
  }
};


export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ success:false, message:"Cart not found" });

    cart.items = cart.items.filter((i) => i.product.toString() !== productId);

    await cart.save();

    res.json({ success: true, message: "Remove cartItem successfull", cart });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];  // sab items remove
    await cart.save();

    res.json({
      success: true,
      message: "Cart cleared successfully",
      cart
    });

  } catch (error) {
    console.log("Error in clearing cart", error);
    res.status(500).json({
      success: false,
      message: "Error in clearing cart",
    });
  }
};

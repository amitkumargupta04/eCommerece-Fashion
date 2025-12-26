
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from "../../utils/axiosInstance";

// Get Cart
export const getCart = createAsyncThunk("cart/getCart", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get("/cart/all");
    return res.data.cart;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Add Item to Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/cart/add", cartData);
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Update Item Quantity
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/cart/update/${productId}`, { quantity });
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Remove Item from Cart
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/cart/remove/${productId}`);
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Clear Cart
export const clearCart = createAsyncThunk("cart/clearCart", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.delete("/cart/clear");
    return res.data.cart;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Get Cart
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch cart";
      });

    // Add Item
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to add item";
      });

    // Update Item
    builder
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to update item";
      });

    // Remove Item
    builder
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to remove item";
      });

    // Clear Cart
    builder
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to clear cart";
      });
  },
});

export default cartSlice.reducer;

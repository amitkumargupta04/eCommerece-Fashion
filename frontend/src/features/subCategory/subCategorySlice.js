import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { subCategoryService } from "@/services";

export const fetchSubCategoriesThunk = createAsyncThunk(
  "subCategory/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await subCategoryService.getSubCategories();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch sub-categories");
    }
  }
);

export const createSubCategoryThunk = createAsyncThunk(
  "subCategory/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await subCategoryService.createSubCategory(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create sub-category");
    }
  }
);

export const updateSubCategoryThunk = createAsyncThunk(
  "subCategory/update",
  async ({ id, subCategoryData }, { rejectWithValue }) => {
    try {
      const res = await subCategoryService.updateSubCategory(id, subCategoryData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update sub-category");
    }
  }
);

export const deleteSubCategoryThunk = createAsyncThunk(
  "subCategory/delete",
  async (id, { rejectWithValue }) => {
    try {
      await subCategoryService.deleteSubCategory(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete sub-category");
    }
  }
);

const subCategorySlice = createSlice({
  name: "subCategory",
  initialState: {
    subCategories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchSubCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = action.payload;
      })
      .addCase(fetchSubCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createSubCategoryThunk.fulfilled, (state, action) => {
        state.subCategories.push(action.payload);
      })
      // Update
      .addCase(updateSubCategoryThunk.fulfilled, (state, action) => {
        const index = state.subCategories.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.subCategories[index] = action.payload;
        }
      })
      // Delete
      .addCase(deleteSubCategoryThunk.fulfilled, (state, action) => {
        state.subCategories = state.subCategories.filter((item) => item.id !== action.payload);
      });
  },
});

export default subCategorySlice.reducer;
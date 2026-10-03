import React, { useState } from "react";
import { X } from "lucide-react";
import ImageUpload from "../../comman/ImageUpload";

const ProductForm = ({
  editData,
  categories,
  subCategories,
  loading,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: editData?.name || "",
    description: editData?.description || "",
    categoryId: editData?.categoryId || "",
    subCategoryId: editData?.subCategoryId || "",
    price: editData?.price || "",
    discountPrice: editData?.discountPrice || "",
    stockQuantity: editData?.stockQuantity || "",
    imageUrl: editData?.imageUrls?.[0] || "",
    isTrending: editData?.isTrending ?? false,
    isBestSeller: editData?.isBestSeller ?? false,
    isNewArrival: editData?.isNewArrival ?? false,
    active: editData?.active ?? true,
  });

  // Category select hone par sub-categories auto-filter hongi
  const filteredSubCategories = subCategories.filter(
    (sub) => String(sub.categoryId) === String(formData.categoryId),
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // imageUrl array hai ya string, use cleanly single flat array banayein
    const rawImage = formData.imageUrl;
    const imageUrlsArray = Array.isArray(rawImage)
      ? rawImage.flat()
      : rawImage
        ? [rawImage]
        : [];

    const payload = {
      name: formData.name.trim(),
      description: formData.description ? formData.description.trim() : "",
      categoryId: Number(formData.categoryId),
      subCategoryId: Number(formData.subCategoryId),
      price: Number(formData.price),
      discountPrice: formData.discountPrice
        ? Number(formData.discountPrice)
        : 0,
      stockQuantity: Number(formData.stockQuantity),
      imageUrls: imageUrlsArray, 
      isTrending: Boolean(formData.isTrending),
      isBestSeller: Boolean(formData.isBestSeller),
      isNewArrival: Boolean(formData.isNewArrival),
      active: Boolean(formData.active),
    };

    console.log("SENDING PAYLOAD TO REDUX:", payload);
    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-4 max-h-[80vh] overflow-y-auto"
    >
      {/* Title */}
      <div>
        <label className="block text-xs font-medium text-neutral-300 mb-1.5">
          Product Title *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Premium Wireless Headphones"
          className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm outline-none focus:border-neutral-500 transition"
        />
      </div>

      {/* Category & SubCategory Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1.5">
            Category *
          </label>
          <select
            required
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({
                ...formData,
                categoryId: e.target.value,
                subCategoryId: "",
              })
            }
            className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm outline-none focus:border-neutral-500 transition cursor-pointer"
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1.5">
            Sub-Category *
          </label>
          <select
            required
            disabled={!formData.categoryId}
            value={formData.subCategoryId}
            onChange={(e) =>
              setFormData({ ...formData, subCategoryId: e.target.value })
            }
            className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm outline-none focus:border-neutral-500 transition cursor-pointer disabled:opacity-40"
          >
            <option value="" disabled>
              Select Sub-Category
            </option>
            {filteredSubCategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Prices & Stock Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1.5">
            Price (₹) *
          </label>
          <input
            type="number"
            step="0.01"
            required
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            placeholder="149.99"
            className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm outline-none focus:border-neutral-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1.5">
            Discount Price (₹)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.discountPrice}
            onChange={(e) =>
              setFormData({ ...formData, discountPrice: e.target.value })
            }
            placeholder="129.99"
            className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm outline-none focus:border-neutral-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1.5">
            Stock Quantity *
          </label>
          <input
            type="number"
            required
            value={formData.stockQuantity}
            onChange={(e) =>
              setFormData({ ...formData, stockQuantity: e.target.value })
            }
            placeholder="250"
            className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm outline-none focus:border-neutral-500 transition"
          />
        </div>
      </div>

      {/* Image Upload */}
      <ImageUpload
        label="Product Image URL"
        value={formData.imageUrl}
        onChange={(url) => setFormData({ ...formData, imageUrl: url })}
      />

      {/* Description */}
      <div>
        <label className="block text-xs font-medium text-neutral-300 mb-1.5">
          Description
        </label>
        <textarea
          rows="3"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Product details and specs..."
          className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm outline-none focus:border-neutral-500 resize-none transition"
        />
      </div>

      {/* Featured Flags & Active Status */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-neutral-800/80">
        <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
          <input
            type="checkbox"
            checked={formData.isTrending}
            onChange={(e) =>
              setFormData({ ...formData, isTrending: e.target.checked })
            }
            className="rounded bg-neutral-950 border-neutral-700 text-white cursor-pointer"
          />
          Trending
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
          <input
            type="checkbox"
            checked={formData.isBestSeller}
            onChange={(e) =>
              setFormData({ ...formData, isBestSeller: e.target.checked })
            }
            className="rounded bg-neutral-950 border-neutral-700 text-white cursor-pointer"
          />
          Best Seller
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
          <input
            type="checkbox"
            checked={formData.isNewArrival}
            onChange={(e) =>
              setFormData({ ...formData, isNewArrival: e.target.checked })
            }
            className="rounded bg-neutral-950 border-neutral-700 text-white cursor-pointer"
          />
          New Arrival
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
          <input
            type="checkbox"
            checked={formData.active}
            onChange={(e) =>
              setFormData({ ...formData, active: e.target.checked })
            }
            className="rounded bg-neutral-950 border-neutral-700 text-white cursor-pointer"
          />
          Active
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 bg-white hover:bg-neutral-200 text-black font-semibold text-xs rounded-xl transition disabled:opacity-50 cursor-pointer shadow-sm"
        >
          {loading
            ? "Saving..."
            : editData
              ? "Update Product"
              : "Create Product"}
        </button>
      </div>
    </form>
  );
};

// Main Modal Component
const ProductModal = ({
  isOpen,
  onClose,
  onSubmit,
  editData,
  categories = [],
  subCategories = [],
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800">
          <h2 className="text-lg font-bold text-white tracking-tight">
            {editData ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <ProductForm
          key={
            editData ? editData.id || JSON.stringify(editData) : "new-product"
          }
          editData={editData}
          categories={categories}
          subCategories={subCategories}
          loading={loading}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default ProductModal;

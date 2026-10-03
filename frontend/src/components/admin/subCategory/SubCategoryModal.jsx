import React, { useState } from "react";
import { X } from "lucide-react";
import ImageUpload from "../../comman/ImageUpload";


const SubCategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
  editData,
  categories = [],
  loading,
}) => {
  const [formData, setFormData] = useState({
    categoryId: editData?.categoryId || (categories[0]?.id || ""),
    name: editData?.name || "",
    description: editData?.description || "",
    imageUrl: editData?.imageUrl || "",
    active: editData?.active ?? true,
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800">
          <h2 className="text-lg font-bold text-white tracking-tight">
            {editData ? "Edit Sub-Category" : "Add New Sub-Category"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Parent Category Selection */}
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Parent Category *
            </label>
            <select
              required
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm outline-none focus:border-neutral-500 transition cursor-pointer"
            >
              <option value="" disabled>Select Parent Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Sub-Category Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. T-Shirts, Sneakers"
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm outline-none focus:border-neutral-500 transition"
            />
          </div>

          <ImageUpload
            label="Sub-Category Image"
            value={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
          />

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
              placeholder="Brief description..."
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm outline-none focus:border-neutral-500 resize-none transition"
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <input
              type="checkbox"
              id="subActiveState"
              checked={formData.active}
              onChange={(e) =>
                setFormData({ ...formData, active: e.target.checked })
              }
              className="w-4 h-4 rounded bg-neutral-950 border-neutral-700 text-white focus:ring-0 cursor-pointer"
            />
            <label htmlFor="subActiveState" className="text-sm text-neutral-300 cursor-pointer">
              Active Sub-Category
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
              {loading ? "Saving..." : editData ? "Update Sub-Category" : "Create Sub-Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubCategoryModal;
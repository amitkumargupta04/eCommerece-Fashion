import React from "react";
import { Plus } from "lucide-react";

const CategoryHeader = ({ onOpenModal }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Categories</h1>
        <p className="text-neutral-400 text-sm mt-1">
          Manage product categories, update images, and active status.
        </p>
      </div>

      <button
        onClick={onOpenModal}
        className="flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-black px-4 py-2.5 rounded-xl font-semibold text-sm transition shadow-sm cursor-pointer"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        Add Category
      </button>
    </div>
  );
};

export default CategoryHeader;
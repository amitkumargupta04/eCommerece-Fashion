import React from "react";
import { Edit2, Trash2, CheckCircle2, XCircle } from "lucide-react";

const SubCategoryTable = ({ subCategories, categoriesMap, loading, onDelete, onEdit }) => {
  if (loading) {
    return (
      <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-12 text-center text-neutral-400">
        Loading sub-categories...
      </div>
    );
  }

  if (!subCategories || subCategories.length === 0) {
    return (
      <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-12 text-center text-neutral-400">
        No sub-categories found. Click "Add Sub-Category" to create one.
      </div>
    );
  }

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-neutral-300">
          <thead className="bg-neutral-950/60 text-neutral-400 uppercase text-[11px] tracking-wider border-b border-neutral-800">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Parent Category</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {subCategories.map((sub) => (
              <tr key={sub.id} className="hover:bg-neutral-800/40 transition-colors">
                <td className="px-6 py-4">
                  {sub.imageUrl ? (
                    <img
                      src={sub.imageUrl}
                      alt={sub.name}
                      className="w-11 h-11 object-cover rounded-lg border border-neutral-700 bg-neutral-950"
                    />
                  ) : (
                    <div className="w-11 h-11 bg-neutral-800 rounded-lg border border-neutral-700/50 flex items-center justify-center text-[10px] text-neutral-500 font-medium">
                      No Img
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 font-semibold text-white">
                  {sub.name}
                </td>
                <td className="px-6 py-4 text-neutral-300">
                  <span className="px-2.5 py-1 bg-neutral-800 border border-neutral-700/60 rounded-md text-xs font-medium">
                    {categoriesMap[sub.categoryId] || `ID: ${sub.categoryId}`}
                  </span>
                </td>
                <td className="px-6 py-4 text-neutral-400 font-mono text-xs">
                  {sub.slug}
                </td>
                <td className="px-6 py-4">
                  {sub.active ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950/50 text-emerald-400 border border-emerald-800/40">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-800/80 text-neutral-400 border border-neutral-700">
                      <XCircle className="w-3.5 h-3.5" /> Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onEdit(sub)}
                      className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(sub.id, sub.name)}
                      className="p-2 text-neutral-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubCategoryTable;
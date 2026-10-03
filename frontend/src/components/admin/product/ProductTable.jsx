import React from "react";
import { Edit2, Trash2, CheckCircle2, XCircle } from "lucide-react";

const ProductTable = ({ products, loading, onDelete, onEdit }) => {
  if (loading) {
    return (
      <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-12 text-center text-neutral-400">
        Loading products...
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-12 text-center text-neutral-400">
        No products found. Click "Add Product" to create one.
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
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Category / Sub</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Badges</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {products.map((p) => {
              const imgUrl = p.imageUrls?.[0];
              return (
                <tr key={p.id} className="hover:bg-neutral-800/40 transition-colors">
                  <td className="px-6 py-4">
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={p.name}
                        className="w-11 h-11 object-cover rounded-lg border border-neutral-700 bg-neutral-950"
                      />
                    ) : (
                      <div className="w-11 h-11 bg-neutral-800 rounded-lg border border-neutral-700/50 flex items-center justify-center text-[10px] text-neutral-500 font-medium">
                        No Img
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-white">{p.name}</p>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">{p.slug}</p>
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <p className="text-neutral-200 font-medium">
                      {p.categoryName || `Cat ID: ${p.categoryId}`}
                    </p>
                    <p className="text-neutral-400 text-[11px]">
                      {p.subCategoryName || `Sub ID: ${p.subCategoryId}`}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white font-semibold">
                      ₹{p.discountPrice > 0 ? p.discountPrice : p.price}
                    </p>
                    {p.discountPrice > 0 && (
                      <p className="text-xs text-neutral-500 line-through">₹{p.price}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                        p.stockQuantity > 10
                          ? "bg-neutral-800 text-neutral-200"
                          : "bg-rose-950/60 text-rose-400 border border-rose-800/50"
                      }`}
                    >
                      {p.stockQuantity} units
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {p.isBestSeller && (
                        <span className="text-[10px] bg-amber-950/60 text-amber-400 border border-amber-800/40 px-2 py-0.5 rounded-md font-medium">
                          Best Seller
                        </span>
                      )}
                      {p.isTrending && (
                        <span className="text-[10px] bg-sky-950/60 text-sky-400 border border-sky-800/40 px-2 py-0.5 rounded-md font-medium">
                          Trending
                        </span>
                      )}
                      {p.isNewArrival && (
                        <span className="text-[10px] bg-purple-950/60 text-purple-400 border border-purple-800/40 px-2 py-0.5 rounded-md font-medium">
                          New
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {p.active ? (
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
                        onClick={() => onEdit(p)}
                        className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(p.id, p.name)}
                        className="p-2 text-neutral-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
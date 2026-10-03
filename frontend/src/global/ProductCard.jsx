import React from "react";

export default function ProductCard({ product }) {
  if (!product) return null;

  // Backend response: "imageUrls" array
  const imageSrc =
    product.imageUrls && product.imageUrls.length > 0
      ? product.imageUrls[0]
      : "https://via.placeholder.com/300";

  return (
    <div className="min-w-[260px] bg-white rounded-xl shadow hover:shadow-lg transition p-3 cursor-pointer">
      <img
        src={imageSrc}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
      />

      {/* Brand / Category Name */}
      <p className="mt-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {product.categoryName || product.brand || "E-Commerce"}
      </p>

      <h3 className="font-bold text-base truncate" title={product.name}>
        {product.name}
      </h3>

      {/* Pricing Logic */}
      <div className="flex items-center gap-2 mt-2">
        <p className="text-green-600 font-semibold text-lg">
          ₹{product.discountPrice > 0 ? product.discountPrice : product.price}
        </p>
        {product.discountPrice > 0 && (
          <p className="line-through text-gray-400 text-sm">
            ₹{product.price}
          </p>
        )}
      </div>

      <button className="w-full py-2 mt-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition cursor-pointer">
        View Product
      </button>
    </div>
  );
}
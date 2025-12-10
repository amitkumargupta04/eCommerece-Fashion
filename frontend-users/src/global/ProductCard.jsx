// ProductCard.jsx
import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="min-w-[260px] bg-white rounded-xl shadow hover:shadow-lg transition p-3 cursor-pointer">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
      />

      <p className="mt-2 text-sm text-gray-500">{product.brand}</p>

      <h3 className="font-bold text-lg">{product.name}</h3>

      <div className="flex items-center gap-2 mt-1">
        <p className="text-green-600 font-semibold text-lg">
          ₹{product.discountPrice}
        </p>
        <p className="line-through text-gray-400 text-sm">
          ₹{product.price}
        </p>
      </div>

      <button className="w-full py-2 mt-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
        View Product
      </button>
    </div>
  );
}

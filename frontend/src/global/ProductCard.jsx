import React from "react";
import { Link } from "react-router-dom";
import { Eye, ShoppingBag } from "lucide-react";

export default function ProductCard({ product }) {
  if (!product) return null;

  // Handle both array or string image sources
  let imageSrc = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800";
  if (Array.isArray(product.imageUrls) && product.imageUrls.length > 0) {
    imageSrc = product.imageUrls[0];
  } else if (typeof product.imageUrl === "string" && product.imageUrl) {
    imageSrc = product.imageUrl;
  } else if (Array.isArray(product.imageUrl) && product.imageUrl.length > 0) {
    imageSrc = product.imageUrl[0];
  }

  const productId = product.id || product._id;
  const originalPrice = Number(product.price || 0);
  const discountPrice = Number(product.discountPrice || 0);
  const hasDiscount = discountPrice > 0 && discountPrice < originalPrice;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-neutral-950 border border-white/20 hover:border-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.12)] flex flex-col h-full">
      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.isTrending && (
          <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-white text-black rounded-full shadow-md">
            Trending
          </span>
        )}
        {product.isNewArrival && (
          <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-black border border-white/60 text-white rounded-full shadow-md">
            New
          </span>
        )}
        {product.isBestSeller && (
          <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-neutral-800 border border-white/30 text-white rounded-full shadow-md">
            Best Seller
          </span>
        )}
      </div>

      {/* Discount Tag */}
      {hasDiscount && (
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <span className="px-2 py-0.5 text-[10px] font-bold bg-white/90 text-black rounded-md shadow-sm">
            {discountPercent}% OFF
          </span>
        </div>
      )}

      {/* Product Image */}
      <Link
        to={productId ? `/product/${productId}` : "#"}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-neutral-900"
      >
        <img
          src={imageSrc}
          alt={product.name || "Product image"}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span className="uppercase tracking-wider truncate font-medium">
              {product.categoryName || product.category?.name || "Luxury Wear"}
            </span>
            {product.subCategoryName && (
              <span className="truncate text-neutral-400">
                • {product.subCategoryName}
              </span>
            )}
          </div>

          <Link
            to={productId ? `/product/${productId}` : "#"}
            className="block"
          >
            <h3
              className="text-white font-medium text-sm sm:text-base line-clamp-1 group-hover:text-neutral-200 transition-colors"
              title={product.name}
            >
              {product.name || "Exclusive Item"}
            </h3>
          </Link>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-white font-bold text-base sm:text-lg">
              ₹{hasDiscount ? discountPrice.toLocaleString() : originalPrice.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-neutral-500 line-through text-xs sm:text-sm">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <Link
            to={productId ? `/product/${productId}` : "#"}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-black text-xs font-semibold rounded-lg hover:bg-neutral-200 transition-all cursor-pointer shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
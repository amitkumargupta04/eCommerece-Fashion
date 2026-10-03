import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";
import { subCategoryService } from "@/services";

export default function ShopBySubCategory() {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const res = await subCategoryService.getSubCategories();
        const data = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
          ? res
          : [];
        setSubCategories(data);
      } catch (err) {
        console.error("SubCategory Fetch Error:", err);
        setSubCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSubCategories();
  }, []);

  useEffect(() => {
    const updateVisible = () => {
      const w = window.innerWidth;
      if (w < 640) setVisibleCount(1.2);
      else if (w < 768) setVisibleCount(2);
      else if (w < 1024) setVisibleCount(3);
      else setVisibleCount(4);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = Math.max(0, subCategories.length - Math.floor(visibleCount));

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  if (loading) {
    return (
      <section className="w-full py-8">
        <div className="h-6 w-40 bg-neutral-800 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-[4/5] bg-neutral-900 border border-white/10 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (subCategories.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-8">
      {/* Title & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-widest text-neutral-400 block mb-1">
            Tailored Sub-Collections
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <span>Shop By Sub-Category</span>
            <span className="h-1.5 w-1.5 rounded-full bg-white hidden sm:inline-block" />
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/products"
            className="text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white flex items-center gap-1 transition-colors mr-2 group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {subCategories.length > visibleCount && (
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                aria-label="Previous Sub-Category"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900 border border-white/20 text-white hover:bg-white hover:text-black transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
                aria-label="Next Sub-Category"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900 border border-white/20 text-white hover:bg-white hover:text-black transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          }}
        >
          {subCategories.map((sub) => {
            const subId = sub.id || sub._id;
            const imgSrc =
              sub.imageUrl ||
              (Array.isArray(sub.imageUrls) && sub.imageUrls[0]) ||
              "";

            return (
              <div
                key={subId}
                style={{
                  flex: `0 0 calc(${100 / visibleCount}% - ${(6 * (visibleCount - 1)) / visibleCount}px)`,
                  minWidth: "250px",
                }}
              >
                <Link
                  to={`/products?subCategoryId=${subId}`}
                  className="group relative block aspect-[4/5] rounded-2xl overflow-hidden border border-white/20 hover:border-white transition-all duration-500 bg-neutral-950 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                >
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={sub.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center p-6 text-center">
                      <Sparkles className="w-8 h-8 text-neutral-600 mb-2" />
                      <span className="text-lg font-bold text-neutral-400 uppercase tracking-wider">
                        {sub.name}
                      </span>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Card Content */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <div className="flex items-end justify-between gap-2">
                      <div className="flex-1">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block mb-1">
                          {sub.categoryName || "Sub-Category"}
                        </span>
                        <h3 className="text-xl font-bold text-white uppercase tracking-wide group-hover:text-neutral-200 transition-colors truncate">
                          {sub.name}
                        </h3>
                        {sub.description && (
                          <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                            {sub.description}
                          </p>
                        )}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:rotate-45 transition-all duration-300 flex-shrink-0">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

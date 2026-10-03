import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function ProductCarousel({
  title,
  subtitle,
  products = [],
  loading = false,
  viewAllLink,
  filterType,
}) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

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

  const maxIndex = Math.max(0, products.length - Math.floor(visibleCount));

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  // Skeleton Loader for black & white theme
  if (loading) {
    return (
      <section className="w-full py-6">
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="h-4 w-24 bg-neutral-800 rounded animate-pulse mb-2" />
            <div className="h-8 w-48 bg-neutral-700 rounded animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="aspect-[3/4] bg-neutral-900 border border-white/10 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 border-b border-white/10 pb-4">
        <div>
          {subtitle && (
            <span className="text-xs uppercase font-semibold tracking-widest text-neutral-400 block mb-1">
              {subtitle}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <span>{title}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-white hidden sm:inline-block" />
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white flex items-center gap-1 transition-colors mr-2 group"
            >
              <span>Explore All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}

          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              aria-label="Previous Products"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              aria-label="Next Products"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none cursor-pointer shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="overflow-hidden" ref={containerRef}>
        <div
          className="flex gap-6 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id || product._id || Math.random()}
              style={{
                flex: `0 0 calc(${100 / visibleCount}% - ${(6 * (visibleCount - 1)) / visibleCount}px)`,
                minWidth: "240px",
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

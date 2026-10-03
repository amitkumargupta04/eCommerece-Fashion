import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ title, products = [], loading = false }) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateVisible = () => {
      const w = window.innerWidth;
      if (w < 640) setVisibleCount(1);
      else if (w < 1024) setVisibleCount(2);
      else setVisibleCount(4);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, Math.max(0, products.length - visibleCount))
    );
  };

  if (loading) {
    return (
      <div className="w-full mt-10 px-4">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="text-gray-400 text-sm animate-pulse">Loading products...</div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null; // Agar koi product na mile to poora carousel hide ho jayega
  }

  return (
    <div className="w-full mt-10">
      {/* Title + Arrows */}
      <div className="flex justify-between items-center px-4 mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex gap-2 px-2">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="p-2 bg-white rounded-full shadow hover:bg-black hover:text-white transition disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= products.length - visibleCount}
            className="p-2 bg-white rounded-full shadow hover:bg-black hover:text-white transition disabled:opacity-30 cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden px-4" ref={containerRef}>
        <div
          className="flex gap-4 transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                flex: `0 0 calc(${100 / visibleCount}% - 0.75rem)`,
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
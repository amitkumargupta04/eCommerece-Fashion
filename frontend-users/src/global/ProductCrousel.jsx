// ProductCarousel.jsx
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ title, products = [] }) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  // Responsive visible count
  useEffect(() => {
    const updateVisible = () => {
      const w = window.innerWidth;
      if (w < 640) setVisibleCount(1);
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
      Math.min(prev + 1, products.length - visibleCount)
    );
  };

  // Calculate actual translate in px
  const getTranslateX = () => {
    if (!containerRef.current) return 0;
    const containerWidth = containerRef.current.clientWidth;
    const totalWidth = containerRef.current.scrollWidth;
    const maxIndex = products.length - visibleCount;
    const index = Math.min(currentIndex, maxIndex);
    const scrollWidth = totalWidth - containerWidth;
    return (scrollWidth / maxIndex) * index || 0;
  };

  return (
    <div className="w-full mt-10">
      {/* Title + Arrows */}
      <div className="flex justify-between items-center px-4 mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex gap-2 px-2">
          <button
            onClick={prevSlide}
            className="p-2 bg-white rounded-full shadow hover:bg-black hover:text-white transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 bg-white rounded-full shadow hover:bg-black hover:text-white transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden px-4" ref={containerRef}>
        <div
          className="flex gap-4 transition-transform duration-300"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          }}
        >
          {products.map((product, i) => (
            <div
              key={i}
              style={{
                flex: `0 0 calc(${100 / visibleCount}% - 1rem)`, // 1rem is gap between cards
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

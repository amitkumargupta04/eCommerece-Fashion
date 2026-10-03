import React, { useEffect, useState } from "react";
import { Tag, ChevronLeft, ChevronRight } from "lucide-react";

export default function ShopByCategory() {
  const categories = [
    {
      name: "Men",
      img: "https://images.unsplash.com/photo-1521334884684-d80222895322?w=800",
      link: "/category/mens",
    },
    {
      name: "Women",
      img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
      link: "/category/womens",
    },
    {
      name: "Kids",
      img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800",
      link: "/category/kids",
    },
    {
      name: "Footwear",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      link: "/category/footwear",
    },
    {
      name: "Winters",
      img: "https://images.unsplash.com/photo-1577909687863-91bb3ec12db5?w=800",
      link: "/category/winter",
    },
    {
      name: "Summer",
      img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800",
      link: "/category/summer",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  // Handle responsiveness
  useEffect(() => {
    const updateVisible = () => {
      const w = window.innerWidth;
      if (w < 640) setVisibleCount(1);
      else if (w < 768) setVisibleCount(2);
      else if (w < 1024) setVisibleCount(3);
      else setVisibleCount(4);
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [categories.length]);

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + categories.length) % categories.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 mt-10">
      {/* Title & Arrows */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Shop by Category
        </h2>

        <div className="flex gap-2 px-2">
          <button
            onClick={prevSlide}
            className="p-2 bg-white/70 hover:bg-black hover:text-white rounded-full shadow hover:shadow-md cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 bg-white/70 hover:bg-black hover:text-white rounded-full shadow hover:shadow-md cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          }}
        >
          {categories.map((cat, index) => (
            <a
              href={cat.link}
              key={index}
              className="relative h-60 rounded-xl overflow-hidden shadow-md cursor-pointer group"
              style={{
                flex: `0 0 calc(${100 / visibleCount}% - 1.5rem)`,
              }}
            >
              <img
                src={cat.img}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute bottom-0 left-0 w-full h-28 shadow-[inset_0_-80px_60px_-20px_rgba(0,0,0,0.6)]"></div>

              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                <Tag size={20} />
                <h3 className="text-xl font-semibold drop-shadow-lg items-center">
                  {cat.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

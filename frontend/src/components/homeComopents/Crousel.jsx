import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";

export default function Carousel() {
  const [banner, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // Fetch banners
  const getBanner = async () => {
    try {
      const res = await axiosInstance.get("/banner/get");
      if (res.data.success) {
        setBanners(res.data.banners);
      }
    } catch (error) {
      console.log("Error fetching banners:", error);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  const nextSlide = () => {
    if (banner.length === 0) return;
    setCurrent((prev) => (prev + 1) % banner.length);
  };

  const prevSlide = () => {
    if (banner.length === 0) return;
    setCurrent((prev) => (prev - 1 + banner.length) % banner.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000); // auto-slide every 4s
    return () => clearInterval(timer);
  }, [banner]);

  if (banner.length === 0) return null;

  return (
    <div className="relative w-full h-[220px] sm:h-[350px] lg:h-[500px] overflow-hidden">
      {/* Slides */}
      {banner.map((item, index) => (
        <div
          key={item._id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Image */}
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover object-center block"
          />

          {/* Overlay Text */}
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-start px-6 sm:px-12 lg:px-24 text-white">
            <h2 className="text-xl sm:text-3xl lg:text-5xl font-bold mb-2">{item.title}</h2>
            <p className="text-sm sm:text-lg lg:text-xl mb-4">{item.subtitle}</p>
            {item.link && (
              <button
                onClick={() => navigate(item.link)}
                className="bg-white/70 text-black px-4 py-2 sm:px-6 sm:py-3 rounded hover:bg-black hover:text-white transition"
              >
                Shop Now
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 p-3 rounded-full shadow hover:bg-black hover:text-white transition cursor-pointer z-20"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 p-3 rounded-full shadow hover:bg-black hover:text-white transition cursor-pointer z-20"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2 z-20">
        {banner.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              index === current ? "bg-black h-3 w-3" : "bg-gray-300"
            }`}
            onClick={() => setCurrent(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}

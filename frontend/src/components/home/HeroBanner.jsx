import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const SLIDES = [
  {
    id: 1,
    badge: "Autumn / Winter 2026",
    title: "MONOCHROME ESSENTIALS",
    subtitle: "Refined silhouettes and timeless tailoring crafted for the modern aesthetic.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80",
    ctaText: "Shop Collection",
    ctaLink: "/products?isTrending=true",
    secondaryText: "New Arrivals",
    secondaryLink: "/products?isNewArrival=true",
  },
  {
    id: 2,
    badge: "Exclusive Launch",
    title: "DARK LUXURY COUTURE",
    subtitle: "Minimalist geometry meets premium craftsmanship. Experience the vanguard of high fashion.",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80",
    ctaText: "Explore Now",
    ctaLink: "/products?isBestSeller=true",
    secondaryText: "View Lookbook",
    secondaryLink: "/products",
  },
  {
    id: 3,
    badge: "Signature Collection",
    title: "CONTEMPORARY TAILORING",
    subtitle: "Precision cuts, premium textures, and unapologetic attitude in every single thread.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80",
    ctaText: "Shop The Drop",
    ctaLink: "/products",
    secondaryText: "Best Sellers",
    secondaryLink: "/products?isBestSeller=true",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-neutral-950 my-4">
      {/* Slides */}
      {SLIDES.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image with monochrome luxury filter */}
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover object-center transform transition-transform duration-10000 ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full text-xs font-semibold uppercase tracking-wider mb-4 w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{slide.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-none mb-4">
                {slide.title}
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-neutral-300 font-light mb-8 max-w-xl leading-relaxed">
                {slide.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to={slide.ctaLink}
                  className="px-7 py-3.5 bg-white text-black font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-all flex items-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to={slide.secondaryLink}
                  className="px-7 py-3.5 bg-transparent border border-white/40 text-white font-semibold text-sm uppercase tracking-wider rounded-xl hover:bg-white/10 hover:border-white transition-all cursor-pointer"
                >
                  {slide.secondaryText}
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-8 z-20 hidden sm:flex items-center gap-3">
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-6 sm:left-12 lg:left-20 z-20 flex items-center gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
              idx === current ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

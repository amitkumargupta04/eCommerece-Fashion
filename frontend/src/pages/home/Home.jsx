import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import ShopByCategory from "@/components/home/ShopByCategory";
import ShopBySubCategory from "@/components/home/ShopBySubCategory";
import TrendingProducts from "@/components/home/TrendingProducts";
import NewArrivals from "@/components/home/NewArrivals";
import BestSellers from "@/components/home/BestSellers";
import OurProcess from "@/components/home/OurProcess";

export default function HomePage() {
  return (
    <div className="w-full bg-black text-white min-h-screen">
      {/* Outer wrapper with responsive container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
        {/* 1. Hero Banner / Carousel */}
        <HeroBanner />

        {/* 2. Shop By Category */}
        <ShopByCategory />

        {/* 3. Shop By Sub-Category */}
        <ShopBySubCategory />

        {/* 4. Trending Products (isTrending=true) */}
        <TrendingProducts />

        {/* 5. New Arrivals (isNewArrival=true) */}
        <NewArrivals />

        {/* 6. Best Sellers (isBestSeller=true) */}
        <BestSellers />

        {/* 7. Process / Trust Badges */}
        <OurProcess />
      </div>
    </div>
  );
}
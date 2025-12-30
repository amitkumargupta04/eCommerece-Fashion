import React from "react";
import Carousel from "../../components/homeComopents/Crousel";
import ShopByCategory from "../../components/homeComopents/shopByCategory";
import NewArrivals from "../../components/homeComopents/NewArrivals";
import BestSellers from "../../components/homeComopents/BestSellers";
import TrendingProducts from "../../components/homeComopents/TrendingProducts";
import OurProcess from "../../components/homeComopents/OurProcess";

function HomePage() {
  return (
    <>
      <Carousel />
      <ShopByCategory />
      <NewArrivals />
      <BestSellers />
      <TrendingProducts />
      <OurProcess/>
    </>
  );
}

export default HomePage;

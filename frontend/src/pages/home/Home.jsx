import NewArrivals from "@/components/home/NewArrivals";
import BestSellers from "@/components/home/BestSellers";
import TrendingProducts from "@/components/home/TrendingProducts";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto pb-16 space-y-8">
      {/* Hero Banner / Categories list etc */}
      
      {/* Featured Product Carousels */}
      <NewArrivals />
      <BestSellers />
      <TrendingProducts />
    </div>
  );
}
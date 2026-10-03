import React, { useEffect, useState } from "react";
import { productService } from "@/services";
import ProductCarousel from "@/global/ProductCarousel";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await productService.getProducts({
          page: 0,
          size: 10,
          isNewArrival: true,
          sortBy: "createdAt",
          sortDirection: "desc",
        });
        const productList = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
          ? res
          : [];
        setProducts(productList);
      } catch (err) {
        console.error("New Arrivals Fetch Error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNewArrivals();
  }, []);

  if (!loading && products.length === 0) {
    return null;
  }

  return (
    <ProductCarousel
      title="New Arrivals"
      subtitle="Fresh From The Runway"
      products={products}
      loading={loading}
      viewAllLink="/products?isNewArrival=true"
    />
  );
}
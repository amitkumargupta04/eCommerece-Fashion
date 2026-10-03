import React, { useEffect, useState } from "react";
import { productService } from "@/services";
import ProductCarousel from "@/global/ProductCarousel";

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await productService.getProducts({
          page: 0,
          size: 10,
          isTrending: true,
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
        console.error("Trending Products Fetch Error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  if (!loading && products.length === 0) {
    return null;
  }

  return (
    <ProductCarousel
      title="Trending Now"
      subtitle="Most Desired This Season"
      products={products}
      loading={loading}
      viewAllLink="/products?isTrending=true"
    />
  );
}
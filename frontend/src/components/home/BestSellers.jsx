import React, { useEffect, useState } from "react";
import { productService } from "@/services";
import ProductCarousel from "@/global/ProductCarousel";

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await productService.getProducts({
          page: 0,
          size: 10,
          isBestSeller: true,
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
        console.error("Best Sellers Fetch Error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBestSellers();
  }, []);

  if (!loading && products.length === 0) {
    return null;
  }

  return (
    <ProductCarousel
      title="Best Sellers"
      subtitle="Iconic Wardrobe Staples"
      products={products}
      loading={loading}
      viewAllLink="/products?isBestSeller=true"
    />
  );
}
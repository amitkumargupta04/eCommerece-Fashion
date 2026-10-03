import React, { useEffect, useState } from "react";
import api from "@/api/axios";
import ProductCarousel from "@/global/ProductCarousel";

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await api.get("/product/?page=0&size=10&isBestSeller=true");
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("BestSellers Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBestSellers();
  }, []);

  return (
    <ProductCarousel
      title="Best Sellers"
      products={products}
      loading={loading}
    />
  );
}
import React, { useEffect, useState } from "react";
import api from "@/api/axios"; 
import ProductCarousel from "@/global/ProductCarousel";

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await api.get("/product/?page=0&size=10&isTrending=true");
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Trending Products Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <ProductCarousel
      title="Trending Products"
      products={products}
      loading={loading}
    />
  );
}
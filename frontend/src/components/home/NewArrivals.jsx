import React, { useEffect, useState } from "react";
import api from "@/api/axios";
import ProductCarousel from "@/global/ProductCarousel";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await api.get("/product/?page=0&size=10&isNewArrival=true");
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("New Arrivals Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNewArrivals();
  }, []);

  return (
    <ProductCarousel
      title="New Arrivals"
      products={products}
      loading={loading}
    />
  );
}
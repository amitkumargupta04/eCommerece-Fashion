// NewArrivals.jsx
import React from "react";
import ProductCarousel from "../../global/ProductCrousel";

export default function NewArrivals() {
  const products = [
    {
      name: "Campus Breeze Shoes",
      brand: "Campus",
      price: 2499,
      discountPrice: 1999,
      images: ["https://images.unsplash.com/photo-1521094689794-56c1b4a2457e?w=800"],
    },
    {
      name: "RedTape Men's Sneakers",
      brand: "RedTape",
      price: 2899,
      discountPrice: 2299,
      images: ["https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=800"],
    },
    {
      name: "ASICS Running Shoes",
      brand: "ASICS",
      price: 6999,
      discountPrice: 5999,
      images: ["https://images.unsplash.com/photo-1600180758895-5c4f04cb0cde?w=800"],
    },
    {
      name: "Nike Flex Experience",
      brand: "Nike",
      price: 4999,
      discountPrice: 4499,
      images: ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800"],
    },
    {
      name: "Puma Sports Runner",
      brand: "Puma",
      price: 5999,
      discountPrice: 5499,
      images: ["https://images.unsplash.com/photo-1519741497674-611481863552?w=800"],
    },
    {
      name: "Adidas Lite Racer",
      brand: "Adidas",
      price: 6999,
      discountPrice: 6499,
      images: ["https://images.unsplash.com/photo-1528701800489-20be3c31ea3a?w=800"],
    },
    {
      name: "Reebok Classic Nylon",
      brand: "Reebok",
      price: 5599,
      discountPrice: 4999,
      images: ["https://images.unsplash.com/photo-1600180758895-5c4f04cb0cde?w=800"],
    },
    {
      name: "New Balance 574",
      brand: "New Balance",
      price: 7999,
      discountPrice: 7499,
      images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"],
    },
    {
      name: "Skechers Go Run",
      brand: "Skechers",
      price: 3999,
      discountPrice: 3499,
      images: ["https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800"],
    },
    {
      name: "Fila Disruptor II",
      brand: "Fila",
      price: 5999,
      discountPrice: 5499,
      images: ["https://images.unsplash.com/photo-1539185441755-769473a23570?w=800"],
    },
  ];

  return <ProductCarousel title="New Arrivals" products={products} />;
}

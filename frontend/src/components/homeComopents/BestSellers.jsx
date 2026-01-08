// BestSellers.jsx
import React from "react";
import ProductCarousel from "../../global/ProductCrousel";

export default function BestSellers() {
  const products = [
    {
      name: "Woodland Leather Boots",
      brand: "Woodland",
      price: 5599,
      discountPrice: 4999,
      images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800"],
    },
    {
      name: "HRX Sports Shoes",
      brand: "HRX",
      price: 3999,
      discountPrice: 2999,
      images: ["https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800"],
    },
    {
      name: "Sparx Mens Walking Shoe",
      brand: "Sparx",
      price: 1999,
      discountPrice: 1499,
      images: ["https://images.unsplash.com/photo-1539185441755-769473a23570?w=800"],
    },
    {
      name: "Nike Revolution 5",
      brand: "Nike",
      price: 4999,
      discountPrice: 4499,
      images: ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800"],
    },
    {
      name: "Adidas Ultraboost",
      brand: "Adidas",
      price: 10999,
      discountPrice: 9999,
      images: ["https://images.unsplash.com/photo-1528701800489-20be3c31ea3a?w=800"],
    },
    {
      name: "Puma Ignite",
      brand: "Puma",
      price: 6499,
      discountPrice: 5999,
      images: ["https://images.unsplash.com/photo-1519741497674-611481863552?w=800"],
    },
    {
      name: "Reebok Floatride",
      brand: "Reebok",
      price: 6999,
      discountPrice: 6499,
      images: ["https://images.unsplash.com/photo-1600180758895-5c4f04cb0cde?w=800"],
    },
    {
      name: "New Balance 990v5",
      brand: "New Balance",
      price: 8999,
      discountPrice: 8499,
      images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"],
    },
    {
      name: "Skechers Max Cushioning",
      brand: "Skechers",
      price: 4999,
      discountPrice: 4499,
      images: ["https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800"],
    },
    {
      name: "Fila Ray Tracer",
      brand: "Fila",
      price: 5999,
      discountPrice: 5499,
      images: ["https://images.unsplash.com/photo-1539185441755-769473a23570?w=800"],
    },
  ];

  return <ProductCarousel title="Best Sellers" products={products} />;
}

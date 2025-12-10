// TrendingProducts.jsx
import React from "react";
import ProductCarousel from "../../global/ProductCrousel";

export default function TrendingProducts() {
  const products = [
    {
      name: "Adidas Running Shoes",
      brand: "Adidas",
      price: 7499,
      discountPrice: 6999,
      images: ["https://images.unsplash.com/photo-1528701800489-20be3c31ea3a?w=800"],
    },
    {
      name: "Nike Air Max",
      brand: "Nike",
      price: 8999,
      discountPrice: 7999,
      images: ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800"],
    },
    {
      name: "Puma Sport Shoes",
      brand: "Puma",
      price: 5999,
      discountPrice: 4999,
      images: ["https://images.unsplash.com/photo-1519741497674-611481863552?w=800"],
    },
    {
      name: "Reebok Classic",
      brand: "Reebok",
      price: 6499,
      discountPrice: 5799,
      images: ["https://images.unsplash.com/photo-1600180758895-5c4f04cb0cde?w=800"],
    },
    {
      name: "ASICS Gel-Kayano",
      brand: "ASICS",
      price: 10999,
      discountPrice: 9999,
      images: ["https://images.unsplash.com/photo-1520974733185-0b9f1f42b73c?w=800"],
    },
    {
      name: "New Balance 990",
      brand: "New Balance",
      price: 8999,
      discountPrice: 8499,
      images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"],
    },
    {
      name: "Under Armour Charged",
      brand: "Under Armour",
      price: 7999,
      discountPrice: 7499,
      images: ["https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800"],
    },
    {
      name: "Skechers GOwalk",
      brand: "Skechers",
      price: 3999,
      discountPrice: 3499,
      images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800"],
    },
    {
      name: "Fila Disruptor",
      brand: "Fila",
      price: 5999,
      discountPrice: 5499,
      images: ["https://images.unsplash.com/photo-1539185441755-769473a23570?w=800"],
    },
    {
      name: "Converse All Star",
      brand: "Converse",
      price: 4999,
      discountPrice: 4499,
      images: ["https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=800"],
    },
  ];

  return <ProductCarousel title="🔥 Trending Products" products={products} />;
}

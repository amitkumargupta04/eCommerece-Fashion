import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";

import {
  fetchProductsThunk,
  createProductThunk,
  updateProductThunk,
  deleteProductThunk,
} from "@/features/product/productSlice";
import { fetchCategoriesThunk } from "@/features/category/categorySlice";
import { fetchSubCategoriesThunk } from "@/features/subCategory/subCategorySlice";

import ProductTable from "@/components/admin/product/ProductTable";
import ProductModal from "@/components/admin/product/ProductModal";

const ProductPage = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const { subCategories } = useSelector((state) => state.subCategory);

  const [activeTab, setActiveTab] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Load products dynamically based on selected tab
  const loadProductsByTab = (tab) => {
    const params = { page: 0, size: 10 };
    if (tab === "TRENDING") params.isTrending = true;
    if (tab === "BEST_SELLER") params.isBestSeller = true;
    if (tab === "NEW_ARRIVAL") params.isNewArrival = true;

    dispatch(fetchProductsThunk(params));
  };

  useEffect(() => {
    loadProductsByTab(activeTab);
    if (!categories?.length) dispatch(fetchCategoriesThunk());
    if (!subCategories?.length) dispatch(fetchSubCategoriesThunk());
  }, [dispatch, activeTab]);

  const handleSubmit = async (formData) => {
    try {
      if (selectedProduct) {
        await dispatch(
          updateProductThunk({ id: selectedProduct.id, productData: formData })
        ).unwrap();
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Product updated successfully.",
          background: "#171717",
          color: "#fff",
          confirmButtonColor: "#262626",
          customClass: { popup: "border border-neutral-800 rounded-2xl shadow-2xl" },
        });
      } else {
        await dispatch(createProductThunk(formData)).unwrap();
        Swal.fire({
          icon: "success",
          title: "Created!",
          text: "Product created successfully.",
          background: "#171717",
          color: "#fff",
          confirmButtonColor: "#262626",
          customClass: { popup: "border border-neutral-800 rounded-2xl shadow-2xl" },
        });
      }
      setIsModalOpen(false);
      setSelectedProduct(null);
      // Operation success hone par list refresh karein
      loadProductsByTab(activeTab);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err || "Something went wrong!",
        background: "#171717",
        color: "#fff",
        confirmButtonColor: "#dc2626",
        customClass: { popup: "border border-neutral-800 rounded-2xl shadow-2xl" },
      });
    }
  };

  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are deleting "${name}". This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#262626",
      confirmButtonText: "Yes, delete it!",
      background: "#171717",
      color: "#fff",
      customClass: { popup: "border border-neutral-800 rounded-2xl shadow-2xl" },
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(deleteProductThunk(id))
          .unwrap()
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Product deleted successfully.",
              icon: "success",
              background: "#171717",
              color: "#fff",
              confirmButtonColor: "#262626",
              customClass: { popup: "border border-neutral-800 rounded-2xl shadow-2xl" },
            });
            loadProductsByTab(activeTab);
          })
          .catch((err) => {
            Swal.fire({
              title: "Failed!",
              text: err || "Failed to delete product.",
              icon: "error",
              background: "#171717",
              color: "#fff",
              confirmButtonColor: "#dc2626",
            });
          });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Products</h1>
          <p className="text-neutral-400 text-sm mt-1">
            Manage store inventory, prices, and featured items.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedProduct(null);
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-black px-4 py-2.5 rounded-xl font-semibold text-sm transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Add Product
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 overflow-x-auto">
        {[
          { key: "ALL", label: "All Products" },
          { key: "BEST_SELLER", label: "Best Sellers" },
          { key: "TRENDING", label: "Trending" },
          { key: "NEW_ARRIVAL", label: "New Arrivals" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              activeTab === tab.key
                ? "bg-white text-black shadow-md"
                : "text-neutral-400 bg-neutral-900 border border-neutral-800 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <ProductTable
        products={products}
        loading={loading}
        onDelete={handleDelete}
        onEdit={(p) => {
          setSelectedProduct(p);
          setIsModalOpen(true);
        }}
      />

      {/* Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        editData={selectedProduct}
        categories={categories}
        subCategories={subCategories}
        loading={loading}
      />
    </div>
  );
};

export default ProductPage;
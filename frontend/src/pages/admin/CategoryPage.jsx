import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2"; 
import {
  fetchCategoriesThunk,
  createCategoryThunk,
  updateCategoryThunk,
  deleteCategoryThunk,
} from "@/features";

import CategoryHeader from "@/components/admin/category/CategoryHeader";
import CategoryTable from "@/components/admin/category/CategoryTable";
import CategoryModal from "@/components/admin/category/CategoryModal";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector(
    (state) => state.category
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  const handleOpenCreateModal = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (id, categoryName) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${categoryName || "this category"}". This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#374151", 
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#111827",   
      color: "#fff",
      customClass: {
        popup: "border border-gray-800 rounded-2xl shadow-2xl",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategoryThunk(id))
          .unwrap()
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Category has been deleted successfully.",
              icon: "success",
              background: "#111827",
              color: "#fff",
              confirmButtonColor: "#4f46e5",
              customClass: {
                popup: "border border-gray-800 rounded-2xl",
              },
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: err || "Failed to delete category.",
              icon: "error",
              background: "#111827",
              color: "#fff",
              confirmButtonColor: "#4f46e5",
            });
          });
      }
    });
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedCategory) {
        await dispatch(
          updateCategoryThunk({ id: selectedCategory.id, categoryData: formData })
        ).unwrap();
        
        // Success Toast using SweetAlert2
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Category updated successfully!",
          showConfirmButton: false,
          timer: 3000,
          background: "#1f2937",
          color: "#fff",
        });
      } else {
        await dispatch(createCategoryThunk(formData)).unwrap();
        
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Category created successfully!",
          showConfirmButton: false,
          timer: 3000,
          background: "#1f2937",
          color: "#fff",
        });
      }

      setIsModalOpen(false);
      setSelectedCategory(null);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err || "Something went wrong!",
        background: "#111827",
        color: "#fff",
      });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <CategoryHeader onOpenModal={handleOpenCreateModal} />

      <CategoryTable
        categories={categories}
        loading={loading}
        onDelete={handleDelete}
        onEdit={handleOpenEditModal}
      />

      <CategoryModal
        key={selectedCategory?.id || "new-category-modal"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        editData={selectedCategory}
        loading={loading}
      />
    </div>
  );
};

export default CategoryPage;
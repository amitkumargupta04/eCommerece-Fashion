import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";

import {
  fetchSubCategoriesThunk,
  createSubCategoryThunk,
  updateSubCategoryThunk,
  deleteSubCategoryThunk,
} from "@/features/subCategory/subCategorySlice";
import { fetchCategoriesThunk } from "@/features/category/categorySlice";

import SubCategoryTable from "@/components/admin/subCategory/SubCategoryTable";
import SubCategoryModal from "@/components/admin/subCategory/SubCategoryModal";

const SubCategoryPage = () => {
  const dispatch = useDispatch();

  const { subCategories, loading } = useSelector((state) => state.subCategory);
  const { categories } = useSelector((state) => state.category);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // 1. Initial Data Fetching
  useEffect(() => {
    dispatch(fetchSubCategoriesThunk());
    if (!categories || categories.length === 0) {
      dispatch(fetchCategoriesThunk());
    }
  }, [dispatch]);

  // 2. Categories Map for Quick Lookup
  const categoriesMap = useMemo(() => {
    const map = {};
    categories?.forEach((cat) => {
      map[cat.id] = cat.name;
    });
    return map;
  }, [categories]);

  // 3. Handlers for Modal Opening
  const handleOpenCreateModal = () => {
    setSelectedSubCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (subCat) => {
    setSelectedSubCategory(subCat);
    setIsModalOpen(true);
  };

  // 4. Create / Update Handler with SweetAlert Notifications
  const handleSubmit = async (formData) => {
    try {
      if (selectedSubCategory) {
        // UPDATE
        await dispatch(
          updateSubCategoryThunk({
            id: selectedSubCategory.id,
            subCategoryData: formData,
          })
        ).unwrap();

        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Sub-Category updated successfully.",
          background: "#171717",
          color: "#fff",
          confirmButtonColor: "#262626",
          customClass: {
            popup: "border border-neutral-800 rounded-2xl shadow-2xl",
          },
        });
      } else {
        // CREATE
        await dispatch(createSubCategoryThunk(formData)).unwrap();

        Swal.fire({
          icon: "success",
          title: "Created!",
          text: "New Sub-Category created successfully.",
          background: "#171717",
          color: "#fff",
          confirmButtonColor: "#262626",
          customClass: {
            popup: "border border-neutral-800 rounded-2xl shadow-2xl",
          },
        });
      }

      // Close modal on success
      setIsModalOpen(false);
      setSelectedSubCategory(null);
    } catch (err) {
      // ERROR SWEETALERT
      Swal.fire({
        icon: "error",
        title: "Action Failed",
        text: err || "Something went wrong! Please try again.",
        background: "#171717",
        color: "#fff",
        confirmButtonColor: "#dc2626",
        customClass: {
          popup: "border border-neutral-800 rounded-2xl shadow-2xl",
        },
      });
    }
  };

  // 5. Delete Handler with Confirmation & Alert
  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${name}". This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#262626",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#171717",
      color: "#fff",
      customClass: {
        popup: "border border-neutral-800 rounded-2xl shadow-2xl",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSubCategoryThunk(id))
          .unwrap()
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: `Sub-Category "${name}" deleted successfully.`,
              icon: "success",
              background: "#171717",
              color: "#fff",
              confirmButtonColor: "#262626",
              customClass: {
                popup: "border border-neutral-800 rounded-2xl shadow-2xl",
              },
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Failed!",
              text: err || "Could not delete sub-category.",
              icon: "error",
              background: "#171717",
              color: "#fff",
              confirmButtonColor: "#dc2626",
              customClass: {
                popup: "border border-neutral-800 rounded-2xl shadow-2xl",
              },
            });
          });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Sub-Categories
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Manage sub-categories linked to main product categories.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-black px-4 py-2.5 rounded-xl font-semibold text-sm transition shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Add Sub-Category
        </button>
      </div>

      {/* Table */}
      <SubCategoryTable
        subCategories={subCategories}
        categoriesMap={categoriesMap}
        loading={loading}
        onDelete={handleDelete}
        onEdit={handleOpenEditModal}
      />

      {/* Modal */}
      <SubCategoryModal
        key={selectedSubCategory?.id || "new-sub-modal"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        editData={selectedSubCategory}
        categories={categories}
        loading={loading}
      />
    </div>
  );
};

export default SubCategoryPage;
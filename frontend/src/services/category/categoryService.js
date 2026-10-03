import api from "@/app/axios"; 

const getAllCategories = async () => {
  const response = await api.get("/categories/");
  return response.data;
};



const createCategory = async (categoryData) => {
  const payload = {
    ...categoryData,
    imageUrl: Array.isArray(categoryData.imageUrl)
      ? categoryData.imageUrl[0] || ""
      : categoryData.imageUrl || "",
  };

  const response = await api.post("/categories/", payload);
  return response.data;
};

const updateCategory = async (id, categoryData) => {
  const payload = {
    ...categoryData,
    imageUrl: Array.isArray(categoryData.imageUrl)
      ? categoryData.imageUrl[0] || ""
      : categoryData.imageUrl || "",
  };

  const response = await api.put(`/categories/${id}`, payload);
  return response.data;
};


const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};

const categoryService = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;
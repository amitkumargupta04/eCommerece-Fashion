import api from "@/app/axios"; 

const formatSubCategoryPayload = (data) => ({
  ...data,
  categoryId: Number(data.categoryId),
  imageUrl: Array.isArray(data.imageUrl)
    ? data.imageUrl[0] || ""
    : data.imageUrl || "",
});

const getSubCategories = async () => {
  const response = await api.get("/sub-categories/");
  return response.data;
};
const createSubCategory = async (subCategoryData) => {
  const payload = formatSubCategoryPayload(subCategoryData);
  const response = await api.post("/sub-categories/", payload);
  return response.data;
};

const updateSubCategory = async (id, subCategoryData) => {
  const payload = formatSubCategoryPayload(subCategoryData);
  const response = await api.put(`/sub-categories/${id}`, payload);
  return response.data;
};

const deleteSubCategory = async (id) => {
  const response = await api.delete(`/sub-categories/${id}`);
  return response.data;
};

const subCategoryService = {
  getSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
};

export default subCategoryService;
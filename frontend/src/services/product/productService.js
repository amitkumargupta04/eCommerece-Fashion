import api from "@/app/axios";

// Private Helper Function - No Export Needed
const formatProductPayload = (productData) => {
  let images = [];
  if (Array.isArray(productData.imageUrls)) {
    images = productData.imageUrls.flat().filter(Boolean);
  } else if (productData.imageUrl) {
    images = Array.isArray(productData.imageUrl) 
      ? productData.imageUrl.flat().filter(Boolean) 
      : [productData.imageUrl].filter(Boolean);
  }

  return {
    name: productData.name?.trim() || "",
    description: productData.description?.trim() || "",
    categoryId: Number(productData.categoryId),
    subCategoryId: Number(productData.subCategoryId),
    price: Number(productData.price),
    discountPrice: Number(productData.discountPrice || 0),
    stockQuantity: Number(productData.stockQuantity),
    imageUrls: images, 
    isTrending: Boolean(productData.isTrending),
    isBestSeller: Boolean(productData.isBestSeller),
    isNewArrival: Boolean(productData.isNewArrival),
    active: Boolean(productData.active),
  };
};

const getProducts = async (params = { page: 0, size: 10 }) => {
  const response = await api.get("/product/", { params });
  return response.data;
};

const createProduct = async (productData) => {
  const payload = formatProductPayload(productData);
  console.log("FINAL CREATE PAYLOAD:", JSON.stringify(payload)); 
  const response = await api.post("/product/", payload);
  return response.data;
};

const updateProduct = async (id, productData) => {
  const payload = formatProductPayload(productData);
  console.log("FINAL UPDATE PAYLOAD:", JSON.stringify(payload)); 
  const response = await api.put(`/product/${id}`, payload);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await api.delete(`/product/${id}`);
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
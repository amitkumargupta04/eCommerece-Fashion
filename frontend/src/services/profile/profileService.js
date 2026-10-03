import api from "@/app/axios";

const getMyProfile = async () => {
  const response = await api.get("/profile/getMyProfile");
  return response.data;
};

const saveProfile = async (profileData) => {
  const response = await api.put("/profile/save", profileData);
  return response.data;
};

const changePassword = async (passwords) => {
  const response = await api.put("/profile/change-password", passwords);
  return response.data;
};

const uploadProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file); 

  const response = await api.post("/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data; 
};

const updateAvatar = async (file) => {
  const formData = new FormData();
  formData.append("file", file); 

  const response = await api.patch("/profile/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const profileService = {
  getMyProfile,
  saveProfile,
  changePassword,
  uploadProfileImage,
  updateAvatar
};

export default profileService;
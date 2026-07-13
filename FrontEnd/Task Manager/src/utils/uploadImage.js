import axiosInstance from "./axiosInstance";
import { API_PATHS } from "./apiPaths";

const uploadImage = async (imageFile, onUploadProgress) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await axiosInstance.post(API_PATHS.auth.uploadImage, formData, {
    onUploadProgress,
  });

  return response.data.imageUrl;
};

export default uploadImage;

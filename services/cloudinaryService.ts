import axios from "axios";

export async function uploadImage(file: File) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "cozycorner");

  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/xtt44jyk/image/upload",
    formData
  );

  return response.data.secure_url;
}
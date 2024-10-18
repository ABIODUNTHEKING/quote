import axios from "axios";

const generateImageURL = async (temporaryImage: File) => {
  const formData = new FormData();
  formData.append("file", temporaryImage);
  formData.append("upload_preset", "quote_user_image");

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_ACCOUNT_NAME}/upload`,
    formData
  );

  const image = await response.data;
  let imageUrl = image.secure_url;
  let deleteToken = image.delete_token;

  return {imageUrl, deleteToken}

};

export default generateImageURL;

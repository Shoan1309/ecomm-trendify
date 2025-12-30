import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  console.log("Cloudinary Config - Cloud Name:", process.env.CLOUDINARY_NAME);
  console.log("Cloudinary Config - API Key:", process.env.CLOUDINARY_API_KEY);
  console.log("Cloudinary Config - API Secret:", process.env.CLOUDINARY_API_SECRET);
  
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  console.log("Cloudinary configured successfully");
};

export default connectCloudinary;

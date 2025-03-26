import { v2 as cloudinary } from "cloudinary";
require("dotenv").config();
import fs from "fs";
const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;
console.log(api_key, api_secret, cloud_name);
cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
  secure: true,
});
export const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;
    const uploadResponse = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    return uploadResponse;
  } catch (e) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

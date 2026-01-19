import cloudinary from "../config/cloudinary";
import fs from "fs";

export const uploadToCloudinary = async (filePath: string, folder: string) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
    });
    // Remove file from local storage after upload
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return result;
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error;
  }
};

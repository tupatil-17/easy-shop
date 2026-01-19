import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req: any, file: any) => {
    let folder = "products";
    if (file.fieldname === "aadhaarCardPhoto" || file.fieldname === "panCardPhoto") {
      folder = "seller_docs";
    }
    return {
      folder: folder,
      allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"],
    };
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB file size limit
});

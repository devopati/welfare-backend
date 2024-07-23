import cloudinary from "cloudinary";

import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const imageDestroyer = async (imageId) => {
  if (imageId === "kadczmfylyf9iwisszik") return;
  await cloudinary.uploader.destroy(imageId, (err, result) => {
    if (err) {
      console.error(err);
    }
    // console.log(result);
  });
};

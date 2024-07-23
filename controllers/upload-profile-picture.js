import StatusCodes from "http-status-codes";
import fs from "fs";
import { cloudinaryImageUploadHandler } from "../utils/cloudinary-image-uploader.js";
import Member from "../models/Member.js";
import { imageDestroyer } from "../utils/cloudinary-image-destroyer.js";

const uploadProfilePicture = async (req, res, next) => {
  try {
    const { member_no } = req.body;
    const profilePic = req.file;

    const userInstance = await Member.findOne({ member_no });

    let updatedProfileImage;
    //delete the previuos image
    await imageDestroyer(userInstance.profileImage.id);

    const profilePicUploader = async (path) => {
      return await cloudinaryImageUploadHandler(path, "profileImages");
    };
    const { path } = profilePic;
    updatedProfileImage = await profilePicUploader(path);

    fs.unlinkSync(req.file.path);

    userInstance.profileImage = updatedProfileImage;
    await userInstance.save();

    res.status(StatusCodes.OK).json({
      msg: "Profile image updated successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default uploadProfilePicture;

import { StatusCodes } from "http-status-codes";
import Member from "../models/Member.js";

const getAllMembers = async (req, res, next) => {
  try {
    const { page = 1, limit = 12 } = req.query;

    // Convert page and limit to numbers
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    // Get total number of members
    const totalMembers = await Member.countDocuments();
    const totalInfoSubmitted = await Member.countDocuments({
      info_updated: true,
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalMembers / limitNum);

    // Fetch members with pagination
    const members = await Member.find({ info_updated: true })
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum);

    res.status(StatusCodes.OK).json({
      members,
      currentPage: pageNum,
      totalPages,
      totalMembers,
      totalInfoSubmitted,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default getAllMembers;

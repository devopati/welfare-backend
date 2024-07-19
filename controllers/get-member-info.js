import { StatusCodes } from "http-status-codes";
import MemberInfo from "../models/MemberInfo.js";
import Member from "../models/Member.js";

const getMemberInfo = async (req, res, next) => {
  try {
    const data = req.body;

    if (Object.keys(data).length === 0)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        msg: "Member information is required to complete this request",
      });
    await MemberInfo.findOneAndUpdate(
      { member_no: data?.member_no },
      { ...data },
      { upsert: true }
    );
    await Member.findOneAndUpdate(
      { member_no: data?.member_no },
      { info_updated: true }
    );

    res.status(StatusCodes.OK).json({ msg: "member info updated successfuly" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default getMemberInfo;

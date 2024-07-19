import { StatusCodes } from "http-status-codes";
import Otp from "../models/Otp.js";
import axios from "axios";
import Member from "../models/Member.js";

const getMemberPhone = async (req, res, next) => {
  try {
    const { member_number } = req.body;

    console.log(req.body);

    if (!member_number)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "A valid member number is required to continue" });

    //get member's phone number
    const member = await Member.findOne({ member_no: member_number });

    const phone_number = member?.phone_number;
    if (!phone_number || phone_number === undefined) {
      return res.status(400).json({ msg: "Member not found" });
    }

    res.status(StatusCodes.OK).json({
      msg: "Please confirm your mobile number to continue",
      phone_number: phone_number?.split(" ").join(""),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default getMemberPhone;

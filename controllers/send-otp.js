import { StatusCodes } from "http-status-codes";
import Otp from "../models/Otp.js";
import axios from "axios";
import Member from "../models/Member.js";

const sendOtp = async (req, res, next) => {
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

    //Check if otp exists
    const otpData = await Otp.findOne({ member_no: member_number });
    if (otpData?.otp_code) await Otp.deleteOne({ otp_code: otpData?.otp_code });

    //send otp to user and save a copy to the database
    const sendOtpHandler = async () => {
      const otp = Math.floor(1000 + Math.random() * 9000); //generate otp code

      const SMS_MESSAGE = `Hello, \nYour One Time login Password is ${otp}`;
      const SMS_RECEPIENTS = phone_number;
      const SEMATIME_API_URL = `https://apis.sematime.com/v1/${process.env.SEMATIME_ACCOUNT_ID}/messages/single.url?text=${SMS_MESSAGE}&recipients=${SMS_RECEPIENTS}&AuthToken=${process.env.SEMATIME_AUTH_TOKEN}`;

      const res = await axios.get(SEMATIME_API_URL); //Send otp code
      if (res.status !== 200) throw new Error("Request was unsuccessful");

      await Otp.create({
        member_no: member_number?.split(" ").join(""),
        otp_code: otp,
      });
    };

    sendOtpHandler(); //function call

    res
      .status(StatusCodes.OK)
      .json({ msg: "Message sent successfuly", phone_number });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default sendOtp;

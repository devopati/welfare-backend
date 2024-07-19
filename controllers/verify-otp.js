import Member from "../models/Member.js";
import Otp from "../models/Otp.js";

const verifyOtp = async (req, res, next) => {
  try {
    const { otp, member_number } = req.body;

    if (!otp) throw new Error("OTP code is required to continue");

    const existing_otp = await Otp.findOne({ member_no: member_number });

    // console.log({ existing: existing_otp.otp_code, otp });

    if (existing_otp?.otp_code === otp) {
      await Otp.findOneAndDelete({ member_no: member_number }); //delete existing otp

      //fetch and send member details
      const member_details = await Member.findOne({ member_no: member_number });
      res
        .status(200)
        .json({ msg: "OTP verified successfully", member_details });
    } else {
      res
        .status(400)
        .json({ msg: "Invalid OTP, enter a valid one to continue" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default verifyOtp;

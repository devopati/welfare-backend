import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  member_no: String,
  otp_code: String,
});

export default mongoose.model("Otps", OtpSchema);

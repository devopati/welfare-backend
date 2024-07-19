import express from "express";
import sendOtp from "../controllers/send-otp.js";
import verifyOtp from "../controllers/verify-otp.js";
import getMemberInfo from "../controllers/get-member-info.js";
import getAllMembers from "../controllers/get-all-members.js";
import getMemberPhone from "../controllers/get-member-phone.js";

const router = express.Router();

router.route("/get-otp").post(sendOtp);
router.route("/get-phone").post(getMemberPhone);
router.route("/verify-otp").post(verifyOtp);
router.route("/get-member-info").post(getMemberInfo);

// admin
router.route("/get-all").get(getAllMembers);

export default router;

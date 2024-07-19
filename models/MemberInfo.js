import mongoose from "mongoose";

const MemberInfoSchema = new mongoose.Schema({
  member_no: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  business_type: {
    type: String,
    required: true,
    enum: ["dealer", "service provider"],
    default: "dealer",
  },
  dealer_info: {
    type: Object,
    have_show_room: {
      type: Boolean,
      default: false,
    },
    dealer_type: {
      type: Boolean,
      enum: ["private", "corporate"],
      default: "private",
    },
    name_of_business: String,
    Location: String,
    contact_no: String,
  },
  general_info: {
    type: Object,
    next_of_kin: {
      type: String,
      enum: ["spouse", "children", "parents"],
    },
    next_of_kin_info: {
      type: Object,
      name: String,
      contact_no: String,
      is_biological: {
        type: Boolean,
        default: true,
      },
    },
  },
});

export default mongoose.model("Member information", MemberInfoSchema);

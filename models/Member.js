import mongoose from "mongoose";

const MembersSchema = new mongoose.Schema({
  member_no: {
    type: String,
    unique: true,
  },
  name: String,
  phone_number: String,
  info_updated: {
    type: Boolean,
    default: false,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Members", MembersSchema);

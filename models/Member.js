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
  profileImage: {
    type: Object,
    default: {
      imageUrl:
        "https://res.cloudinary.com/df23q280l/image/upload/v1712474379/kadczmfylyf9iwisszik.png",
      id: "kadczmfylyf9iwisszik",
    },
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Members", MembersSchema);

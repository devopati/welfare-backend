import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

//specify storage engine
const currentDir = dirname(fileURLToPath(import.meta.url));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(currentDir, "../profile-images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

//image file validation
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb({ message: "unsupported file format" }, false);
  }
};

//uploading the file
const upload = multer({
  storage: storage,
  //limit file to 100mbs
  limits: {
    fileSize: 100000000,
  },
  fileFilter: fileFilter,
});

export default upload;

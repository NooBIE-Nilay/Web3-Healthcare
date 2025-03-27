import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!file) {
      return cb(new Error("No file provided"), "");
    }
    cb(null, "./public/temp/");
  },
  filename: function (req, file, cb) {
    if (!file) {
      return cb(new Error("No file provided"), "");
    }
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
  },
  fileFilter: function (req, file, cb) {
    if (!file) {
      return cb(new Error("No file provided"));
    }
    cb(null, true);
  },
});

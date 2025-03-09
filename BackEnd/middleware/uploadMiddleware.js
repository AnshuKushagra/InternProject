import multer from "multer";
import path from "path";

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to uploads/ directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  const onlyFiles = [".csv", ".xlsx", ".xls"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (onlyFiles.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only CSV, XLSX, and XLS are allowed."),
      false
    );
  }
};
const upload = multer({ storage, fileFilter });
export default upload;

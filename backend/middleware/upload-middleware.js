import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure `uploads/resume/` directory exists
const uploadDir = "uploads/resume/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File Filter for Allowed File Types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.log("Invalid file type:", file.mimetype);
    cb(
      new Error("Invalid file type. Only PDF and Word documents are allowed.")
    );
  }
};

// Multer Configuration with Error Handling
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
}).single("resume");

export default (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error("Multer error:", err);
      return res.status(400).json({ success: false, message: err.message });
    } else if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ success: false, message: err.message });
    }
    console.log("File Uploaded Successfully:", req.file);
    next();
  });
};

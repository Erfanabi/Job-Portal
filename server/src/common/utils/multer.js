// src/common/utils/multer.js
import multer from "multer";
import path from "path";
import fs from "fs";
import createHttpError from "http-errors";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "public/images/users";

    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // ساخت یک نام منحصر به فرد برای فایل
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|pdf/;
  const mimeType = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );

  if (mimeType && extname) {
    return cb(null, true);
  }
  cb(createHttpError(400, "فرمت فایل پشتیبانی نمی‌شود!"));
};

// ساخت میدل‌ویر آپلود
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // محدودیت حجم فایل: ۵ مگابایت
  },
});

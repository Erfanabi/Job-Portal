import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import User from "../user/user.model.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

export async function signUpHandler(req, res, next) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      throw createHttpError(400, "نام، ایمیل و رمز عبور الزامی هستند.");
    }

    if (!["user", "company"].includes(role)) {
      throw createHttpError(400, "مقدار نقش باید 'user' یا 'company' باشد.");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createHttpError(409, "کاربری با این ایمیل قبلاً ثبت‌نام کرده است.");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    let imageUrl = null; // مقدار اولیه برای آدرس عکس
    let imageUpload = null;

    if (req.file) {
      imageUrl = req.file.path.replace(/\\/g, "/"); // برای سازگاری با ویندوز و لینوکس
      imageUpload = await cloudinary.uploader.upload(imageUrl);
    }

    let userData = {
      name,
      email,
      password: hashedPassword,
      role,
      image: req.file ? imageUpload.secure_url : "", // ذخیره آدرس فایل در دیتابیس
    };

    if (role === "user") {
      userData = { ...userData, resume: "" };
    }

    const newUser = await User.create(userData);

    newUser.password = undefined;

    res.status(201).json({
      message: "ثبت‌نام با موفقیت انجام شد.",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
}

// تابع جدید برای ورود
export async function signInHandler(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createHttpError(400, "ایمیل و رمز عبور الزامی هستند.");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(401, "ایمیل یا رمز عبور اشتباه است.");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw createHttpError(401, "ایمیل یا رمز عبور اشتباه است.");
    }

    const { accessToken, refreshToken } = generateTokens({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    res.status(200).json({
      message: "ورود با موفقیت انجام شد.",
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
}

function generateTokens(payload) {
  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "24h", // توکن دسترسی معمولاً کوتاه‌مدت است
  });

  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "30d", // توکن رفرش معمولاً بلندمدت است
  });

  return { accessToken, refreshToken };
}

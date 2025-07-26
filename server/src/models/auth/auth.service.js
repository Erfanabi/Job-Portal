import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import User from "../user/user.model.js";
import jwt from "jsonwebtoken";

export async function signUpHandler(req, res, next) {
  try {
    const { name, email, password } = req.body;

    // ۱. اعتبارسنجی فیلدهای متنی
    if (!name || !email || !password) {
      throw createHttpError(400, "نام، ایمیل و رمز عبور الزامی هستند.");
    }

    // ... بررسی کاربر تکراری و سایر موارد ...
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createHttpError(409, "کاربری با این ایمیل قبلاً ثبت‌نام کرده است.");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    let imageUrl = null; // مقدار اولیه برای آدرس عکس

    // ۳. فقط در صورتی که فایلی آپلود شده بود، آدرس آن را پردازش کن
    if (req.file) {
      imageUrl = req.file.path.replace(/\\/g, "/"); // برای سازگاری با ویندوز و لینوکس
    }

    // ۴. ساخت کاربر جدید با آدرس عکس
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      image: imageUrl, // ذخیره آدرس فایل در دیتابیس
    });

    res.status(201).json({
      message: "ثبت‌نام با موفقیت انجام شد.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        image: newUser.image,
      },
    });
  } catch (error) {
    next(error);
  }
}

// تابع جدید برای ورود
export async function signInHandler(req, res, next) {
  try {
    const { email, password } = req.body;

    // ۱. اعتبارسنجی ورودی
    if (!email || !password) {
      throw createHttpError(400, "ایمیل و رمز عبور الزامی هستند.");
    }

    // ۲. پیدا کردن کاربر
    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(401, "ایمیل یا رمز عبور اشتباه است."); // پیام امن و عمومی
    }

    // ۳. مقایسه رمز عبور
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw createHttpError(401, "ایمیل یا رمز عبور اشتباه است.");
    }

    // ۴. ساخت توکن‌ها
    const { accessToken, refreshToken } = generateTokens({
      id: user._id,
      email: user.email,
    });

    // ۵. ارسال پاسخ موفقیت‌آمیز
    res.status(200).json({
      message: "ورود با موفقیت انجام شد.",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
}

// تابع کمکی برای ساخت توکن‌ها
function generateTokens(payload) {
  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "1h", // توکن دسترسی معمولاً کوتاه‌مدت است
  });

  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "30d", // توکن رفرش معمولاً بلندمدت است
  });

  return { accessToken, refreshToken };
}

import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import User from "../models/user/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createHttpError(401, "توکن احراز هویت ارسال نشده است.");
    }

    const token = authHeader.split(" ")[1];

    const decodedPayload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedPayload) {
      throw createHttpError(401, "توکن معتبر نیست.");
    }

    const user = await User.findById(decodedPayload.id).select("-password");
    if (!user) {
      throw createHttpError(401, "کاربر مرتبط با این توکن یافت نشد.");
    }

    req.user = user;
    next();
  } catch (error) {
    const jwtError = createHttpError(
      401,
      error.message || "توکن نامعتبر یا منقضی شده است.",
    );
    next(jwtError);
  }
};

export const isCompany = (req, res, next) => {
  if (req.user && req.user.role === "company") {
    next();
  } else {
    next(createHttpError(403, "دسترسی فقط برای شرکت‌ها مجاز است."));
  }
};

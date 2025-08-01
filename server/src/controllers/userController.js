import createHttpError from "http-errors";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplicationSchema.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/user/user.model.js";

// get user data
/**
 * @description دریافت اطلاعات پروفایل کاربر لاگین کرده
 */
export const getUserData = async (req, res, next) => {
  try {
    // ذخیره اطلاعات کاربر
    const user = req.user;
    if (!user) {
      throw createHttpError(404, "User not found.");
    }

    // اطلاعات کاربر از میدل‌ور احراز هویت گرفته می‌شود
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

/**
 * @description ثبت درخواست برای یک آگهی شغلی
 */
export const applyForJob = async (req, res, next) => {
  try {
    const applicantId = req.user.id;
    const { jobId } = req.body;

    if (!jobId) {
      throw createHttpError(400, "شناسه آگهی (jobId) الزامی است.");
    }

    // ۱. بررسی اینکه آیا آگهی وجود دارد و فعال است
    const job = await Job.findOne({ _id: jobId, visible: true });
    if (!job) {
      throw createHttpError(404, "آگهی مورد نظر یافت نشد یا دیگر فعال نیست.");
    }

    // ۲. بررسی اینکه آیا کاربر قبلاً برای این شغل درخواست داده است
    const existingApplication = await JobApplication.findOne({
      jobId,
      applicantId,
    });
    if (existingApplication) {
      throw createHttpError(
        409,
        "شما قبلاً برای این موقعیت شغلی درخواست داده‌اید.",
      );
    }

    // ۳. ساخت درخواست جدید با استفاده از مدل JobApplication
    const newApplication = await JobApplication.create({
      jobId,
      applicantId,
    });

    res.status(201).json({
      message: "درخواست شما با موفقیت ثبت شد.",
      application: newApplication,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description دریافت لیست تمام درخواست‌های شغلی ثبت شده توسط کاربر
 */
export const getUserJobApplications = async (req, res, next) => {
  try {
    const applicantId = req.user.id;

    const applications = await JobApplication.find({ applicantId })
      .sort({ createdAt: -1 })
      .populate({
        path: "jobId", // اطلاعات کامل آگهی را واکشی کن
        select: "title location",
        populate: {
          path: "companyId", // اطلاعات شرکت آگهی‌دهنده را هم واکشی کن
          select: "name image",
        },
      });

    if (!applications) {
      throw createHttpError(404, "هیچ درخواست شغلی پیدا نشد");
    }

    res.status(200).json({ success: true, applications });
  } catch (error) {
    next(error);
  }
};

/**
 * @description به‌روزرسانی یا آپلود رزومه کاربر
 */
/**
 * @description به‌روزرسانی یا آپلود رزومه کاربر با استفاده از Cloudinary
 */
export const updateUserResume = async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      throw createHttpError(400, "فایل رزومه ارسال نشده است.");
    }

    // ⭐ آپلود فایل در کلادینری
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto", // به کلادینری اجازه می‌دهد نوع فایل (مثلا PDF) را تشخیص دهد
      folder: "resumes", // فایل‌ها در پوشه‌ای به نام resumes ذخیره می‌شوند
    });

    // آدرس امن فایل آپلود شده در کلادینری
    const resumeUrl = result.secure_url;

    // پیدا کردن کاربر و به‌روزرسانی فیلد رزومه با آدرس URL از کلادینری
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { resume: resumeUrl },
      { new: true }, // برگرداندن کاربر آپدیت‌شده
    ).select("-password");

    res
      .status(200)
      .json({ message: "رزومه با موفقیت به‌روزرسانی شد.", user: updatedUser });
  } catch (error) {
    next(error);
  }
};

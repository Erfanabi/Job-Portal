import Job from "../models/Job.js";

// Register a new company
export const registerCompany = async (req, res) => {};

// Company login
export const loginCompany = async (req, res) => {};

// get company data
export const getCompanyData = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, company: req.user });
  } catch (error) {
    next(error);
  }
};

// Post a new job
export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;
  const companyId = req.user._id;

  try {
    const job = new Job({
      title,
      description,
      location,
      level,
      salary,
      companyId,
      category,
      date: Date.now(),
    });
    await job.save();
    res.status(201).json({ message: "Job posted successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Get Company Job Applicants
export const getCompanyJobApplicants = async (req, res) => {};

// Get Company Posted Jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.user.id;
    const jobs = await Job.find({ companyId }).sort({ createdAt: -1 });

    // (ToDo) Adding No. of applicants info in data

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    next(error);
  }
};

// Change Job Apllication Status
export const ChangeJobApplicationsStatus = async (req, res) => {};

// Change Job Visiblity
/**
 * @description تغییر وضعیت نمایش یک آگهی شغلی (فعال/غیرفعال)
 * این تابع فرض می‌کند ID آگهی و وضعیت جدید در body ارسال می‌شود.
 */
export const ChangeVisiblity = async (req, res) => {
  try {
    const { jobId, visible } = req.body;
    const companyId = req.user.id;

    if (!jobId || visible === undefined) {
      throw createHttpError(
        400,
        "شناسه آگهی (jobId) و وضعیت نمایش (visible) الزامی هستند.",
      );
    }

    // به‌روزرسانی آگهی فقط در صورتی که متعلق به شرکت لاگین کرده باشد
    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId, companyId: companyId }, // شرط پیدا کردن و امنیت
      { visible: visible }, // مقداری که باید آپدیت شود
      { new: true }, // برگرداندن داکیومنت آپدیت‌شده
    );

    if (!updatedJob) {
      throw createHttpError(
        404,
        "آگهی مورد نظر یافت نشد یا متعلق به شما نیست.",
      );
    }

    res.status(200).json({
      message: `وضعیت نمایش آگهی به ${visible} تغییر کرد.`,
      job: updatedJob,
    });
  } catch (error) {
    next(error);
  }
};

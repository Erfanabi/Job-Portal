import Job from "../models/Job.js";
import JobApplication from "../models/JobApplicationSchema.js";

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

/**
 * @description Get all applicants for ALL jobs posted by the company.
 * @route GET /api/company/applicants
 */
export const getCompanyJobApplicants = async (req, res, next) => {
  try {
    // ۱. شناسه شرکت از کاربر لاگین کرده (که توسط میدل‌ور آماده شده) گرفته می‌شود
    const companyId = req.user.id;

    // ۲. تمام آگهی‌های متعلق به این شرکت را پیدا می‌کنیم
    const companyJobs = await Job.find({ companyId: companyId }).select("_id");

    // ۳. اگر شرکت هیچ آگهی ثبت نکرده بود، یک آرایه خالی برمی‌گردانیم
    if (companyJobs.length === 0) {
      return res.status(200).json([]);
    }

    // ۴. یک آرایه از شناسه‌های آگهی‌ها می‌سازیم
    const jobIds = companyJobs.map(job => job._id);

    // ۵. تمام درخواست‌های (applications) مربوط به این آگهی‌ها را پیدا می‌کنیم
    const applications = await JobApplication.find({ jobId: { $in: jobIds } })
      .populate({
        path: "applicantId", // اطلاعات کامل کاربر متقاضی
        select: "name email resume image",
      })
      .populate({
        path: "jobId", // اطلاعات آگهی مربوط به هر درخواست
        select: "title location", // فقط عنوان آگهی را نشان بده
      })
      .sort({ createdAt: -1 }); // مرتب‌سازی بر اساس جدیدترین درخواست‌ها

    res.status(200).json(applications);
  } catch (error) {
    next(error);
  }
};

// Get Company Posted Jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.user.id;
    const jobs = await Job.find({ companyId }).sort({ createdAt: -1 });

    // (ToDo) Adding No. of applicants info in data
    const jobsData = await Promise.all(
      jobs.map(async job => {
        const applicants = await JobApplication.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      }),
    );

    res.status(200).json({ success: true, jobs: jobsData });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Change the status of a job application (e.g., accept, reject).
 * @route POST /api/company/change-status
 */
export const ChangeJobApplicationsStatus = async (req, res, next) => {
  try {
    // ۱. شناسه‌های لازم را از درخواست می‌گیریم
    const { applicationId, status } = req.body;

    // ۲. ورودی‌ها را اعتبارسنجی می‌کنیم
    if (!applicationId || !status) {
      throw createHttpError(400, "شناسه درخواست (applicationId) و وضعیت (status) الزامی هستند.");
    }

    // ۳. مطمئن می‌شویم که مقدار وضعیت ارسالی، یکی از مقادیر مجاز است
    const allowedStatuses = ["accepted", "rejected"];
    if (!allowedStatuses.includes(status)) {
      throw createHttpError(400, "مقدار وضعیت ارسال شده معتبر نیست. مقادیر مجاز: accepted, rejected");
    }

    // ۴. درخواست مورد نظر را پیدا می‌کنیم و اطلاعات آگهی مربوط به آن را نیز واکشی می‌کنیم
    const application = await JobApplication.findById(applicationId).populate('jobId');

    // ۶. وضعیت درخواست را به‌روزرسانی می‌کنیم
    application.status = status;
    await application.save();

    // ۷. پاسخ موفقیت‌آمیز را به همراه درخواست آپدیت‌شده برمی‌گردانیم
    res.status(200).json({ message: "وضعیت درخواست با موفقیت تغییر کرد." });
  } catch (error) {
    // ۸. در صورت بروز هرگونه خطا، آن را به میدل‌ور مدیریت خطا ارسال می‌کنیم
    next(error);
  }
};

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

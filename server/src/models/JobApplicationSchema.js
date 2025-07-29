import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema(
  {
    // شناسه آگهی شغلی که برای آن درخواست داده شده است
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job", // به مدل Job اشاره می‌کند
      required: true,
    },

    // شناسه کاربری که درخواست را ثبت کرده است (جوینده کار)
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // به مدل User اشاره می‌کند
      required: true,
    },

    // وضعیت فعلی درخواست استخدام
    status: {
      type: String,
      enum: ["pending", "viewed", "accepted", "rejected"], // مقادیر مجاز برای وضعیت
      default: "pending", // وضعیت پیش‌فرض هنگام ثبت درخواست
    },

    // می‌توانید فیلدهای دیگری مثل نامه پوششی (Cover Letter) هم اضافه کنید
    // coverLetter: {
    //   type: String,
    //   trim: true,
    // },
  },
  {
    // این گزینه به صورت خودکار فیلدهای createdAt و updatedAt را اضافه می‌کند
    timestamps: true,
  },
);

const JobApplication = mongoose.model("JobApplication", JobApplicationSchema);

export default JobApplication;

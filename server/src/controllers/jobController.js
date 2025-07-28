import Job from "../models/Job.js";

// Get all jobs data
export const getJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const count = await Job.countDocuments({ visible: true });
    const jobs = await Job.find({ visible: true })
      .populate({
        path: "companyId",
        select: "-password",
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    res.status(200).json({
      success: true,
      jobs,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get a single job by ID
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findOne({ _id: id, visible: true }).populate(
      "companyId",
      "name image description location",
    );

    if (!job) {
      throw createHttpError(404, "آگهی مورد نظر یافت نشد یا فعال نیست.");
    }

    res.status(200).json({ success: true, job });
  } catch (error) {
    next(error);
  }
};

import Job from "../models/Job.js";

// Register a new company
export const registerCompany = async (req, res) => {};

// Company login
export const loginCompany = async (req, res) => {};

// get company data
export const getCompanyData = async (req, res) => {};

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
export const getCompanyPostedJobs = async (req, res) => {};

// Change Job Apllication Status
export const ChangeJobApplicationsStatus = async (req, res) => {};

// Change Job Visiblity
export const ChangeVisiblity = async (req, res) => {};

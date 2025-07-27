import { Router } from "express";
import {
  ChangeJobApplicationsStatus,
  ChangeVisiblity,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany,
} from "../controllers/companyController.js";

const router = Router();

// Register a company
router.post("/register", registerCompany);

// Company login
router.post("/login", loginCompany);

// Get company data
router.get("/company", getCompanyData);

// Post a job
router.post("/post-job", postJob);

// Get Applicants data og company
router.get("/applicants", getCompanyJobApplicants);

// Get Company Job List
router.get("/list-jobs", getCompanyPostedJobs);

// Change Applicants status
router.post("/change-status", ChangeJobApplicationsStatus);

// Change Apllications Visiblity
router.post("/change-visiblity", ChangeVisiblity);

export const CompanyRouter = router;

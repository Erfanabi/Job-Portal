import { Router } from "express";
import {
  ChangeJobApplicationsStatus,
  ChangeVisiblity,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  postJob,
} from "../controllers/companyController.js";
import { authMiddleware, isCompany } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware, isCompany);

// Get company data
router.get("/", getCompanyData);

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
